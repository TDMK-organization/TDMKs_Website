<script setup>
import theme from "#build/ui/editor";

const internalEditorRef = useTemplateRef("internalEditorRef");
</script>

<template>
    <div
        :class="theme.slots.base"
        v-html="internalEditorRef?.editor?.getHTML()"
    />
</template>
