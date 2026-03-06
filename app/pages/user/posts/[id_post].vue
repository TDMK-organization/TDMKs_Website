<template>
    <LayoutPageLayout class="bg_layout">
        <UPageHeader
            class="header"
            title="Kiểm tra chất lượng âm thanh của thiết bị thông minh (Loa, Đồng hồ thông minh, Robot,…) với SoundCheck – Listen"
            description="SoundCheck – Hệ thống kiểm tra âm thanh vòng hở (open-loop) chuyên dụng cho Loa thông minh, Smartwatch và Robot. Hỗ trợ đo đáp ứng tần số, độ méo Rub & Buzz, SNR và tiêu chuẩn TIA/ETSI. Tích hợp hoàn hảo với Python, LabVIEW và hệ thống PLC trên dây chuyền sản xuất."
            headline="News & Forum"
            :links="links"
        />
        this posst pages DI :{{ id_post }}
        <UButton to="edit\1">Link</UButton>
    </LayoutPageLayout>
</template>
<script setup>
useSeoMeta({
    title: "Kiểm tra chất lượng âm thanh của thiết bị thông minh với SoundCheck – Listen",
    ogTitle:
        "Kiểm tra chất lượng âm thanh của thiết bị thông minh với SoundCheck – Listen",
    description:
        "SoundCheck – Hệ thống kiểm tra âm thanh vòng hở (open-loop) chuyên dụng cho Loa thông minh, Smartwatch và Robot. Hỗ trợ đo đáp ứng tần số, độ méo Rub & Buzz, SNR và tiêu chuẩn TIA/ETSI. Tích hợp với Python, LabVIEW và hệ thống PLC trên dây chuyền sản xuất.",
    ogDescription:
        "SoundCheck – Hệ thống kiểm tra âm thanh vòng hở (open-loop) chuyên dụng cho Loa thông minh, Smartwatch và Robot. Hỗ trợ đo đáp ứng tần số, độ méo Rub & Buzz, SNR và tiêu chuẩn TIA/ETSI. Tích hợp với Python, LabVIEW và hệ thống PLC trên dây chuyền sản xuất.",
    ogImage: "https://example.com/image.png",
    twitterCard: "summary_large_image",
});
</script>
<script>
export default {
    computed: {
        id_post() {
            // 2. Truy cập route thông qua this.$route
            // Dùng this.$route.params.id_post
            return this.$route.params.id_post;
        },
    },
    data() {
        return {};
    },
};
</script>
<style lang=""></style>
