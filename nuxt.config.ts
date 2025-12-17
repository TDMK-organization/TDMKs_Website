import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    css: ["~/assets/css/main.css"],
    modules: ["@nuxtjs/i18n", "@nuxt/image", "@nuxt/ui", "nuxt-tiptap-editor"],
    vite: {
        plugins: [tailwindcss()],
    },
    i18n: {
        detectBrowserLanguage: {
            useCookie: true,
            alwaysRedirect: true,
            cookieKey: "i18n_redirected",
            redirectOn: "root", // recommended
        },
        strategy: "no_prefix",
        defaultLocale: "vn",
        locales: [
            { code: "en", name: "English", file: "en.json" },
            { code: "jp", name: "Japanese", file: "jp.json" },
            { code: "vn", name: "Vietnamese", file: "vn.json" },
        ],
    },
});