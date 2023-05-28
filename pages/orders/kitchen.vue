<script setup>
const client = useSupabaseClient()
const state = reactive({
    orders: [],
    tables: [],
    channels: {
        orders: null,
        active_tables: null,
        order_states: null,
    },
});

const fetchOrders = async () => {
    const { data } = await useFetch('/api/orders/kitchen');
    state.orders = data.value?.data;
}

const fetchTables = async () => {
    const { data } = await useFetch('/api/tables');
    state.tables = data.value?.data;

    state.tables = state.tables.map(table => {
        const tableName = table.name.replace('#', '');
        const tableStatus = state.orders.find(order => order.table_number === tableName)?.status;

        return {
            ...table,
            status: tableStatus,
        }
    })
}

await fetchOrders();
await fetchTables();

onMounted(async() => {

    state.channels.order_states = client.channel('order-status')
    .on('broadcast', { event: 'status-update-kitchen'}, async() => {
        await fetchOrders();
    })
    .subscribe();

    state.channels.orders = client.channel('kitchen-orders')
    .on('broadcast', { event: 'new-order'}, ({ payload }) => {
        state.orders.push(payload)
    })
    .subscribe();

    state.channels.active_tables = client.channel('active_tables', {
        configs: {
            presence: {
                key: `kitchen staff`
            }
        }
    })
    .on('broadcast', { event: 'table_update' }, ({ payload }) => {
        state.tables = state.tables.map(table => {
            const tableName = table.name.replace('#', '');
            if (tableName === payload.tableNumber) {
                return {
                    ...table,
                    last_seen: payload.last_seen,
                    status: payload.status,
                }
            }

            return table;
        })
    })
    .subscribe();
});

onUnmounted(() => {
    client.removeChannel(state.channels.orders);
    client.removeChannel(state.channels.active_tables);
});

definePageMeta({
    middleware: 'auth'
})
</script>

<template>
    <section>
        <ActiveTables
            :tables="state.tables"
        />
        <OrderMenuItems
            type="kitchen"
            Heading="Kitchen"
            :orders="state.orders"
            intro="Meals to prepare"
        />
    </section>
</template>