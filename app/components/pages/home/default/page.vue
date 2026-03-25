<template>
    <PagesHomeDefaultCarousel />
    <PagesHomeDefaultProduct />
    <UPageCard>
        <PagesAboutusDefaultPartner />
    </UPageCard>
    <LayoutPageLayout class="bg_layout">
        <PagesContactusContactForm class="mt-30" />
        <div class="text-2xl font-bold mb-2 text-center mt-30">Hoặc</div>
        <Header text="Hãy liên hệ cho chúng tôi" />
        <div
            class="bg-card mt-30 flex flex-wrap gap-4 justify-center p-4 rounded-lg"
        >
            <UPageCard
                v-for="value in items"
                :title="value.title"
                class="w-80"
                description="Tòa nhà Machinco, 10 Trần Phú, Hà Đông, Hà Nội"
                icon="i-simple-icons-tailwindcss"
                to="https://tailwindcss.com/docs/v4-beta"
                target="_blank"
            />
        </div>
    </LayoutPageLayout>
</template>
<script setup>
useSeoMeta({
    title: "TDMK - Giải pháp Chuyển đổi số & Nhà máy thông minh 4.0",
    description:
        "TDMK cung cấp hệ thống AI Vision, quản trị Big Data và IoT tự động hóa, giúp tối ưu hiệu suất và nâng tầm quy trình sản xuất cho doanh nghiệp của bạn.",
    ogTitle: "TDMK - Giải pháp Chuyển đổi số & Nhà máy thông minh 4.0",
    ogDescription:
        "TDMK cung cấp hệ thống AI Vision, quản trị Big Data và IoT tự động hóa...",
    ogImage: "https://tdmk.vn/images/og-homepage.jpg", // Ảnh bìa khi share link
    twitterCard: "summary_large_image",
});
</script>
<script>
export default {
    data() {
        return {
            items: [
                { title: "Địa chỉ" },
                { title: "Số điện thoại" },
                { title: "Email" },
            ],
        };
    },
};
</script>
<style scoped></style>
