<script setup>
// Khai báo props với giá trị mặc định cho 'main' và 'posts'
const props = defineProps({
    loading: {
        type: Boolean,
        default: false,
    },
    main: {
        type: Object,
        default: () => ({
            title: "Tiêu đề mặc định",
            description: "Mô tả mặc định cho bài viết chính.",
            srcImage: "/tailwindcss-v4.svg",
            altImage: "Alt text mặc định",
        }),
    },
    posts: {
        type: Array,
        default: () => [
            { 
                to: `/post/${1}`,
                title: "Nuxt Icon v1 sss",
                description: "Khám phá Nuxt Icon phiên bản mới nhất.",
                image: "https://nuxt.com/assets/blog/nuxt-icon/cover.png",
                date: "2024-11-25",
            },
            {
                to: { path: "/post", query: { id: 1 } },
                title: "Nuxt Icon v1",
                description: "Khám phá Nuxt Icon phiên bản mới nhất.",
                image: "https://nuxt.com/assets/blog/nuxt-icon/cover.png",
                date: "2024-11-25",
            },
            {
                to: { path: "/post", query: { id: 1 } },
                title: "Nuxt Icon v1",
                description: "Khám phá Nuxt Icon phiên bản mới nhất.",
                image: "https://nuxt.com/assets/blog/nuxt-icon/cover.png",
                date: "2024-11-25",
            },
        ],
    },
});
</script>
<template>
    <div class="bg_quickNews">
        <div class="left_QN">
            <UPageCard
                :title="main.title"
                :description="main.description"
                icon="i-simple-icons-tailwindcss"
                orientation="vertical"
                reverse
                spotlight
                spotlight-color="primary"
            >
                <img
                    :src="main.srcImage"
                    :alt="main.altImage"
                    class="w-full h-auto mt-10"
                />
            </UPageCard>
        </div>
        <div class="right_QN">
            <UPageCard
                v-for="(item, index) in posts"
                :key="index"
                :to="item.to"
                orientation="horizontal"
                reverse
            >
                <template #title>
                    <div class="title">
                        {{ item.title }}
                    </div></template
                >
                <template #description>
                    <div class="description-truncate">
                        {{ item.description }}
                    </div>
                </template>

                <img
                    src="/tailwindcss-v4.svg"
                    alt="Tailwind CSS"
                    class="w-full"
            /></UPageCard>
        </div>
    </div>
</template>

<style scoped>
/* 
.bg_quickNews {
} 
*/

.left_QN {
    width: 60%;
    float: left;
}
.right_QN {
    width: 40%;
    padding: 0px 20px;
    float: right;
}
.right_QN > div {
    margin-bottom: 20px;
    height: 170px;
    overflow: hidden;
}
.description-truncate {
    display: -webkit-box;
    -webkit-line-clamp: 3; /* Thay đổi số này để giới hạn số dòng (ví dụ: 3 dòng) */
    -webkit-box-orient: vertical;
    overflow: hidden;
    /* margin-bottom: 20px; - Không cần thiết nếu bạn đã có nó ở nơi khác */
    /* Bạn có thể bỏ thuộc tính height: 90px; trong template inline style nếu dùng cách này */
}
.right_QN .title {
    /* Đảm bảo chúng ta chỉ nhắm mục tiêu vào tiêu đề của các thẻ bên phải */
    display: -webkit-box;
    -webkit-line-clamp: 2; /* Giới hạn 2 dòng */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    /* Đảm bảo chiều cao của tiêu đề không cố định để nó có thể co giãn cho 1 hoặc 2 dòng */
    height: auto !important;
}
</style>
