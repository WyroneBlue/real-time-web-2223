<script setup>

const client = useSupabaseClient()
const state = reactive({
    orders: [],
    channel: null,
});

const fetchOrders = async () => {
    const { data } = await useFetch('/api/orders/kitchen');
    state.orders = data.value?.data;
}

onMounted(() => {
    state.channel = client.channel('public:orders')
        .on('postgres_changes',
            { event: '*', schema: 'public', table: 'orders' },
            () => fetchOrders()
        )
        .subscribe();

});

onUnmounted(() => {
    client.removeChannel(state.channel)
});

fetchOrders();

definePageMeta({
    middleware: 'auth'
})
</script>

<template>
    <OrderMenuItems
        type="kitchen"
        Heading="Kitchen"
        :orders="state.orders"
        intro="Meals to prepare"
    />
</template>