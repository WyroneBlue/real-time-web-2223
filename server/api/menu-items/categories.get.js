import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const supabase = serverSupabaseClient(event);

    try {

        const { data: categories, error } = await supabase
        .from('menu_item_categories')
        .select('*')

        return {
            status: 200,
            data: categories
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            data: error
        };
    }
});
