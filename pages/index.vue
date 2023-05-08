<script setup>
const state = reactive({
    category: null,
});

</script>

<template>
    <div>
        <CategorySelection @setCategory="state.category = $event" />
        <FoodSelection :category="state.category" />
    </div>
</template>

<style lang="scss" scoped>
div{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
}
</style>