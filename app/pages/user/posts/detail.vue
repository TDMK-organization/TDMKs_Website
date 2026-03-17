<script setup>
const route = useRoute();
const selectedId = ref();
const editorRef = ref(null);

definePageMeta({
    layout: "user",
    middleware: ["authenticated"],
});

const postId = computed(() => route.query.id_post);

// Fetch danh sách Category
const { data: categoriesData, pending: pendingCat } =
    await useFetch("/api/category/list");

const categories = computed(() => {
    const list = categoriesData.value?.categories || [];
    if (list.length > 0) {
        return list.map((item) => ({
            id: item.id,
            label: item.name,
        }));
    }

    return list;
});

const dataForm = ref({
    _id: "",
    title: "",
    description: "",
    content: "",
    category: {},
    status: "",
    createdDate: "",
    updatedDate: "",
    __v: 0,
});

// Fetch chi tiết bài viết
const { data: dataPost, pending: pendingPost } = await useFetch(
    "/api/post/detail",
    {
        key: `post-detail-${postId.value}`,
        query: { id_post: postId },
        onResponse({ response }) {
            if (response.status === 200) {
                const post = response._data;
                dataForm.value = {
                    _id: post._id,
                    title: post.title,
                    description: post.description,
                    content: post.content,
                    category: post.category,
                    status: post.status,
                    createdDate: post.createdDate,
                    updatedDate: post.updatedDate,
                    __v: post.__v,
                };
            }
        },
    },
);

// WATCH: Quan trọng nhất để update selectedId mà không bị mất data
watch(
    [categories, dataForm],
    ([newCats, newPost]) => {
        if (newCats.length > 0 && newPost?.category?._id) {
            selectedId.value = newPost.category._id;
        }
    },
    { immediate: true, deep: true },
);

// Thay vì watch bình thường, hãy chỉ gán content vào form MỘT LẦN DUY NHẤT khi fetch xong
watch(
    dataPost,
    (newVal) => {
        if (newVal && newVal.content) {
            dataForm.value = { ...newVal };
            // Nếu bạn cần sync selectedId
            if (newVal.category?._id) {
                selectedId.value = newVal.category._id;
            }
        }
    },
    { immediate: true },
);

const selectedCategoryName = computed(() => {
    return (
        categories.value.find((c) => c.id === selectedId.value)?.name ||
        "Chọn danh mục..."
    );
});

// Hàm cập nhật bài viết
const handleUpdatePost = async () => {
    try {
        const postId = dataForm.value._id;
        const payload = {
            title: dataForm.value.title,
            description: dataForm.value.description,
            content: dataForm.value.content,
            category: selectedId.value,
            status: dataForm.value.status,
        };

        const { data, error } = await useFetch("/api/post/update", {
            method: "PUT",
            body: payload,
            query: { id_post: postId },
        });

        if (error.value) {
            console.error("Lỗi cập nhật bài viết:", error.value);
            alert("Cập nhật thất bại. Vui lòng thử lại.");
        } else {
            alert("Cập nhật thành công!");
        }
    } catch (err) {
        console.error("Lỗi không mong muốn:", err);
        alert("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
};
</script>

<template>
    <UDashboardPanel>
        <template #header>
            <UDashboardNavbar :title="dataForm.title || 'Chi tiết bài viết'">
                <template #leading>
                    <UDashboardSidebarCollapse variant="subtle" />
                </template>
                <template #right>
                    <UButton label="Lưu thay đổi" @click="handleUpdatePost" />
                </template>
            </UDashboardNavbar>
        </template>

        <template #body>
            <div class="flex bg-tiptap h-full">
                <div class="p-4 border-r dark:border-gray-800">
                    <div class="space-y-4 w-125">
                        <UFormField label="Danh mục" required>
                            <USelectMenu
                                v-model="selectedId"
                                :items="categories"
                                value-key="id"
                                option-attribute="name"
                                :loading="pendingCat"
                                placeholder="Chọn danh mục..."
                                class="w-full"
                            >
                                <template #label>
                                    <span v-if="selectedId">{{
                                        categories.find(
                                            (c) => c.id === selectedId,
                                        )?.name || "Đang chọn..."
                                    }}</span>
                                    <span v-else>Chọn danh mục...</span>
                                </template>
                            </USelectMenu>
                        </UFormField>
                        <UFormField label="Header bài viết" required>
                            <UInput
                                class="w-full"
                                :ui="{
                                    base: 'text-3xl sm:text-4xl text-pretty font-bold text-highlighted',
                                }"
                                size="xl"
                                v-model="dataForm.title"
                            />
                        </UFormField>

                        <UFormField label="Tóm tắt nhanh" required>
                            <UTextarea
                                class="w-full"
                                :ui="{
                                    base: 'text-lg text-pretty text-muted mt-4',
                                }"
                                :rows="12"
                                v-model="dataForm.description"
                            />
                        </UFormField>
                        <USwitch
                            v-model="dataForm.status"
                            label="Active bài viết"
                        />
                    </div>
                </div>

                <div
                    class="flex-1 p-4 overflow-y-auto bg-white dark:bg-gray-900"
                >
                    <div
                        class="mb-2.5 text-sm font-semibold text-primary flex items-center gap-1.5"
                    >
                        <UIcon name="ph:tag-light" />
                        <span
                            >{{
                                categories.find((c) => c.id === selectedId)
                                    ?.label || "Chưa chọn danh mục"
                            }}
                        </span>
                    </div>
                    <div
                        class="text-3xl sm:text-4xl text-pretty font-bold text-highlighted"
                    >
                        <span>{{ dataForm.title }}</span>
                    </div>
                    <div class="text-lg text-pretty text-muted mt-4">
                        <span>{{ dataForm.description }}</span>
                    </div>
                    <ClientOnly>
                        <TiptapEditor
                            v-if="!pendingPost"
                            ref="editorRef"
                            v-model="dataForm.content"
                        />
                        <template #fallback>
                            <div class="h-40 bg-gray-100 animate-pulse">
                                Đang tải trình soạn thảo...
                            </div>
                        </template>
                    </ClientOnly>
                </div>
            </div>
        </template>
    </UDashboardPanel>
</template>
