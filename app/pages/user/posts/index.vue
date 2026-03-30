<script setup>
import { ref, computed, watch, h, resolveComponent } from "vue";

// 1. Quản lý Session & Auth
const { user, clear: clearSession } = useUserSession();
const router = useRouter();

definePageMeta({
    layout: "user",
    middleware: ["authenticated"],
});

// 2. Trạng thái Filter & Phân trang
const q = ref(""); // Từ khóa tìm kiếm
const page = ref(1); // Trang hiện tại
const pageCount = ref(10); // Đổi thành 10 bài viết trên 1 trang

// Reset về trang 1 nếu người dùng gõ tìm kiếm
watch(q, () => {
    page.value = 1;
});


// 3. Gọi API (Sử dụng watch để Nuxt tự động reload khi biến thay đổi)
const {
    data: responseData,
    pending,
    refresh,
} = await useFetch("/api/post/posts", {
    method: "GET",
    query: {
        page: page,
        limit: pageCount,
        q: q,
    },
    watch: [page, q, pageCount],
});


// 5. Bóc tách trực tiếp dữ liệu từ API để đưa vào bảng
// Chúng ta không dùng .filter hay .sort trên JS nữa, vì Backend đã (hoặc sẽ) làm việc đó
const rows = computed(() => responseData.value?.data?.data || []);
const totalRows = computed(
    () => responseData.value?.data?.pagination?.total || 0,
);

// 6. Định nghĩa Cột (Giữ nguyên)
const columns = [
    {
        accessorKey: "_id",
        header: "ID",
        class: "w-20",
        cell: ({ row }) =>
            h(
                "span",
                { class: "font-mono text-xs text-neutral-500" },
                `#${row.getValue("_id").slice(-6)}`,
            ),
    },
    {
        accessorKey: "title",
        header: "Tiêu đề",
        cell: ({ row }) =>
            h(
                "span",
                { class: "font-medium line-clamp-1" },
                row.getValue("title"),
            ),
    },
    {
        accessorKey: "category",
        header: "Danh mục",
        cell: ({ row }) => {
            const category = row.original.category;
            return h(
                resolveComponent("UBadge"),
                { color: "neutral", variant: "outline", size: "sm" },
                () => category?.name || "Trống",
            );
        },
    },
    {
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({ row }) => {
            const isEnable = row.getValue("status") === "enable";
            return h(
                resolveComponent("UBadge"),
                {
                    color: isEnable ? "green" : "red",
                    variant: "soft",
                    size: "sm",
                },
                () => (isEnable ? "Hoạt động" : "Khóa"),
            );
        },
    },
    {
        accessorKey: "createdDate",
        header: "Thời gian",
        cell: ({ row }) =>
            h(
                "span",
                { class: "text-neutral-500 text-sm" },
                new Date(row.getValue("createdDate")).toLocaleString("vi-VN"),
            ),
    },
    {
        id: "actions",
        cell: ({ row }) =>
            h(
                resolveComponent("UDropdownMenu"),
                { content: { align: "end" }, items: getRowItems(row) },
                () =>
                    h(resolveComponent("UButton"), {
                        icon: "i-lucide-ellipsis-vertical",
                        color: "neutral",
                        variant: "ghost",
                    }),
            ),
    },
];

// 7. Xử lý hành động trên menu dòng
function getRowItems(row) {
    return [
        [
            {
                label: "Chỉnh sửa",
                icon: "i-lucide-pencil",
                onSelect: () => {
                    navigateTo(
                        `/user/posts/detail?id_post=${row.original._id}`,
                        { external: true },
                    );
                },
            },
        ],
        [
            {
                label: "Xóa",
                icon: "i-lucide-trash",
                color: "red",
                onSelect: () => deletePost(row.original._id),
            },
        ],
    ];
}

const deletePost = async (id) => {
    if (confirm("Bạn có chắc muốn xóa bài viết này?")) {
        try {
            await $fetch(`/api/post/${id}`, { method: "DELETE" });
            refresh();
        } catch (e) {
            console.error("Xóa bài viết thất bại", e);
            alert("Lỗi khi xóa bài viết!");
        }
    }
};
</script>

<template>
    <UDashboardPanel grow>
        <template #header>
            <UDashboardNavbar title="Quản lý bài viết (S-RMS)">
                <template #leading>
                    <UDashboardSidebarCollapse />
                </template>
            </UDashboardNavbar>
        </template>

        <template #body>
            <div
                class="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between"
            >
                <UInput
                    v-model="q"
                    icon="i-lucide-search"
                    placeholder="Tìm kiếm tiêu đề bài viết..."
                    class="w-72"
                    size="md"
                />
                <div class="flex gap-2">
                    <UButton
                        icon="i-lucide-refresh-cw"
                        color="neutral"
                        variant="outline"
                        @click="refresh()"
                    />
                    <UButton
                        label="Tạo bài mới"
                        icon="i-lucide-plus"
                        color="primary"
                    />
                </div>
            </div>

            <UTable
                :data="rows"
                :columns="columns"
                :loading="pending"
                class="flex-1"
            >
                <template #empty-state>
                    <div
                        class="flex flex-col items-center justify-center py-10 gap-3"
                    >
                        <UIcon
                            name="i-lucide-file-question"
                            class="w-10 h-10 text-gray-400"
                        />
                        <span class="text-sm text-gray-500"
                            >Không tìm thấy bài viết nào.</span
                        >
                    </div>
                </template>
            </UTable>

            <div
                v-if="totalRows > 0"
                class="flex justify-between items-center px-4 py-3 border-t border-gray-200 dark:border-gray-800"
            >
                <span class="text-sm text-gray-500">
                    Tổng cộng: <b>{{ totalRows }}</b> bài viết
                </span>

                <UPagination
                    v-model:page="page"
                    :page-count="pageCount"
                    :total="totalRows"
                />
            </div>
        </template>
    </UDashboardPanel>
</template>

<style scoped>
:deep(table) {
    width: 100%;
}
</style>
