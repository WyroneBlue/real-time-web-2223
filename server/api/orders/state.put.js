import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const supabase = serverSupabaseClient(event);

    const { order_id, status } = await readBody(event);
    try {
        const { data: orderStatus, stateError } = await supabase
        .from('order_states')
        .select()
        .eq('slug', status)
        .single();

        console.log('order_id', order_id);
        console.log('orderStatus.id', orderStatus.id);
        const { data: order, error } = await supabase
        .from('orders')
        .update({ status_id: orderStatus.id })
        .eq('id', order_id)
        .select()
        .single();

        console.log('order', order);

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
