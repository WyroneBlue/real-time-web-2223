import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const supabase = serverSupabaseClient(event);

    const { order, tableId } = await readBody(event);
    console.log('kitchen order', order);
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
        console.log('orderError kitchen', orderError);

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
        console.log('itemsError kitchen', itemsError);

        return {
            status: 200,
            data: 'Bar order saved'
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            data: error
        };
    }
});
