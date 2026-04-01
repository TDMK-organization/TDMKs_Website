<template>
    <LayoutPageLayout class="bg_layout">
        <UPageHeader
            :title="dataPost?.title"
            :description="dataPost?.description"
        >
            <template v-if="pendingPost" #title>
                <USkeleton class="h-8 w-56" />
            </template>
            <template v-if="pendingPost" #description>
                <USkeleton class="h-4 w-80" />
            </template>
        </UPageHeader>
        <article class="max-w-4xl mx-auto w-full">
            <PostView
                :loading="pendingPost"
                :content="dataPost?.content || ''"
            />
        </article>
    </LayoutPageLayout>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useFetch, useSeoMeta } from "#imports";

const route = useRoute();

// Lấy ID từ URL Params (VD: /post/123)
// Lưu ý: Nếu lấy từ query string (?id=123), hãy dùng route.query.id
const id_post = computed(() => route.params.id);
// Tối ưu useFetch: Lấy trực tiếp data và pending state
const { data: dataPost, pending: pendingPost } = await useFetch(
    "/api/post/detail",
    {
        query: { id_post },
        // Dùng transform để map data chuẩn xác từ response thay vì dùng onResponse để gán ref thủ công
        transform: (response) => {
            return response._data || response;
        },
    },
);

// Cập nhật SEO Meta tự động theo dữ liệu bài viết (Hỗ trợ cực tốt cho SSR)
useSeoMeta({
    title: () => dataPost.value?.title || "Đang tải...",
    ogTitle: () => dataPost.value?.title,
    description: () => dataPost.value?.description,
    ogDescription: () => dataPost.value?.description,
    ogImage: () =>
        dataPost.value?.thumbnail || "https://service.tdmk.vn/TDMKLogo.svg", // Có thể đổi thành: () => dataPost.value?.thumbnail
    twitterCard: "summary_large_image",
    ogType: "article",
    author: "TDMK",
});

useHead(() => ({
    // Chống trùng lặp nội dung
    link: [
        {
            rel: "canonical",
            href: `https://service.tdmk.vn${route.path}`, // Thay tdmk.vn bằng domain thật của bạn
        },
    ],
    // Tiêm cấu trúc dữ liệu Article để lấy Rich Snippet trên Google
    script: [
        {
            type: "application/ld+json",
            innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                mainEntityOfPage: {
                    "@type": "WebPage",
                    "@id": `https://service.tdmk.vn${route.path}`,
                },
                headline: dataPost.value?.title,
                description: dataPost.value?.description,
                image: dataPost.value?.thumbnail
                    ? [dataPost.value.thumbnail]
                    : [],
                datePublished: dataPost.value?.createdDate,
                dateModified:
                    dataPost.value?.updatedDate || dataPost.value?.createdDate,
                author: {
                    "@type": "Organization",
                    name: "TDMK",
                    url: "https://service.tdmk.vn",
                },
                publisher: {
                    "@type": "Organization",
                    name: "TDMK",
                    logo: {
                        "@type": "ImageObject",
                        url: "https://service.tdmk.vn/TDMKLogo.svg",
                    },
                },
            }),
        },
    ],
}));
</script>
