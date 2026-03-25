import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    ssr: true,
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
                { name: 'google-site-verification', content: 'uNgUnYHfgf2U23sOYXLp1lL9yyPcs8uLaUrvGLLfh1Y' },
                { charset: "utf-8" },
            ],
        },
    },

    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    css: ["~/assets/css/main.css"],
    modules: [
        "@nuxtjs/i18n",
        "@nuxt/image",
        "@nuxt/ui",
        "nuxt-auth-utils",
        "@nuxtjs/seo",
        "@nuxt/image",
    ],
    // cấu hình seo
    site: {
        url: "https://service.tdmk.vn", // RẤT QUAN TRỌNG: Thay bằng domain thật của bạn
        name: "TDMK - Smart Factory Solutions",
        description:
            "Nền tảng tiên phong cho lộ trình chuyển đổi số nhà máy 4.0 và AI Vision.",
        defaultLocale: "vi", // Khai báo ngôn ngữ mặc định là Tiếng Việt
    },
    seo: {
        redirectToCanonicalSiteUrl: true, // Tự động redirect về domain chính nếu gõ sai (ví dụ từ www về non-www)
    },
    // cấu hình webP
    image: {
        format: ["webp"], // Tự động ép tất cả ảnh xuất ra định dạng WebP cho nhẹ
        quality: 80, // Giữ chất lượng ảnh ở mức 80% để tối ưu dung lượng
        // domains: ['api.tdmk.vn'], // Mở comment dòng này nếu bạn lấy ảnh từ một server/API khác
    },
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
