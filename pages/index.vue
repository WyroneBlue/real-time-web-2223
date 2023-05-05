<script setup>
const state = reactive({
    category: null,
});

</script>

<template>
    <div>
        <section>
            <h1>Order System</h1>

            <p>take a new order</p>
        </section>

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