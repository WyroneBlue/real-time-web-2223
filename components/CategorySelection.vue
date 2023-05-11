<script setup>
const emit = defineEmits(['setCategory']);

const state = reactive({
    activeCategory: null,
    categories: null,
});

const { data, pending } = await useFetch('/api/menu-items/categories');
state.categories = data.value?.data;

const setActiveCategory = (slug) => {
    state.activeCategory = slug;
    emit('setCategory', slug);
}

</script>

<template>
    <section>
        <ClientOnly v-if="!pending">
            <h2>Categories</h2>
            <ul>
                <li @click="setActiveCategory(null)" :class="{ active: state.activeCategory === null }">
                    All
                </li>
                <li v-for="category in state.categories" :key="category.id" @click="setActiveCategory(category.slug)" :class="{ active: state.activeCategory === category.slug }">
                    {{ category.title }}
                </li>
            </ul>
        </ClientOnly>
        <LoadingSpinner v-else />
    </section>
</template>

<style lang="scss" scoped>
section {
    position: sticky;
    top: 0;
    z-index: 1;
    margin-top: -80px;
    padding-top: 70px;
    background-color: lightblue;

    ul {
        display: flex;
        gap: 1rem;
        padding-block: 1rem;
        overflow: auto;

        li {
            display: grid;
            place-items: center;
            flex-shrink: 0;
            padding: 1rem;
            border: 1px solid #ccc;
            border-radius: 0.5rem;
            cursor: pointer;
            background-color: #fff;
            color: #000;

            // hide scrollbar
            &::-webkit-scrollbar {
                display: none;
            }

            &.active {
                background-color: #000;
                color: #fff;
            }
        }
    }
}
</style>