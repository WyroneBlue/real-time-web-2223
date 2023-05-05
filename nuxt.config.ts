// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: ["@nuxtjs/supabase", "@vite-pwa/nuxt"],
  alias: {
    "@": "~/",
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  pwa: {
    manifest: {
      name: "RTW: Restaurant Order App",
      short_name: "RTW",
      description: "An app to order food from a restaurant",
      theme_color: "#add8e6",
      background_color: "#ffffe0",
      display: "standalone",
      scope: "/",
      start_url: "/",
    },
    workbox: {
      navigateFallback: "/",
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
});
