<template>
    <div class="bg_quickNews">
        <div class="left_QN">
            <UPageCard
                title="Tailwind CSS"
                description="Nuxt UI integrates with latest Tailwind CSS v4, bringing significant improvements."
                icon="i-simple-icons-tailwindcss"
                orientation="vertical"
                reverse
                spotlight
                spotlight-color="primary"
            >
                <img
                    src="/tailwindcss-v4.svg"
                    alt="Tailwind CSS"
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
<script>
export default {
    data() {
        return {
            posts: ref([
                {
                    to: "/posts/1",
                    title: "Nuxt Icon v1 Nuxt Icon v1 Nuxt Icon v1  Nuxt Icon v1",
                    description:
                        "Discover Nuxt Icon v1sssss Discover Nuxt Icon v1sssss Discover Nuxt Icon v1sssss !Discover Nuxt Icon v1sssss Discover Nuxt Icon v1sssss Discover Nuxt Icon v1sssss !Discover Nuxt Icon v1sssss Discover Nuxt Icon v1sssss Discover Nuxt Icon v1sssss !",
                    image: "https://nuxt.com/assets/blog/nuxt-icon/cover.png",
                    date: "2024-11-25",
                },
                {
                    to: "/posts/2",
                    title: "Nuxt 3.14",
                    description: "Nuxt 3.14 is out!",
                    image: "https://nuxt.com/assets/blog/v3.14.png",
                    date: "2024-11-04",
                },
                {
                    to: "/posts/3",
                    title: "Nuxt 3.13",
                    description: "Nuxt 3.13 is out!",
                    image: "https://nuxt.com/assets/blog/v3.13.png",
                    date: "2024-08-22",
                },
            ]),
        };
    },
};
</script>
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
