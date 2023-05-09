<script setup>
const toast = useToast();

const show =  computed(() => toast.value.msg != "");

const closeToast = () => {
    toast.value.msg = '';
}

watch(toast, (value) => {
    if (value != '' && value.duration != 0) {
        setTimeout(() => {
            closeToast();
        }, toast.value.duration);
    }
})
</script>
<template>
    <Transition name="toast">
        <section v-if="show" :class="toast.type">
            <p @click="checkMsg">
                {{ toast.msg }}
            </p>

            <button @click="closeToast">
                ❌
            </button>
        </section>
    </Transition>
</template>

<style lang="scss" scoped>
section{
    position: fixed;
    bottom: 0;
    inset-inline: 0;
    height: 5rem;
    padding: 1rem;
    background-color: lightcoral;
    border: 1px solid #12b488;

    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 9999;

    &.success {
        background-color: lightgreen;
    }

    &.error {
        background-color: lightcoral;
    }

    button {
        height: 100%;
        width: auto;
        aspect-ratio: 1/1;
        border-radius: .25rem;
        font-size: large;
    }
}

.toast-enter-active, .toast-leave-active {
    transition: all 0.3s;
}

.toast-enter-from, .toast-leave-to {
    transform: translateY(100%);
}
</style>