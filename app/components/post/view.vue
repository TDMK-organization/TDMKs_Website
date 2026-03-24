<template>
    <div class="post-view-container">
        <div v-if="loading" class="loading-overlay">
            <USkeleton class="h-100 w-100vw flex center">Loading</USkeleton>
        </div>
        <div v-else :class="theme.slots.base" v-html="content" />
    </div>
</template>

<script setup>
import { defineProps } from "vue";
import theme from "#build/ui/editor";

const props = defineProps({
    loading: {
        type: Boolean,
        default: false,
    },
    content: {
        type: String,
        default: "",
    },
});
</script>
