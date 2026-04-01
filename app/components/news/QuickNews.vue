<script setup>
import { watch } from "vue";

const props = defineProps({
    loading: {
        type: Boolean,
        default: false,
    },
    posts: {
        type: Array,
        default: () => [],
    },
});
</script>

<template>
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-10">
        <div class="lg:col-span-3">
            <UPageCard
                :title="posts[0].title"
                :description="posts[0].description"
                :to="`/post/${posts[0].slug || posts[0]._id}`"
                icon="i-simple-icons-tailwindcss"
                orientation="vertical"
                reverse
                spotlight
                spotlight-color="primary"
                class="h-full"
            >
                <img
                    :src="
                        posts[0].thumbnail
                            ? posts[0].thumbnail
                            : 'https://nuxt.com/assets/blog/nuxt-icon/cover.png'
                    "
                    alt="AI Vision"
                    class="w-full h-auto mt-10"
                />
            </UPageCard>
        </div>

        <div class="lg:col-span-2 flex flex-col gap-4 h-full">
            <UPageCard
                v-for="(item, index) in posts.slice(1, 4)"
                :key="index"
                :to="`/post/${item.slug || item._id}`"
                orientation="horizontal"
                reverse
                class="flex-1"
            >
                <template #title>
                    <div class="line-clamp-2 font-bold">
                        {{ item.title }}
                    </div>
                </template>
                <template #description>
                    <div class="line-clamp-2 text-sm mt-1 text-gray-400">
                        {{ item.description }}
                    </div>
                </template>

                <img
                    :src="
                        item.thumbnail
                            ? item.thumbnail
                            : 'https://nuxt.com/assets/blog/nuxt-icon/cover.png'
                    "
                    alt="AI VISION "
                    class="w-full h-full object-cover"
                />
            </UPageCard>
        </div>
    </div>
</template>

<style scoped>
/* Không cần float, không cần tính % thủ công nữa, xóa sạch cho nhẹ file */
</style>
