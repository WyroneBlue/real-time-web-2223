<script setup>
const props = defineProps({
    tables: {
        type: Array,
        required: true,
    },
});

const active_tables = computed(() => {
    return props.tables.filter(table => table.status === 'active');
});
</script>

<template>
    <section>
        <div>
            <h2>Current Tables:</h2>
            <span> Active({{ active_tables.length }})</span>
        </div>
        <ul>
            <li v-for="table in tables" :key="table.id" :class="{active: table.status === 'active'}" >
                <span>Table: {{ table.name }}</span>
                <span v-if="table.last_seen">
                    Last seen: {{ table.last_seen }}
                </span>
                <span v-else-if="table.status === 'active'">
                    currently active
                </span>
                <span v-else>
                    not active
                </span>
            </li>
        </ul>
    </section>
</template>

<style lang="scss" scoped>
section{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;

    div{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    ul{
        display: flex;
        gap: 1rem;

        li{
            display: flex;
            flex-direction: column;
            align-items: center;

            width: auto;

            padding: 1rem 2rem;
            background-color: lightgray;
            border: 2px solid black;
            border-radius: .5rem;

            &.active{
                background-color: lightgreen;
            }
        }
    }
}

</style>