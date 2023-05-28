import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const supabase = serverSupabaseClient(event);

    try {

        const { data: menu_items, error } = await supabase
        .from('menu_items')
        .select('*, menu_item_categories!inner(*)')

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
