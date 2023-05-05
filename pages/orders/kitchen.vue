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
            // () => refreshOrders()
            () => fetchOrders()
        )
        .subscribe();

});

onUnmounted(() => {
    client.removeChannel(state.channel)
});

const markReady = async (orderId) => {
    console.log(`marking order ${orderId} as ready`);
}

fetchOrders();
</script>

<template>
    <OrderMenuItems
        type="kitchen"
        Heading="Kitchen"
        :orders="state.orders"
        intro="Meals to prepare"
    />
</template>


<style lang="scss" scoped>

</style>