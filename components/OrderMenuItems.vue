<script setup>
const props = defineProps({
    type: {
        type: String,
        default: null,
    },
    Heading: {
        type: String,
        default: null,
    },
    intro: {
        type: String,
        default: null,
    },
    orders: {
        type: Array,
        default: null,
    },
});
console.log(props.orders);

</script>
<template>
    <section :id="type">
        <h1>{{ Heading }}</h1>
        <p>{{ intro }}</p>

        <ul id="orders" v-if="orders.length > 0">
            <ClientOnly>
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
                        <button @click="markReady(order.id)">
                            <span>Mark as ready</span>
                        </button>
                    </li>
                </TransitionGroup>
            </ClientOnly>
        </ul>
        <p v-else>No orders yet</p>
    </section>
</template>

<style lang="scss" scoped>
section#bar,
section#kitchen {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;

    ul#orders {
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

        >li {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 1rem;
            padding: .5rem;
            border: 1px solid black;
            border-radius: .5rem;

            >section {
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
                border: 1px solid black;
                border-radius: .5rem;
            }
        }
    }
}
</style>