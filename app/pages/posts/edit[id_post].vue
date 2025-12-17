<script setup>
definePageMeta({
    layout: "user",
});
</script>
<template>
    <div>Header<UserEditorRichText /></div>
</template>
<script>
export default {
    computed: {
        id_post() {
            return this.$route.params.id_post;
        },
    },
};
</script>
<style scoped></style>
