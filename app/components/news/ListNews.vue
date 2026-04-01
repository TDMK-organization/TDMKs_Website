<script setup lang="ts">
import type { BlogPostProps } from "@nuxt/ui";

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
    <div class="flex flex-col gap-4">
        <UPageCard
            v-for="(item, index) in posts"
            :key="index"
            :to="`/post/${item.slug || item._id}`"
            orientation="horizontal"
            reverse
            class="flex-1 group"
            :ui="{
                // Tùy chỉnh để phần body (chứa ảnh) và content cân đối
                body: { padding: 'p-0' },
                wrapper: 'items-center',
            }"
        >
            <template #title>
                <div
                    class="line-clamp-2 font-bold group-hover:text-primary transition-colors"
                >
                    {{ item.title }}
                </div>
            </template>
            <template #description>
                <div class="line-clamp-2 text-sm mt-1 text-gray-400">
                    {{ item.description }}
                </div>
            </template>

            <div
                class="basis-1/3 md:basis-1/4 aspect-[16/10] overflow-hidden rounded-r-xl"
            >
                <img
                    :src="
                        item.thumbnail ||
                        'https://nuxt.com/assets/blog/nuxt-icon/cover.png'
                    "
                    alt="AI VISION"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>
        </UPageCard>
    </div>
</template>
