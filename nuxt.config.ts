import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    app: {
        head: {
            title: "TDMK Service - Beside your mine",
            link: [
                // Đường dẫn đến favicon
                { rel: "icon", type: "image/x-icon", href: "/TDMKLogoB.svg" },

                // Nếu bạn dùng file .png (khuyên dùng để hiển thị đẹp hơn trên mobile)
                { rel: "icon", type: "image/png", href: "/TDMKLogoW.png" },

                // Apple Touch Icon (cho iPhone/iPad)
                { rel: "apple-touch-icon", href: "/TDMKLogoW.png" },
            ],
            meta: [
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1",
                },
                { charset: "utf-8" },
            ],
        },
    },

    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    css: ["~/assets/css/main.css"],
    modules: ["@nuxtjs/i18n", "@nuxt/image", "@nuxt/ui", "nuxt-auth-utils"],

    vite: {
        plugins: [tailwindcss()],
        optimizeDeps: {
            include: [
                "@nuxt/ui > prosemirror-state",
                "@nuxt/ui > prosemirror-transform",
                "@nuxt/ui > prosemirror-model",
                "@nuxt/ui > prosemirror-view",
                "@nuxt/ui > prosemirror-gapcursor",
            ],
        },
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
