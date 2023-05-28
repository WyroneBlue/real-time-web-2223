import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const supabase = serverSupabaseClient(event);

    const { order_id, status } = await readBody(event);
    const channel = supabase.channel('order-status')
    .subscribe((status) => {
        console.log('subscribed to order-status')
    });

    try {
        const { data: orderStatus, stateError } = await supabase
        .from('order_states')
        .select()
        .eq('slug', status)
        .single();

        const { data: order, error } = await supabase
        .from('orders')
        .update({ status_id: orderStatus.id })
        .eq('id', order_id)
        .select()
        .single();

        if (stateError || error) {
            throw createError({
                statusCode: 500,
                title: 'Error saving order',
            });

        } else {
            const orderType = order.order_type_id === 1 ? 'kitchen' : 'bar';

            channel.send({
                type: 'broadcast',
                event: `status-update-${orderType}`,
            })
        }

        return {
            status: 200,
            data: 'Bar order saved'
        };
    } catch (error) {
        return {
            status: 500,
            data: error
        };
    }
});
