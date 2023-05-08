<script setup>
const client = useSupabaseAuthClient()

const form = reactive({
    email: '',
    password: '',
    error: '',
    loading: false,
});

const login = async () => {
    form.loading = true;
    const { error } = await client.auth.signInWithPassword({
        email: form.email,
        password: form.password,
    });

    if (error) {
        form.error = error.message;
    } else {
        form.loading = false;
        navigateTo('/');
    }
}

definePageMeta({
    layout: "login",
});
</script>

<template>
    <section>
        <ClientOnly>
            <form @submit.prevent="login">
                <label for="email">
                    Email
                    <input type="email" id="email" v-model="form.email" placeholder="Email" required />
                </label>


                <label for="password">
                    Password
                    <input type="password" id="password" v-model="form.password" placeholder="Password" required />
                </label>

                <button type="submit" :disabled="form.loading">
                    <span v-if="form.loading">Logging in...</span>
                    <span v-else>Login</span>
                </button>
            </form>
        </ClientOnly>
    </section>
</template>

<style lang="scss" scoped>
section {
    position: fixed;
    inset: 0;

    display: grid;
    place-items: center;

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        label {
            display: flex;
            flex-direction: column;
            gap: .5rem;

            input {
                padding: 0.5rem;
                border: 1px solid #ccc;
                border-radius: 0.25rem;
            }
        }

        button {
            display: block;
            padding: .5rem 1rem;
            border-radius: .25rem;
        }
    }

}
</style>