<template>
    <LayoutPageLayout class="bg_layout">
        <UPageHeader
            class="header"
            title="Dự án"
            description="Một số dự án TDMK đang và đã triển khai."
            headline="News & Forum"
            :links="links"
        />

        <UPageBody>
            <div style="display: flex; flex-direction: column">
                <NewsQuickNews />
                <NewsListNews />
            </div>
        </UPageBody>
    </LayoutPageLayout>
</template>
<script setup>
const links = ref([
    {
        label: "GitHub",
        icon: "i-simple-icons-github",
        to: "https://github.com/nuxt/ui/tree/v4/src/runtime/components/PageHeader.vue",
        target: "_blank",
    },
]);
</script>
<script>
export default {
    data() {
        return {};
    },
};
</script>
<style scoped>
.bg_layout {
    min-height: 100vh;
}
</style>
