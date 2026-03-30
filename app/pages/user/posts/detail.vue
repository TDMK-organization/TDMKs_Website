<script setup>
import { ref, computed, watch } from "vue";
const route = useRoute();

definePageMeta({
    layout: "user",
    middleware: ["authenticated"],
});

const selectedId = ref();
const editorRef = ref(null);
const isUploading = ref(false);
const postId = computed(() => route.query.id_post);

const dataForm = ref({
    _id: "",
    title: "",
    description: "",
    thumbnail: "",
    content: "",
    category: {},
    status: "",
    createdDate: "",
    updatedDate: "",
    __v: 0,
});

// ==========================================
// 1. HÀM XỬ LÝ UPLOAD ẢNH THUMBNAIL
// ==========================================
const handleUploadThumbnail = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("Vui lòng chọn file hình ảnh hợp lệ!");
        event.target.value = ""; // Reset input
        return;
    }

    isUploading.value = true;

    const formData = new FormData();
    formData.append("files", file);

    try {
        const response = await $fetch("/api/post/upload", {
            method: "POST",
            body: formData,
        });

        if (response && response.success && response.url) {
            dataForm.value.thumbnail = response.url;
        } else {
            alert("Upload thành công nhưng không lấy được link ảnh.");
        }
    } catch (err) {
        console.error("Lỗi gọi API nội bộ:", err);
        const errMsg =
            err.response?._data?.statusMessage || "Upload ảnh thất bại.";
        alert(errMsg);
    } finally {
        isUploading.value = false;
        event.target.value = ""; // Rất quan trọng: Reset input để cho phép up lại chính file đó nếu lỡ xóa
    }
};

// ==========================================
// 2. FETCH DANH SÁCH DANH MỤC
// ==========================================
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

// ==========================================
// 3. FETCH CHI TIẾT BÀI VIẾT
// ==========================================
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
                    thumbnail: post.thumbnail,
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

// ==========================================
// 4. ĐỒNG BỘ DỮ LIỆU (WATCHERS)
// ==========================================
watch(
    [categories, dataForm],
    ([newCats, newPost]) => {
        if (newCats.length > 0 && newPost?.category?._id) {
            selectedId.value = newPost.category._id;
        }
    },
    { immediate: true, deep: true },
);

watch(
    dataPost,
    (newVal) => {
        if (newVal && newVal.content) {
            dataForm.value = { ...newVal };
            if (newVal.category?._id) {
                selectedId.value = newVal.category._id;
            }
        }
    },
    { immediate: true },
);

// ==========================================
// 5. CẬP NHẬT BÀI VIẾT LÊN SERVER
// ==========================================
const handleUpdatePost = async () => {
    try {
        const payload = {
            title: dataForm.value.title,
            description: dataForm.value.description,
            content: dataForm.value.content,
            category: selectedId.value,
            status: dataForm.value.status,
            thumbnail: dataForm.value.thumbnail,
        };

        const { error } = await useFetch("/api/post/update", {
            method: "PUT",
            body: payload,
            query: { id_post: dataForm.value._id },
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

                        <UFormField label="Ảnh đại diện (Thumbnail)">
                            <div class="flex flex-col gap-3 w-full">
                                <div>
                                    <div
                                        v-if="dataForm.thumbnail"
                                        class="relative w-full aspect-video rounded-md overflow-hidden border border-gray-200 dark:border-gray-800"
                                    >
                                        <img
                                            :src="dataForm.thumbnail"
                                            alt="Thumbnail"
                                            class="w-full h-full object-cover"
                                        />
                                        <UButton
                                            icon="i-heroicons-trash"
                                            color="red"
                                            variant="soft"
                                            size="xs"
                                            class="absolute top-2 right-2 backdrop-blur-md"
                                            @click="dataForm.thumbnail = ''"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <UInput
                                        type="file"
                                        accept="image/*"
                                        icon="i-heroicons-photo"
                                        :loading="isUploading"
                                        @change="handleUploadThumbnail"
                                        class="w-full"
                                    />
                                </div>
                            </div>
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
                        <span>{{
                            categories.find((c) => c.id === selectedId)
                                ?.label || "Chưa chọn danh mục"
                        }}</span>
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
                        <PostEditor
                            v-show="!pendingPost"
                            v-model="dataForm.content"
                        />
                        <template #fallback>
                            <div
                                class="h-40 mt-6 w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-md flex items-center justify-center text-sm text-gray-500"
                            >
                                Đang tải trình soạn thảo...
                            </div>
                        </template>
                    </ClientOnly>
                </div>
            </div>
        </template>
    </UDashboardPanel>
</template>
