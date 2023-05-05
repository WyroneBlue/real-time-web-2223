import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const supabase = serverSupabaseClient(event);

    const { id } = getQuery(event);

    try {
        const { error, data } = await supabase
        .from('tables')
        .select('id')
        .eq('name', `#${id}`)
        .single();

        if(data && data.length === 0) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Table Not Found'
            })
        }

        const tableId = data.id;
        return {
            status: 200,
            data: tableId
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            data: error
        };
    }
});
