// server/api/posts/forum.ts

export default defineEventHandler((event) => {
    const query = getQuery(event);

    // Giả lập dữ liệu từ Database
    return {
        main: {
            title: "Nuxt 3 + Tailwind v4: Tương lai của Web Development",
            description:
                "Khám phá cách Nuxt UI kết hợp với Tailwind CSS v4 để tạo ra giao diện đột phá.",
            srcImage: "/tailwindcss-v4.svg",
            altImage: "Alt text mặc định",
        },
        posts: [
            {
                to: "/posts/1",
                title: "Nuxt Icon v1 đã chính thức ra mắt",
                description:
                    "Bộ icon mới giúp tối ưu hóa hiệu suất và dễ dàng tùy biến hơn bao giờ hết.",
                image: "https://nuxt.com/assets/blog/nuxt-icon/cover.png",
                date: "2024-11-25",
            },
            {
                to: "/posts/2",
                title: "Cập nhật Nuxt 3.14 có gì mới?",
                description:
                    "Bản cập nhật tập trung vào việc cải thiện tốc độ build và hỗ trợ các tính năng mới cho dev.",
                image: "https://nuxt.com/assets/blog/v3.14.png",
                date: "2024-11-04",
            },

            {
                to: "/posts/3",
                title: "Cập nhật Nuxt 3.14 có gì mới?",
                description:
                    "Bản cập nhật tập trung vào việc cải thiện tốc độ build và hỗ trợ các tính năng mới cho dev.",
                image: "https://nuxt.com/assets/blog/v3.14.png",
                date: "2024-11-04",
            },
        ],
    };
});
