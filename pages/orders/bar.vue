<script setup>

const client = useSupabaseClient()
const state = reactive({
    orders: [],
    channel: null,
});



const fetchOrders = async () => {
    const { data } = await useFetch('/api/orders/bar');
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
</script>

<template>
    <OrderMenuItems
        type="bar"
        Heading="Bar"
        :orders="state.orders"
        intro="Drinks to prepare"
    />
</template>


<style lang="scss" scoped>
section#bar {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;

    ul#orders{
        position: relative;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        overflow-x: hidden;
        gap: 2rem;

        @media screen and (min-width: 640px) {
            grid-template-columns: repeat(3, 1fr);
        }

        @media screen and (min-width: 768px) {
            grid-template-columns: repeat(4, 1fr);
        }

        > li {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 1rem;
            padding: .5rem;
            border: 1px solid black;
            border-radius: .5rem;

            > section {
                display: flex;
                flex-direction: column;
                gap: .5rem;

                div {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
            }

            ul#menu-items {
                display: flex;
                flex-direction: column;
                gap: 1rem;

                li{
                    section{
                        display: flex;
                        justify-content: space-between;
                    }
                }
            }

            button {
                padding: .5rem;
                border: 1px solid black;
                border-radius: .5rem;
            }
        }
    }
}
</style>