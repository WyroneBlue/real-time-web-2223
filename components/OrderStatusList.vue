<script setup>

const props = defineProps({
    orders: {
        type: Array,
        default: null,
    },
    statusTitle: {
        type: String,
        default: null,
    },
    type: {
        type: String,
        default: null,
    },
});

const updateStatus = async (orderId, status) => {
    console.log(`marking order ${orderId} as ready`);

    const { data, error } = await useFetch(`/api/orders/state`, {
        method: 'PUT',
        body: JSON.stringify({
            status,
            order_id: orderId
        }),
    });

    console.log(data, error);
}
</script>
<template>
    <section>
        <h2>{{ statusTitle }}</h2>
        <ul id="orders" v-if="orders && orders.length > 0" :class="type">
            <TransitionGroup name="menu-items">
                <li v-for="order in orders" :key="order.id">
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
                            <p>{{ item.note || 'no notes' }}</p>
                        </li>
                    </ul>
                    <button @click="updateStatus(order.id, 'ready')" v-if="order.status.slug === 'preparing'">
                        <span>Mark as ready</span>
                    </button>
                    <button @click="updateStatus(order.id, 'delivered')" v-else-if="order.status.slug === 'ready'">
                        <span>Mark as delivered</span>
                    </button>
                </li>
            </TransitionGroup>
        </ul>
        <p v-else>No orders yet</p>
    </section>
</template>

<style lang="scss" scoped>
ul#orders {
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    overflow-x: hidden;
    gap: 1rem;

    @media screen and (min-width: 640px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (min-width: 768px) {
        grid-template-columns: repeat(4, 1fr);
    }

    &.preparing li{
        background-color: lightsalmon;
    }

    &.ready li{
        background-color: lightyellow;
    }

    &.delivered li{
        background-color: lightgreen;
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

            li {
                section {
                    display: flex;
                    justify-content: space-between;
                }
            }
        }

        button {
            padding: .5rem;
            background-color: white;
            border: 1px solid black;
            border-radius: .5rem;
        }
    }
}
</style>