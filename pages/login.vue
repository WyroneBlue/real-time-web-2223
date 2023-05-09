<script setup>
import { useSetToast } from '~/composables/toast';

const client = useSupabaseAuthClient()

const form = reactive({
    email: '',
    password: '',
    loading: false,
});

const login = async () => {
    form.loading = true;
    const { error } = await client.auth.signInWithPassword({
        email: form.email,
        password: form.password,
    });

    if (error) {

        useSetToast({
            type: 'error',
            msg: error.message,
            duration: 5000
        })
    } else {
        navigateTo('/');
    }
    form.loading = false;
}

definePageMeta({
    layout: "login",
    middleware: "guest",
});
</script>

<template>
    <section>
        <ClientOnly>
            <h1>Login</h1>
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

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 300px;

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

        .error{
            padding: .5rem 1rem;
            background-color: red;
            color: black;
            border-radius: .25rem;
        }
    }

}

.error-enter-active,
.error-leave-active {
    transition: opacity 0.3s, transform 0.5s;
}

.error-enter-from,
.error-leave-to {
    transform: translateY(10rem);
    opacity: 0;
}
</style>