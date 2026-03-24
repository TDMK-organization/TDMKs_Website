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
        
        <PostView :loading="pendingPost" :content="dataPost?.content || ''" />
    </LayoutPageLayout>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useFetch, useSeoMeta } from '#imports';

const route = useRoute();

// Lấy ID từ URL Params (VD: /post/123)
// Lưu ý: Nếu lấy từ query string (?id=123), hãy dùng route.query.id
const id_post = computed(() => route.params.id);

// Tối ưu useFetch: Lấy trực tiếp data và pending state
const { data: dataPost, pending: pendingPost } = await useFetch("/api/post/detail", {
    query: { id_post },
    // Dùng transform để map data chuẩn xác từ response thay vì dùng onResponse để gán ref thủ công
    transform: (response) => {
        // Giả sử API trả về data nằm trong response._data (hoặc tùy cấu trúc API của bạn)
        // Nếu API trả thẳng object bài viết, bạn chỉ cần: return response;
        return response._data || response; 
    }
});

// Cập nhật SEO Meta tự động theo dữ liệu bài viết (Hỗ trợ cực tốt cho SSR)
useSeoMeta({
    title: () => dataPost.value?.title || 'Đang tải...',
    ogTitle: () => dataPost.value?.title,
    description: () => dataPost.value?.description,
    ogDescription: () => dataPost.value?.description,
    ogImage: "https://example.com/image.png", // Có thể đổi thành: () => dataPost.value?.thumbnail
    twitterCard: "summary_large_image",
});
</script>