import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const supabase = serverSupabaseClient(event);

    try {

        const { error, data: tables } = await supabase
        .from('tables')
        .select('id, name');



        if (tables && tables.length === 0) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Table Not Found'
            })
        }

        return {
            status: 200,
            data: tables
        };
    } catch (error) {
        return {
            status: 500,
            data: error
        };
    }
});
