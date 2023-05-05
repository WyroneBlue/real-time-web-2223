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

// const { data: orders, refresh: refreshOrders } = await useAsyncData('orders', async () => {
//     const { data } = await useFetch('/api/orders/bar');
//     return data.value?.data;
// });
// const { data: orders, refresh: refreshOrders } = await useAsyncData('orders', async () => {
//     const { data } = await useFetch('/api/orders/bar');
//     return data.value?.data;
// });

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
// refreshOrders();
// console.log(orders.value);
</script>

<template>
    <!-- <section id="bar">
        <h1>Bar</h1>
        <p>Drinks to prepare</p> -->

        <!-- <ClientOnly v-if="orders.length > 0"> -->

            <!-- <ul id="orders" v-if="state.orders && state.orders.length > 0">
                <TransitionGroup name="menu-items">
                <li v-for="order in state.orders" :key="order.id">
                    <section>
                        <div>
                            <p>Table: {{ order.table.name }}</p>
                            <span>{{ order.status.name }}</span>
                        </div>

                        <div>
                            <span>Items:</span>
                            <span>Quantity</span>
                        </div>
                    </section>

                    <ul id="menu-items">
                        <li v-for="item in order.menu_items" :key="item.id">
                            <section>
                                <p>{{ item.data.title }}</p>
                                <p>{{ item.quantity }}</p>
                            </section>
                            <p>{{ item.note || 'no notes'}}</p>
                        </li>
                    </ul>
                    <button @click="markReady(order.id)">
                        <span>Mark as ready</span>
                    </button>
                </li>
                </TransitionGroup>
            </ul> -->
        <!-- </ClientOnly> -->
            <!-- <p v-else>No orders yet</p>
    </section> -->

    <OrderMenuItems type="bar" Heading="Bar" :orders="state.orders" intro="Drinks to prepare" />
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