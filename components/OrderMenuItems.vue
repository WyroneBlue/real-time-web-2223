<script setup>
const props = defineProps({
    type: {
        type: String,
        default: null,
    },
    Heading: {
        type: String,
        default: null,
    },
    intro: {
        type: String,
        default: null,
    },
    orders: {
        type: Array,
        default: null,
    },
});

const groupedOrders = computed(() => {
    const grouped = {};

    props.orders.forEach((order) => {
        console.log(order);
        if (!grouped[order.status.slug]) {
            grouped[order.status.slug] = [];
        }

        grouped[order.status.slug].push(order);
    });

    return grouped;
});

console.log(groupedOrders);



</script>
<template>
    <section :id="type">
        <h1>{{ Heading }} orders:</h1>

        <ClientOnly>
            <OrderStatusList :orders="groupedOrders.preparing" statusTitle="Preparing" />
            <OrderStatusList :orders="groupedOrders.ready" statusTitle="Ready" />
            <OrderStatusList :orders="groupedOrders.delivered" statusTitle="Delivered" />
        </ClientOnly>
    </section>
</template>

<style lang="scss" scoped>
section#bar,
section#kitchen {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;

    h1 {
        font-size: 2rem;
    }
}
</style>