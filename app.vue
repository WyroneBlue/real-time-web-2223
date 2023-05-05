<template>
    <NuxtLayout>
        <Transition name="page" mode="out-in">
            <div :key="$route.fullPath">
                <NuxtPage />
            </div>
        </Transition>
    </NuxtLayout>
</template>

<style>
/* Css reset */
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    position: relative;
}

body{
    font-family: DM Sans, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    background-color: lightblue;
}

ul{
    list-style: none;
}

button{
    cursor: pointer;
}

.page-enter-active,
.page-leave-active {
    transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(2px);
}

.menu-items-move, /* apply transition to moving elements */
.menu-items-enter-active,
.menu-items-leave-active {
  transition: all 0.5s ease;
}

.menu-items-enter-from,
.menu-items-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.menu-items-leave-active {
  position: absolute;
}
</style>