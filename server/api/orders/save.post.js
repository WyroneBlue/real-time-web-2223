import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const supabase = serverSupabaseClient(event);

    const { order, tableNumber } = await readBody(event);

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
            const { error } = await $fetch('/api/orders/kitchen/save', {
                method: 'POST',
                body: {
                    order: foodOrder,
                    tableId
                }
            });

            if(error) {
                throw createError({
                    statusCode: 500,
                    statusMessage: error
                })
            }
        }

        const drinkOrder = order.filter((item) => item.menu_item_categories.slug === 'drinks');
        if(drinkOrder.length > 0) {
            const { error } = await $fetch('/api/orders/bar/save', {
                method: 'POST',
                body: {
                    order: drinkOrder,
                    tableId
                }
            });

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
        return {
            status: 500,
            data: error
        };
    }
});
