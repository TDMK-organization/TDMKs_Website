<script setup>
import theme from "#build/ui/editor";
import { ref } from "vue";

const editorRef = ref(null);

definePageMeta({
    layout: "user",
});
</script>
<template>
    <div class="flex bg-tiptap">
        <div>
            <h1>Editor</h1>
            <TiptapEditor ref="editorRef" @update="() => $forceUpdate()" />
        </div>
        <div>
            <h1>Preview</h1>
            <div
                :class="theme.slots.base"
                v-html="editorRef?.editor?.getHTML()"
            />
            <!-- <TiptapPreview ref="editorRef" /> -->
        </div>
    </div>
</template>
<script>
export default {
    computed: {
        id_post() {
            return this.$route.params.id_post;
        },
    },
    data() {
        return {};
    },
    methods() {},
};
</script>
<style scoped>
.bg-tiptap > div {
    width: 50%;
}
</style>
