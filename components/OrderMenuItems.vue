<script setup>
import { useOnline } from '@vueuse/core'

const online = useOnline()
const isOnline = computed(() => online.value)

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
        if (!grouped[order.status.slug]) {
            grouped[order.status.slug] = [];
        }

        grouped[order.status.slug].push(order);
    });

    return grouped;
});
</script>
<template>
    <section :id="type">
        <div>
            <h1>{{ Heading }} orders:</h1>
            <p v-if="!isOnline">No internet connection<span>⚠️</span></p>
        </div>

        <ClientOnly>
            <OrderStatusList :orders="groupedOrders.preparing" statusTitle="Preparing" type="preparing"/>
            <OrderStatusList :orders="groupedOrders.ready" statusTitle="Ready" type="ready"/>
            <OrderStatusList :orders="groupedOrders.delivered" statusTitle="Delivered" type="delivered"/>
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

    div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;

        h1 {
            font-size: 2rem;
        }

        p {
            font-weight: bold;
            span{
                font-size: 2rem;
            }
        }
    }
}
</style>