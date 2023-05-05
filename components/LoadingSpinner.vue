<template>
    <span></span>
</template>

<style scoped>
span{
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border: 5px solid #ccc;
    border-top-color: #333;
    display: inline-block;
    animation: spin 1s infinite ease-in-out;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(359deg);
    }
}
</style>