<template>
    <!-- header -->
    <HeaderNav />
    <main>
        <slot />
    </main>
</template>

<script setup>
useHead({
    title: 'Restaurant Management',
    meta: [
        { name: 'description', content: 'Manage your restaurant' }
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
main{
    padding-top: 60px;
}
</style>