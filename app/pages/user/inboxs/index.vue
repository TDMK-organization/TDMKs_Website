<script setup>
import { ref, computed, watch, h, resolveComponent } from "vue";

// 1. Quản lý Session & Auth
const { user, clear: clearSession } = useUserSession();
const router = useRouter();

definePageMeta({
    layout: "user",
    middleware: ["authenticated"],
});



// 3. Gọi API (Sử dụng watch để Nuxt tự động reload khi biến thay đổi)
const {
    data: responseData,
    pending,
    refresh,
} = await useFetch("/api/report", {
    method: "GET",
    // Nếu API hỗ trợ tìm kiếm qua query 'q', giữ dòng dưới. Nếu không thì bỏ đi và tự filter ở FE.
});

// 4. Bóc tách trực tiếp dữ liệu từ API
// Dựa theo JSON mới: mảng data nằm ngay ở responseData.data
const rows = computed(() => responseData.value?.data || []);
const totalRows = computed(() => rows.value.length);

// 5. Định nghĩa Cột cho bảng Báo cáo/Liên hệ
const columns = [
    {
        accessorKey: "fullname",
        header: "Họ và tên",
        cell: ({ row }) =>
            h("span", { class: "font-medium" }, row.getValue("fullname")),
    },
    {
        accessorKey: "phone",
        header: "Số điện thoại",
        cell: ({ row }) => h("span", {}, row.getValue("phone")),
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => h("span", { class: "text-sm text-gray-500" }, row.getValue("email")),
    },
    {
        accessorKey: "content",
        header: "Nội dung yêu cầu",
        cell: ({ row }) =>
            h(
                "span",
                { class: "line-clamp-1 max-w-[250px] text-sm text-gray-600 truncate" },
                row.getValue("content")
            ),
    },
    {
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({ row }) => {
            const isPending = row.getValue("status") === "pending";
            return h(
                resolveComponent("UBadge"),
                {
                    color: isPending ? "orange" : "green",
                    variant: "soft",
                    size: "sm",
                },
                () => (isPending ? "Chưa xử lý" : "Đã xử lý"),
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: "Ngày gửi",
        cell: ({ row }) =>
            h(
                "span",
                { class: "text-neutral-500 text-sm" },
                new Date(row.getValue("createdAt")).toLocaleString("vi-VN"),
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

// 6. Xử lý hành động trên menu dòng
function getRowItems(row) {
    const isPending = row.original.status === "pending";

    return [
        [
            // Nút chuyển trạng thái
            {
                label: isPending ? "Đánh dấu đã xử lý" : "Đánh dấu chưa xử lý",
                icon: isPending ? "i-lucide-check-circle" : "i-lucide-clock",
                color: isPending ? "green" : "orange",
                onSelect: () => toggleStatus(row.original._id, row.original.status),
            },
        ],
        [
            // Nút xem chi tiết (nếu có trang chi tiết thì mở comment)
            // {
            //     label: "Xem chi tiết",
            //     icon: "i-lucide-eye",
            //     onSelect: () => {
            //         navigateTo(`/user/reports/detail?id=${row.original._id}`);
            //     },
            // },
            // Nút xóa
            {
                label: "Xóa liên hệ",
                icon: "i-lucide-trash",
                color: "red",
                onSelect: () => deleteReport(row.original._id),
            },
        ],
    ];
}

// 7. Các hàm gọi API tương tác
const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "resolved" : "pending"; // Giả định status đã xử lý là 'resolved'
    try {
        await $fetch(`/api/report/${id}`, {
            method: "PUT",
            body: { status: newStatus },
        });
        refresh(); // Tải lại bảng sau khi cập nhật
    } catch (e) {
        console.error("Cập nhật trạng thái thất bại", e);
        alert("Lỗi khi cập nhật trạng thái!");
    }
};

const deleteReport = async (id) => {
    if (confirm("Bạn có chắc muốn xóa yêu cầu liên hệ này? Hành động không thể hoàn tác.")) {
        try {
            // Thêm API Delete nếu backend của bạn có hỗ trợ, hiện tại comment tạm
            // await $fetch(`/api/reports/${id}`, { method: "DELETE" });
            alert("Đã gửi yêu cầu xóa (Chức năng đang chờ API Backend).");
            // refresh();
        } catch (e) {
            console.error("Xóa liên hệ thất bại", e);
            alert("Lỗi khi xóa liên hệ!");
        }
    }
};
</script>

<template>
    <UDashboardPanel grow>
        <template #header>
            <UDashboardNavbar title="Quản lý Liên hệ khách hàng (Reports)">
                <template #leading>
                    <UDashboardSidebarCollapse />
                </template>
            </UDashboardNavbar>
        </template>

        <template #body>
            <div class="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                
                <div class="flex gap-2">
                    <UButton
                        icon="i-lucide-refresh-cw"
                        color="neutral"
                        variant="outline"
                        @click="refresh()"
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
                    <div class="flex flex-col items-center justify-center py-10 gap-3">
                        <UIcon
                            name="i-lucide-inbox"
                            class="w-10 h-10 text-gray-400"
                        />
                        <span class="text-sm text-gray-500">
                            Không có yêu cầu liên hệ nào.
                        </span>
                    </div>
                </template>
            </UTable>

            <div
                v-if="totalRows > 0"
                class="flex justify-between items-center px-4 py-3 border-t border-gray-200 dark:border-gray-800"
            >
                <span class="text-sm text-gray-500">
                    Tổng cộng: <b>{{ totalRows }}</b> yêu cầu
                </span>
            </div>
        </template>
    </UDashboardPanel>
</template>

<style scoped>
:deep(table) {
    width: 100%;
}
</style>