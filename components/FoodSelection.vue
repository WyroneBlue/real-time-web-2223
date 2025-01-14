<script setup>
import { useOnline, useIdle } from '@vueuse/core'
const client = useSupabaseClient()

const router = useRoute();
const { table: tableNumber } = router.query;

const online = useOnline()
const isOnline = computed(() => online.value)
// const { idle } = useIdle(1000 * 5 * 60);
const { idle } = useIdle(1000 * 5);

if (!tableNumber) {
    navigateTo('/?table=1');
}

const props = defineProps({
    category: {
        type: String,
        default: null,
    },
});

const state = reactive({
    foods: [],
    order: useOrder(),
    category: props.category,
    isLoading: true,
    showOrder: false,
    count: 0,
    channels: {
        orders: null,
        active_tables: null,
    },
});

onMounted(() => {
    state.channels.orders = client.channel('new_orders')
    .subscribe(() => {
        console.log('subscribed to new_orders')
    })

    state.channels.active_tables = client.channel('active_tables', {
        configs: {
            presence: {
                key: `table-${tableNumber}`
            }
        }
    })
    .subscribe(() => {
        console.log('subscribed to active_tables')
    })
});

onUnmounted(() => {
    client.removeChannel(state.channels.orders);
    client.removeChannel(state.channels.active_tables)
})

const fetchFoods = async () => {
    const { data: menu_items, error } = await useFetch('/api/menu-items', {
        key: 'menu-items',
    });

    if(error.value) {
        useSetToast({
            type: 'error',
            msg: 'Failed to load menu items. Please get in touch with the staff.'
        })
    }

    state.foods = menu_items.value?.data;
    state.isLoading = false;
}

const submitOrder = async (event = false) => {

    const button = event.target;
    button.disabled = true;

    const { error } = await useFetch('/api/orders/save', {
        method: 'POST',
        body: JSON.stringify({
            order: state.order,
            tableNumber
        }),
    });

    if (error.value || !isOnline.value) {
        useSetToast({
            type: 'error',
            msg: !isOnline.value ? 'You are offline. Order will be submitted when you are online' : 'Order failed to submit. Please get in touch with the staff.'
        })
    } else {
        state.order = [];
        state.count = 1;
        useSetToast({
            msg: 'Order submitted successfully'
        })
    }
}

const checkInOrder = (id) => useOrder().value.find(item => item.id === id) ? true : false;
const addToOrder = (event) => {

    const isDuplicate = checkInOrder(event.item.id);
    if(isDuplicate) {
        updateOrderQuantity(event.item.id, event.count);
    } else {
        updateOrder(event.item, event.count);
    }
}

watch(() => props.category, async (category) => {
    state.isLoading = true;

    if(!category) {
        fetchFoods();
        return;
    };

    const { data: category_items, error } = await useFetch("/api/menu-items/category", {
        params: {
            category,
        },
        key: 'category-items',
    });

    if(error.value){
        useSetToast({
            type: 'error',
            msg: `The menu items for ${category} could not be loaded. Please get in touch with the staff.`,
            duration: 0
        })
    }

    state.foods = category_items.value?.data;
    state.isLoading = false;
});

watch(isOnline, (online) => {
    if(online) {
        useSetToast({
            msg: 'You are online'
        })

        fetchFoods();
    } else {
        useSetToast({
            type: 'error',
            msg: 'You are offline. Order will be submitted when you are online',
            duration: 0
        })
    }
})

watch(idle, (idleValue) => {
    if (idleValue) {
        const date = new Date();
        const HoursMinutesSeconds = date.toLocaleTimeString('nl-NL', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        state.channels.active_tables.send({
            type: 'broadcast',
            event: 'table_update',
            payload: {
                tableNumber,
                status: 'idle',
                last_seen: HoursMinutesSeconds,
            }
        })

        useSetToast({
            type: 'warning',
            msg: "You have not ordered anything for a while. Are you finished ordering?",
            duration: 0
        })
    } else {
        state.channels.active_tables.send({
            type: 'broadcast',
            event: 'table_update',
            payload: {
                tableNumber,
                status: 'active'
            }
        })

        clearToast();
    }
})

fetchFoods();
</script>

<template>
    <section>
        <form action="/order/save">
            <section>
                <div>
                    <h2>Menu</h2>

                    <ClientOnly>
                        <LoadingSpinner v-if="state.isLoading" />
                    </ClientOnly>
                </div>

                <ClientOnly>
                    <TransitionGroup name="menu-items" tag="section">
                        <p v-if="state.foods && !state.foods.length">
                            There are currently no menu items in this category.
                        </p>
                        <ItemSelect
                            v-else
                            v-for="food in state.foods"
                            :key="food.id"
                            :item="food"
                            :count="state.count"
                            :in-order="checkInOrder(food.id)"
                            @addItem="addToOrder"
                        />
                    </TransitionGroup>
                </ClientOnly>
            </section>

            <button v-if="!isOnline" disabled class="offline">
                This device is offline
                <span>Submitting an order is not possible</span>
                <span>Please get in touch with the staff.</span>
            </button>
            <button
                v-else
                type="submit"
                @click.prevent="$event => submitOrder($event)"
                :class="{ sticky: state.order.length }"
                :disabled="!state.order.length"
            >
                Submit order
                <ToolTip v-if="!state.order.length" msg="No items selected"/>
            </button>
        </form>

        <section id="order-review">
            <button @click="state.showOrder = !state.showOrder" :class="{ active: state.showOrder }">
                <Transition name="order-count">
                    <span :key="state.order.length" v-show="state.order.length">{{ state.order.length }}</span>
                </Transition>
                <span>🧾</span>
            </button>

            <OrderReview
                :showOrder="state.showOrder"
                @hide-order="state.showOrder = $event"
            />
        </section>

    </section>
</template>

<style lang="scss" scoped>
section {
    // overflow-x: hidden;
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding-bottom: 4rem + 1rem;

        &>section {

            &:first-of-type {
                display: flex;
                flex-direction: column;

                div {
                    display: flex;
                    align-items: center;
                    gap: 1rem;

                    span {
                        height: 30px;
                        width: auto;
                        aspect-ratio: 1/1;
                    }
                }

                section {
                    min-height: 500px;
                    position: relative;
                    display: grid;
                    grid-template-columns: 1fr;
                    overflow-x: hidden;
                    gap: 1rem;

                    @media screen and (min-width: 425px) {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    @media screen and (min-width: 640px) {
                        grid-template-columns: repeat(3, 1fr);
                    }

                    @media screen and (min-width: 960px) {
                        grid-template-columns: repeat(4, 1fr);
                    }
                }

            }
        }

        button {
            &.sticky {
                position: sticky;
                bottom: 1rem;
            }

            &.offline{
                background-color: var(--color-error);
                color: var(--color-white);
                border: none;

                span {
                    display: block;
                }
            }

            display: block;
            width: 100%;
            padding: 1rem 2rem;
            border-radius: .5rem;
            font-weight: 700;
            font-size: 1.25rem;
        }
    }

    > section#order-review {
        position: fixed;
        right: 1rem;
        bottom: 1rem;
        z-index: 2;

        button {
            display: grid;
            place-items: center;

            height: 4rem;
            width: 4rem;

            border-radius: 50%;

            z-index: 4;

            span{
                &:first-of-type{
                    position: absolute;
                    top: -5px;
                    right: -5px;

                    display: grid;
                    place-items: center;
                    width: 2rem;
                    height: 2rem;
                    background-color: lightcoral;
                    border-radius: 50%;
                    aspect-ratio: 1/1;
                    font-size: 1.25rem;
                    z-index: 5;
                }

                &:last-of-type{
                    font-size: 2rem;
                }
            }
        }
    }
}

.order-count-enter-active,
.order-count-leave-active {
    transition: all 0.3s;
}

.order-count-enter-from,
.order-count-leave-to {
    transform: scale(1.2);
}

</style>