import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const supabase = serverSupabaseClient(event);

    const { order, tableId } = await readBody(event);
    const channel = supabase.channel('kitchen-orders')
    .subscribe((status) => {
        console.log('subscribed to kitchen-orders')
    });

    try {

        const { data: savedOrder, error: orderError } = await supabase
        .from('orders')
        .insert({
            table_id: tableId,
            status_id: 1,
            order_type_id: 1,
        })
        .select()
        .single();

        const orderItems = await Promise.all(order.map((item) => {
            return {
                order_id: savedOrder.id,
                menu_item_id: item.id,
                price: item.price,
                quantity: item.quantity,
            }
        }));

        const { error: itemsError } = await supabase
        .from('order_menu_items')
        .insert(orderItems);

        const { data: orderWithItems, error } = await supabase
        .from('orders')
        .select(`
            id,
            status: order_states(name, slug),
            menu_items: order_menu_items!inner(
                note,
                quantity,
                data: menu_items!inner(
                    title,
                    slug,
                    category: menu_item_categories!inner(slug, title)
                )
            ),
            order_type_id,
            order_type: order_types!inner(slug, title),
            table: tables(name)
        `)
        .eq('id', savedOrder.id)
        .single();

        if (orderError || itemsError) {
            throw createError({
                statusCode: 500,
                statusMessage: orderError
            })
        } else {
            channel.send({
                type: 'broadcast',
                event: 'new-order',
                payload: orderWithItems
            })
        }

        return {
            status: 200,
            data: 'Kitchen order saved'
        };
    } catch (error) {
        return {
            status: 500,
            data: error
        };
    }
});
