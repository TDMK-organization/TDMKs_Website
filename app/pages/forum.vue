<template>
    <LayoutPageLayout class="bg_layout">
        <UPageHeader
            class="header"
            title="TDMK chia sẻ kiến thức"
            description="Đây là trang chia sẻ kiến thức, tài liệu, thủ thuật về công nghệ và dịch vụ mà TDMK đã biên tập được với mục đích phi lợi nhuận."
            headline="News & Forum"
            :links="links"
        />

        <UPageBody>
            <div style="display: flex; flex-direction: column">
                <NewsQuickNews :posts="posts" :loading="pending" />
                <NewsListNews />
            </div>
        </UPageBody>
    </LayoutPageLayout>
</template>
<script setup>
const pendingPage = ref(false);

const {
    data: posts,
    pending,
    error,
} = await useFetch("/api/post/postsCategory", {
    method: "GET",
    query: { id_category: "69c9eadfb09007343f9a77e1" },
    transform: (response) => {
        return response.data;
    },
});



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
export default {};
</script>
<style scoped>
.bg_layout {
    min-height: 100vh;
}
</style>
