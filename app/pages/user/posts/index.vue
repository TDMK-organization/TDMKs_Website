<script setup>
// 1. Quản lý Session & Auth
const { user, clear: clearSession } = useUserSession();
const router = useRouter();

definePageMeta({
    layout: "user",
    middleware: ["authenticated"],
});

// 2. Trạng thái Filter & Sort
const q = ref(""); // Từ khóa tìm kiếm tiêu đề
const sort = ref({ column: "createdDate", direction: "desc" }); // Mặc định tin mới nhất lên đầu

// 3. Fetch dữ liệu từ API
const {
    data: responses,
    pending,
    error: err,
} = await useFetch("/api/post/posts", {
    method: "GET",
});

// 4. Logic xử lý dữ liệu (Filter + Sort)
const filteredRows = computed(() => {
    let data = responses.value?.data || [];

    // Filter: Lọc theo tiêu đề (Title)
    if (q.value) {
        data = data.filter((post) => {
            return post.title?.toLowerCase().includes(q.value.toLowerCase());
        });
    }

    // Sort: Sắp xếp động
    const { column, direction } = sort.value;
    return [...data].sort((a, b) => {
        const aValue = a[column];
        const bValue = b[column];
        const modifier = direction === "asc" ? 1 : -1;

        if (aValue < bValue) return -1 * modifier;
        if (aValue > bValue) return 1 * modifier;
        return 0;
    });
});

// 5. Định nghĩa các cột (Columns)
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
        sortable: true,
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
        sortable: true,
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
        sortable: true,
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

// 6. Hàm Logout
const handleLogout = async () => {
    try {
        await $fetch("/api/auth/logout", { method: "POST" });
        clearSession();
        await router.push("/login");
    } catch (e) {
        console.error("Logout failed", e);
    }
};

// 7. Hành động trên từng dòng
function getRowItems(row) {
    return [
        [
            {
                label: "Chỉnh sửa",
                icon: "i-lucide-pencil",
                onSelect: () => {
                    // Chuyển hướng đến trang chi tiết với query id_post
                    navigateTo(
                        `/user/posts/detail?id_post=${row.original._id}`,
                        {
                            external: true, // Mở link ngoài nếu service.tdmk.vn khác domain hiện tại
                        },
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
            refreshNuxtData();
        } catch (e) {
            console.error("Xóa bài viết thất bại", e);
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
                        @click="refreshNuxtData()"
                    />
                    <UButton
                        label="Tạo bài mới"
                        icon="i-lucide-plus"
                        color="primary"
                    />
                </div>
            </div>

            <UTable
                v-model:sort="sort"
                :data="filteredRows"
                :columns="columns"
                :loading="pending"
                sort-mode="manual"
                class="flex-1"
            >
                <template #empty-state>
                    <div
                        class="flex flex-col items-center justify-center py-10 gap-3"
                    >
                        <span class="text-sm text-gray-500"
                            >Không tìm thấy bài viết nào.</span
                        >
                    </div>
                </template>
            </UTable>
        </template>
    </UDashboardPanel>
</template>

<style scoped>
/* Tuỳ chỉnh chiều cao bảng để scroll mượt trong Dashboard */
:deep(table) {
    width: 100%;
}
</style>
