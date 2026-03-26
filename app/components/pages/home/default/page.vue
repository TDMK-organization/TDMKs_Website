<template>
    <PagesHomeDefaultCarousel />
    <PagesHomeDefaultProduct />
        <PagesAboutusDefaultPartner />
    <LayoutPageLayout class="bg_layout relative overflow-hidden font-sans">
        <div class="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8 mt-10">
            <PagesContactusContactForm />
        </div>

        <div
            class="relative flex items-center w-full max-w-5xl mx-auto py-16 px-4"
        >
            <div
                class="flex-grow border-t border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
            ></div>

            <span
                class="flex-shrink-0 mx-4 text-emerald-400 font-mono text-xs md:text-sm uppercase tracking-widest bg-emerald-500/10 px-6 py-2 rounded-full border border-emerald-500/30 backdrop-blur-md animate-pulse"
            >
                Hoặc kết nối trực tiếp
            </span>

            <div
                class="flex-grow border-t border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
            ></div>
        </div>

        <div class="relative w-full max-w-7xl mx-auto px-4 lg:px-8 pb-20 z-10">
            <Header text="Thông tin liên hệ TDMK" class="mb-10 text-center" />

            <div
                class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 justify-center"
            >
                <UPageCard
                    v-for="(item, index) in contactInfo"
                    :key="index"
                    :title="item.title"
                    :description="item.description"
                    :icon="item.icon"
                    :to="item.to"
                    target="_blank"
                    spotlight
                    spotlight-color="primary"
                    class="transform transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)] bg-slate-900/50 backdrop-blur-sm border-slate-800"
                    :ui="{ icon: { base: 'text-emerald-400' } }"
                />
            </div>
        </div>

        <div
            class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] bg-emerald-600/10 blur-[150px] pointer-events-none z-0"
        ></div>
    </LayoutPageLayout>
</template>
<script setup>
import { ref } from "vue";
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

// Tách dữ liệu ra thành mảng động, mỗi thẻ có nội dung, icon và chức năng bấm riêng biệt
const contactInfo = ref([
    {
        title: "Trụ sở chính",
        description: "Tòa nhà Machinco, 10 Trần Phú, Hà Đông, Hà Nội",
        icon: "i-heroicons-map-pin-20-solid",
        to: "https://maps.google.com/?q=Tòa+nhà+Machinco,+10+Trần+Phú,+Hà+Đông,+Hà+Nội", // Mở Google Maps
    },
    {
        title: "Đường dây nóng (Hotline)",
        description: "0912 345 678", // Bạn thay bằng số thật nhé
        icon: "i-heroicons-phone-arrow-up-right-20-solid",
        to: "tel:0912345678", // Bấm vào tự động gọi điện
    },
    {
        title: "Email hỗ trợ",
        description: "contact@tdmk.vn", // Bạn thay bằng email thật nhé
        icon: "i-heroicons-envelope-open-20-solid",
        to: "mailto:contact@tdmk.vn", // Bấm vào tự động mở app gửi mail
    },
]);
</script>
