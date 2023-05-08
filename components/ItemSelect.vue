<script setup>
const emit = defineEmits([ 'addItem' ]);
const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
    count: {
        type: Number,
        default: 1,
    },
    inOrder: {
        type: Boolean,
        default: false,
    },
});

const state = reactive({
    item: props.item,
    count: props.count,
});

const addItem = () => {
    emit('addItem', state);
};

const updateQuantity = (type) => {
    if (type === 'plus') {
        state.count++;
    } else if(state.count > 1){
        state.count--;
    }
};

watch(() => props.count, () => {
    console.log('props.count changed');
    state.count = 1;
});
</script>

<template>
    <label :for="item.slug">

        <div>
            <span>{{ item.title }}</span>
            <span>€{{ item.price }}</span>
        </div>

        <section>
            <div>
                <button @click.prevent="updateQuantity('min')">-</button>
                <input type="number" :id="item.slug" v-model="state.count" min="1" />
                <button @click.prevent="updateQuantity('plus')">+</button>
            </div>

            <button @click.prevent="addItem">
                {{ inOrder ? 'Update quantity' : 'Add to order' }}
            </button>
        </section>
    </label>
</template>

<style lang="scss" scoped>
label {

    &:first-of-type {
        border-radius: 0 .5rem .5rem;
    }

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem;
    background-color: lightyellow;
    border: 1px solid black;
    border-radius: .5rem;

    > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: .25rem;

        span {
            text-align: center;

            &:first-of-type {
                font-weight: bold;
            }
        }
    }

    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;

        div {
            display: grid;
            grid-template-columns: 2fr 3fr 2fr;
            align-items: center;
            gap: .5rem;

            input {
                width: 100%;
                padding: .5em .5em;
                text-align: center;
            }

            button {
                &:first-of-type {
                    border-radius: .5rem 0 0 .5rem;
                }

                &:last-of-type {
                    border-radius: 0 .5rem .5rem 0;
                }
            }
        }

        > button {
            height: 40px;
            border-radius: .5rem;
        }
    }

    button {
        display: block;
        width: 100%;
        padding: .5em 2em;
        border: 1px solid black;
        background-color: white;
    }

}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type=number] {
    -moz-appearance: textfield;
    appearance: textfield;
}
</style>