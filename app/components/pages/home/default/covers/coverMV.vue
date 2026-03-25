<script setup>
const links = ref([
    {
        label: "Bắt đầu demo",
        to: "/docs/getting-started",
        icon: "i-lucide-square-play",
    },
    {
        label: "Tìm hiểu thêm",
        to: "/docs/getting-started/theme/design-system",
        color: "neutral",
        variant: "subtle",
        trailingIcon: "i-lucide-arrow-right",
    },
]);
</script>

<template>
    <div
        class="relative w-full min-h-screen bg-[#080d1a] overflow-hidden font-sans"
    >
        <div
            class="absolute -top-[20%] -left-[10%] w-[50%] h-[60%] bg-emerald-600/20 blur-[130px] rounded-full pointer-events-none"
        ></div>

        <div
            class="absolute -bottom-[20%] -right-[10%] w-[50%] h-[60%] bg-cyan-600/20 blur-[130px] rounded-full pointer-events-none"
        ></div>

        <div
            class="absolute inset-0 pointer-events-none opacity-[0.05]"
            style="
                background-image:
                    linear-gradient(to right, #ffffff 1px, transparent 1px),
                    linear-gradient(to bottom, #ffffff 1px, transparent 1px);
                background-size: 50px 50px;
                mask-image: radial-gradient(
                    ellipse at center,
                    black 30%,
                    transparent 70%
                );
                -webkit-mask-image: radial-gradient(
                    ellipse at center,
                    black 30%,
                    transparent 70%
                );
            "
        ></div>

        <div
            class="absolute inset-0 bg-gradient-to-b from-transparent to-[#080d1a]/80 pointer-events-none z-0"
        ></div>

        <div class="relative z-10 w-full h-full">
            <UPageHero
                description="Giải pháp tích hợp AI Vision tiên tiến, cung cấp khả năng nhận diện và phân tích hình ảnh chính xác, giúp doanh nghiệp tối ưu hóa quy trình sản xuất và nâng cao hiệu suất vận hành."
                headline="AI VISION"
                orientation="horizontal"
                :links="links"
            >
                <template #title>
                    <span class="glow-text text-white">Thị giác máy tính</span>
                </template>
                <template #default>
                    <div class=" items-center justify-center hidden md:flex">
                        <EyeFollow />
                    </div>
                </template>
            </UPageHero>
        </div>
    </div>
</template>
<style scoped>
/* Hiệu ứng Glow chữ mạnh mẽ */
.glow-text {
    text-shadow:
        0 0 20px rgba(255, 255, 255, 0.2),
        0 0 40px rgba(16, 185, 129, 0.4),
        0 0 60px rgba(16, 185, 129, 0.2);
}
</style>
