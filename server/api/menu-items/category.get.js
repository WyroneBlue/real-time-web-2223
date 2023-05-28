import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const supabase = serverSupabaseClient(event);

    const { category } = getQuery(event);

    try {

        const { data: menu_items, error } = await supabase
        .from('menu_items')
        .select('*, menu_item_categories!inner(*)')
        .eq('menu_item_categories.slug', category);

        return {
            status: 200,
            data: menu_items
        };
    } catch (error) {
        return {
            status: 500,
            data: error
        };
    }
});
