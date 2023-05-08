<script setup>
const routes = [
    {
        name: 'Bar',
        path: '/orders/bar',
    },
    {
        name: 'Kitchen',
        path: '/orders/kitchen',
    },
];
</script>

<template>
    <header>
        <RouterLink to="/">
            <h1>Order System</h1>
        </RouterLink>
        <nav>
            <ul>
                <li v-for="route in routes" :key="route.name">
                    <RouterLink :to="route.path" :exact="true">
                        {{ route.name }}
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </header>
</template>


<style lang="scss" scoped>
header{
    position: fixed;
    top: 0;
    inset-inline: 1rem;
    z-index: 3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: .5rem;
    height: 60px;
    padding: 1rem 0;
    border-bottom: 1px solid white;
    background-color: lightblue;

    a{
        text-decoration: none;
        color: black;

        h1{
            font-size: 1.25rem;
        }
    }

    nav {
        ul{
            display: flex;
            gap: 1rem;
        }
    }
}
</style>