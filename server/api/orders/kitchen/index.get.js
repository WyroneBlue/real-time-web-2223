import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const supabase = serverSupabaseClient(event);

    try {
        const { data: orders, error } = await supabase
        .from('orders')
        .select(`
            id,
            status: order_states(name),
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
        .eq('order_types.slug', 'kitchen')
        .order('created_at', { ascending: true })

        console.log('error', error);
        return {
            status: 200,
            data: orders
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            data: error
        };
    }
});