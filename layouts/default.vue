<script setup>
useHead({
    title: 'Restaurant Management',
    meta: [
        { name: 'description', content: 'Manage your restaurant' }
    ],
})

const loading = ref(true);
onMounted(() => {
    loading.value = false;
})
</script>

<template>
    <!-- header -->
    <HeaderNav />
    <main>
        <slot />
    </main>
    <LoadingScreen :loading="loading"/>
    <ToastMessage />
</template>

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