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

const emit = defineEmits(['removeItem' ]);

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
                        <p>{{ item.quantity }}</p>

                        <button @click.prevent="removeItem(item.id)">
                            🗑️
                        </button>
                    </section>

                </section>
                <!-- <p>{{ item.note || 'no notes' }}</p> -->
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
            > section{
                display: flex;
                justify-content: space-between;
                align-items: center;

                section {
                    display: flex;
                    justify-content: end;
                    align-items: center;
                    gap: .5rem;

                    p {
                        width: 2rem;
                        text-align: center;
                    }

                    button {
                        display: grid;
                        place-items: center;
                        padding: .5rem;
                        background-color: white;
                        border: 2px solid black;
                        border-radius: .5rem;
                        aspect-ratio: 1/1;
                    }
                }
            }
        }
    }
}
</style>