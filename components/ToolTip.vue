<script setup>
import { useParentElement } from '@vueuse/core'

const parentEl = useParentElement()

onMounted(() => {
    parentEl.value.classList.add('tooltip');
})

const props = defineProps({
    msg: {
        type: String,
        default: '',
    },
});
</script>
<template>
    <span>
        {{ msg }}
    </span>
</template>

<style lang="scss" scoped>
.tooltip span {
    position: absolute;
    bottom: -40px;
    left: 0;
    max-width: 100%;
    padding: 5px 10px;
    background-color: black;
    color: #fff;
    border-radius: 6px;
    text-align: center;

    visibility: hidden;
    z-index: 1;
}

.tooltip:hover span {
    visibility: visible;
}
</style>