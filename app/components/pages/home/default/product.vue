<template>
    <div
        class="bg-product relative min-h-screen py-24 overflow-hidden flex flex-col items-center"
    >
        <div
            class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[rgb(var(--ui-primary)/0.1)] blur-[120px] pointer-events-none rounded-full"
        ></div>

        <div
            class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
            <div class="text-center max-w-6xl mx-auto mb-16 reveal">
                <Header text="Các dịch vụ và sản phẩm của chúng tôi" />
                <p
                    class="text-lg sm:text-xl text-slate-400 mt-6 text-balance leading-relaxed"
                >
                    Chúng tôi cung cấp các dịch vụ và sản phẩm chất lượng cao,
                    đáp ứng nhu cầu đa dạng của khách hàng trong lĩnh vực công
                    nghiệp và kỹ thuật.
                </p>
            </div>

            <div
                class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8"
            >
                <UPageCard
                    v-for="(item, index) in items"
                    :key="index"
                    spotlight
                    spotlight-color="primary"
                    class="reveal h-full flex flex-col group border border-slate-800 bg-slate-900/50 hover:border-[rgb(var(--ui-primary)/0.5)] transition-all duration-500 hover:-translate-y-2 cursor-pointer shadow-lg"
                    :style="{ transitionDelay: `${index * 100}ms` }"
                >
                    <UBlogPost
                        :title="item.title"
                        :description="item.description"
                        :image="item.image"
                        :to="item.to"
                        target="_blank"
                        variant="naked"
                        class="h-full flex flex-col"
                        :ui="{
                            wrapper: 'flex-1 flex flex-col',
                            title: 'text-xl font-bold text-white group-hover:text-[rgb(var(--ui-primary))] transition-colors',
                            description:
                                'text-slate-400  leading-relaxed line-clamp-none mt-4',
                        }"
                    />
                </UPageCard>
            </div>

            <div
                class="mt-16 flex justify-center reveal"
                style="transition-delay: 400ms"
            >
                <UButton
                    trailing-icon="i-lucide-arrow-right"
                    to="/products"
                    size="xl"
                    color="primary"
                    variant="solid"
                    class="rounded-full px-10 shadow-[0_0_20px_rgba(var(--ui-primary),0.3)] hover:scale-105 transition-transform"
                >
                    Xem thêm
                </UButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const items = ref([
    {
        title: "TDMK AI VISION",
        description:
            "Giải pháp tích hợp Machine Learning vào sản xuất hỗ trợ cho con người. Kiểm tra lỗi bề mặt, đo lường kích thước, hướng dẫn robot...",
        // Ảnh mô tả ống kính/AI quét với ánh sáng công nghệ
        image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=800&auto=format&fit=crop",
    },
    {
        title: "TDMK SPC",
        description:
            "Hệ thống kiểm soát quy trình bằng thống kê, giúp số hóa dữ liệu chất lượng. Tự động tính toán năng lực sản xuất (Cpk, Pp), dự báo xu hướng lỗi...",
        // Ảnh mô tả biểu đồ, dữ liệu, màn hình phân tích (Dashboard)
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    },
    {
        title: "TDMK IIoT",
        description:
            "Nền tảng kết nối vạn vật công nghiệp, thu thập dữ liệu thời gian thực từ mọi thiết bị hiện trường. Tối ưu hóa hiệu suất tổng thể (OEE)...",
        // Ảnh mô tả mạng lưới kết nối dữ liệu sáng rực, bo mạch IoT
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    },
    {
        title: "Thiết bị đo lường và camera",
        description:
            "Phân phối đa dạng thiết bị đo lường điện, kiểm tra cơ khí chính xác, phân tích vật liệu (NDT) và quan trắc môi trường. Sản phẩm chính hãng...",
        to: "https://tdmk.vn/san-pham/",
        // Ảnh mô tả thiết bị kỹ thuật, đo lường công nghiệp, thấu kính
        image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?q=80&w=800&auto=format&fit=crop",
    },
]);

// Kích hoạt hiệu ứng cuộn (Reveal)
onMounted(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-active");
                }
            });
        },
        { threshold: 0.1 },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
});
</script>

<style scoped>
/* 1. HIỆU ỨNG XUẤT HIỆN CHẬM (REVEAL) */
.reveal {
    opacity: 0;
    transform: translateY(30px);
    filter: blur(5px);
    transition: all 1s cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal-active {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
}

/* 2. HIỆU ỨNG NỀN CHUYỂN ĐỘNG (Cải tiến) */
.bg-product {
    /* Khai báo dải màu gradient tối để animation có thể chạy */
    background: linear-gradient(
        -45deg,
        #020617,
        #0f172a,
        rgb(var(--ui-primary) / 0.05),
        #020617
    );
    background-size: 400% 400%;
    animation: gradientBG 15s ease infinite;
}

@keyframes gradientBG {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
</style>
