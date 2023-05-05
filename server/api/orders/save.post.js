import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const supabase = serverSupabaseClient(event);

    const { order, tableNumber } = await readBody(event);
    console.log('order', order);
    try {

        const { data: tableId } = await $fetch('/api/tables/number', {
            params: {
                id: tableNumber
            }
        });

        if(!tableId) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Table Not Found'
            })
        }

        const foodOrder = order.filter((item) => item.menu_item_categories.slug !== 'drinks');
        if(foodOrder.length > 0) {
            const { error } = $fetch('/api/orders/kitchen/save', {
                method: 'POST',
                body: {
                    order: foodOrder,
                    tableId
                }
            });

            console.log('food error in save', error);

            if(error) {
                throw createError({
                    statusCode: 500,
                    statusMessage: error
                })
            }
        }

        const drinkOrder = order.filter((item) => item.menu_item_categories.slug === 'drinks');
        if(drinkOrder.length > 0) {
            const { error } = $fetch('/api/orders/bar/save', {
                method: 'POST',
                body: {
                    order: drinkOrder,
                    tableId
                }
            });

            console.log('drink error in save', error);

            if(error) {
                throw createError({
                    statusCode: 500,
                    statusMessage: error
                })
            }
        }

        return {
            status: 200,
            data: 'Orders saved'
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            data: error
        };
    }
});
