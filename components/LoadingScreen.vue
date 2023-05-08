<script setup>
const props = defineProps({
    loading: Boolean,
});
</script>
<template>
    <Transition name="loading">
        <aside v-if="loading">
            <span></span>
        </aside>
    </Transition>
</template>

<style lang="scss" scoped>
aside {
    position: fixed;
    inset: 0;

    display: grid;
    place-items: center;
    z-index: 9999;
    background-color: lightblue;

    span {
        width: 100px;
        height: 100px;
        border-radius: 30px;
        border-top: 30px solid lightcoral;
        border-bottom: 20px solid lightyellow;
        animation: spin 1s ease-in-out infinite;
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.loading-enter-active,
.loading-leave-active {
    transition: all 0.4s;
}

.loading-enter-from,
.loading-leave-to {
    opacity: 0;
    scale: 0;
    filter: blur(2px);
}
</style>