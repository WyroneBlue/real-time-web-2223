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
        width: 100%;
        flex-wrap: wrap;

        span{
            display: block;
            width: 100%;
            flex-grow: 1;
        }
    }

    section{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;

        div {
            display: grid;
            grid-template-columns: 1fr 3fr 1fr;
            align-items: center;
            gap: .5rem;

            input {
                width: 100%;
                padding: .5em .5em;
                text-align: center;
            }
        }
    }

    button {
        display: block;
        width: 100%;
        padding: .5em 1em;
    }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}
</style>