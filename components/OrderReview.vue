<script setup>
const props = defineProps({
    order: {
        type: Array,
        default: [],
    },
    showOrder: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits([ 'updateOrder', 'removeItem' ]);

const removeItem = (id) => {
    emit('removeItem', id);
};
</script>

<template>
    <aside :class="{ 'show-order': props.showOrder }">

        <h2>Order</h2>

        <ul v-if="props.order.length > 0">
            <li v-for="item in props.order" :key="item.id">
                <section>
                    <p>{{ item.title }}</p>

                    <section>
                        <!-- <div>
                            <button @click.prevent="updateQuantity('min')">-</button>
                            <input type="number" :id="item.slug" v-model="item.quantity" min="1" />
                            <button @click.prevent="updateQuantity('plus')">+</button>
                        </div> -->
                        <p>{{ item.quantity }}</p>

                        <button @click.prevent="removeItem(item.id)">delete</button>
                    </section>

                </section>
                <p>{{ item.note || 'no notes' }}</p>
            </li>
        </ul>
        <p v-else>No orders yet</p>
    </aside>
</template>

<style lang="scss" scoped>
aside {
    position: fixed;
    inset-inline: 1rem;
    max-height: 80vh;
    bottom: 6rem;
    padding: 1rem;
    background-color: lightcoral;
    border-radius: .5rem;
    box-shadow: 0 0 1rem rgba(0,0,0,.1);
    z-index: 2;
    transform: translateY(100vh);
    transition: transform .3s ease-in-out;
    overflow-y: auto;

    &.show-order {
        transform: translateX(0);
    }

    ul{
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
}
</style>