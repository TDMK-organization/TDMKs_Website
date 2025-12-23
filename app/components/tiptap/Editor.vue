<script setup>
import { ref, computed } from "vue";


const items = [
    { kind: "mark", mark: "bold", icon: "i-lucide-bold" },
    { kind: "mark", mark: "italic", icon: "i-lucide-italic" },
    { kind: "heading", level: 1, icon: "i-lucide-heading-1" },
    { kind: "heading", level: 2, icon: "i-lucide-heading-2" },
    { kind: "textAlign", align: "left", icon: "i-lucide-align-left" },
    { kind: "textAlign", align: "center", icon: "i-lucide-align-center" },
    { kind: "bulletList", icon: "i-lucide-list" },
    { kind: "orderedList", icon: "i-lucide-list-ordered" },
    { kind: "blockquote", icon: "i-lucide-quote" },
    { kind: "link", icon: "i-lucide-link" },
];
const internalEditorRef = ref(null);

// Quan trọng: Expose editor ra ngoài để cha có thể dùng editorRef.value.editor
defineExpose({
    editor: computed(() => internalEditorRef.value?.editor),
});
</script>

<template>
    <UEditor
        ref="internalEditorRef"
        v-slot="{ editor }"
    >
        <UEditorToolbar :editor="editor" :items="items" />
    </UEditor>
</template>
