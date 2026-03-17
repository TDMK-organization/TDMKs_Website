<template>
    <div>
        <h1>Preview</h1>
        <div :class="theme.slots.base" v-html="editorRef?.editor?.getHTML()" />
        <!-- <TiptapPreview ref="editorRef" /> -->
    </div>
    <div></div>
</template>
<script>
export default {};
</script>
<style lang=""></style>
