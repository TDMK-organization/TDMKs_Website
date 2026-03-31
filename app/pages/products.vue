<template>
    <LayoutPageLayout class="bg_layout">
        <UPageHeader
            class="header"
            title="Dự án"
            description="Một số dự án TDMK đang và đã triển khai."
            headline="News & Forum"
            :links="links"
        />

        <UPageBody>
            <div class="flex flex-col space-y-12">
                <section>
                    <div class="flex items-center gap-2 m-5">
                        <UIcon
                            name="i-lucide-sparkles"
                            class="text-primary w-6 h-6"
                        />
                        <h2
                            class="text-primary text-3xl sm:text-4xl lg:text-3xl tracking-tight font-bold"
                        >
                            Tin nổi bật
                        </h2>
                    </div>

                    <div
                        v-if="pendingTop"
                        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-5"
                    >
                        <USkeleton
                            v-for="i in 4"
                            :key="i"
                            class="h-64 w-full rounded-2xl"
                        />
                    </div>

                    <NewsQuickNews
                        v-else-if="postsTop && postsTop.length"
                        :posts="postsTop"
                    />

                    <div v-else class="text-center py-10 text-gray-500 italic">
                        Chưa có tin nổi bật nào.
                    </div>
                </section>

                <section>
                    <div
                        class="flex items-center gap-2 m-5 border-t border-gray-100 dark:border-gray-800 pt-10"
                    >
                        <UIcon
                            name="i-lucide-layout-list"
                            class="text-primary w-6 h-6"
                        />
                        <h2
                            class="text-primary text-3xl sm:text-4xl lg:text-3xl tracking-tight font-bold"
                        >
                            Danh sách bài viết
                        </h2>
                    </div>

                    <NewsListNews :posts="postList" :loading="pending" />

                    <div class="flex justify-center mt-12 pb-10">
                        <UPagination
                            v-model="page"
                            :page-count="pageCount"
                            :total="totalRows"
                            show-last
                            show-first
                            size="md"
                            :ui="{
                                rounded: 'rounded-full',
                                wrapper: 'shadow-sm',
                            }"
                            @update:model-value="onPageChange"
                        />
                    </div>
                </section>
            </div>
        </UPageBody>
    </LayoutPageLayout>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// --- TRẠNG THÁI & CẤU HÌNH ---
const page = ref(1);
const pageCount = ref(10); // Số lượng bài viết hiển thị trên mỗi trang

// --- FETCH DATA 1: TIN NỔI BẬT (CATEGORY RIÊNG) ---
const { data: postsTop, pending: pendingTop } = await useFetch(
    "/api/post/postsCategory",
    {
        method: "GET",
        query: {
            id_category: "69cb5355032931e54752787a",
            limit: 4,
        },
        // Bóc tách đúng tầng data.data theo cấu trúc API của bạn
        transform: (response: any) => response.data?.data || [],
    },
);

// --- FETCH DATA 2: DANH SÁCH BÀI VIẾT CÓ PHÂN TRANG ---
const { data: responseList, pending } = await useFetch(
    "/api/post/postsCategory",
    {
        method: "GET",
        query: {
            id_category: "69cb535f032931e54752787f",
            page: page, // Nuxt tự động quan sát ref này
            limit: pageCount,
        },
        // Quan trọng: Tự động fetch lại khi số trang (page) thay đổi
        watch: [page],
    },
);

// --- COMPUTED PROPERTIES ---
// Lấy danh sách bài viết từ tầng lồng nhau: response.data.data
const postList = computed(() => responseList.value?.data?.data || []);

// Lấy tổng số bản ghi từ tầng: response.data.pagination.total
const totalRows = computed(
    () => responseList.value?.data?.pagination?.total || 0,
);

// --- ACTIONS ---
const onPageChange = () => {
    // Cuộn lên đầu vùng nội dung mượt mà khi đổi trang
    window.scrollTo({
        top: 400, // Cuộn xuống dưới Header một chút để thấy nội dung mới
        behavior: "smooth",
    });
};

const links = [
    {
        label: "GitHub Organization",
        icon: "i-simple-icons-github",
        to: "https://github.com/TDMK-organization",
        target: "_blank",
    },
    {
        label: "Hỗ trợ Zalo",
        icon: "i-lucide-message-circle",
        to: "https://zalo.me/0385319701",
        target: "_blank",
    },
];
</script>

<style scoped>
.bg_layout {
    min-height: 100vh;
    /* Bạn có thể thêm background gradient nhẹ ở đây nếu muốn */
}

/* Hiệu ứng mượt cho các thẻ bài viết */
.header {
    margin-bottom: 2rem;
}
</style>
