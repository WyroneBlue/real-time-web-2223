// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: ["@nuxtjs/supabase"],
  alias: {
    "@": "~/",
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
});
