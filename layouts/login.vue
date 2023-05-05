<template>
    <main>
        <slot />
    </main>
</template>

<script setup>
useHead({
    title: 'Login | Restaurant Management',
    meta: [
        { name: 'description', content: 'Login' }
    ],
})
</script>


<style scoped>
.router-link-exact-active {
    color: #12b488;
}

.router-link-exact-active.btn {
    color: white;
}
</style>