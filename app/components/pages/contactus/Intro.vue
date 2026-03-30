<template>
    <div class="relative overflow-hidden">
        <div
            class="absolute top-1/2 right-0 -translate-y-1/2 bg-[rgb(var(--ui-primary)/0.15)] blur-[120px] rounded-full pointer-events-none z-0"
        ></div>

        <UPageSection
            icon="i-lucide-rocket"
            orientation="horizontal"
            :features="features"
            class="relative z-10"
            :ui="{
                title: 'text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight',
                description: 'text-lg text-slate-400 mt-6 leading-relaxed',
            }"
        >
            <template #title>
                Hãy để chúng tôi <br />
                <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 drop-shadow-sm"
                >
                    Đơn Giản Hóa
                </span>
                <br />
                mọi vấn đề của nhà máy
            </template>

            <template #description>
                Với đội ngũ chuyên gia giàu kinh nghiệm và các giải pháp tiên
                tiến, chúng tôi cam kết mang lại hiệu quả tối ưu cho hoạt động
                sản xuất của bạn.
            </template>

            <div class="relative group mt-10 lg:mt-0">
                <div
                    class="absolute -inset-1 bg-gradient-to-r from-primary-500 to-emerald-500 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"
                ></div>

                <UPageCard
                    spotlight
                    spotlight-color="primary"
                    class="relative bg-slate-900/80 border-slate-800 backdrop-blur-sm rounded-[2rem] overflow-hidden"
                >
                    <div
                        class="flex items-center justify-center p-8 md:p-12 animate-float"
                    >
                        <UColorModeImage
                            light="/TDMKLogoB.svg"
                            dark="/TDMKLogoW.svg"
                            alt="TDMK LOGO"
                            class="max-w-[350px] drop-shadow-[0_0_30px_rgba(var(--ui-primary),0.3)] transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                </UPageCard>
            </div>
        </UPageSection>
    </div>
</template>

<script setup>
import { ref } from "vue";

const features = ref([
    {
        title: "Dịch vụ tận tâm", // Đổi 'Mỉm cười' thành text chuyên nghiệp hơn
        description:
            "Sự hài lòng của khách hàng là ưu tiên hàng đầu. Chúng tôi cam kết mang lại trải nghiệm dịch vụ xuất sắc nhất.",
        icon: "i-lucide-smile",
    },
    {
        title: "Quy trình nhanh chóng, rõ ràng",
        description:
            "Triển khai thần tốc, báo cáo minh bạch từng giai đoạn giúp doanh nghiệp dễ dàng nắm bắt tiến độ.",
        icon: "i-lucide-zap", // Đổi icon sang tia chớp hợp lý hơn
    },
    {
        title: "Chất lượng đảm bảo",
        description:
            "Hệ thống vận hành ổn định 24/7, được kiểm thử khắt khe trước khi bàn giao cho nhà máy.",
        icon: "i-lucide-shield-check", // Đổi icon sang cái khiên bảo vệ
    },
    {
        title: "Chi phí tối ưu", // Đổi 'Giá cả cạnh tranh'
        description:
            "Mang lại giá trị vượt trội so với mức đầu tư, cam kết không phát sinh chi phí ẩn.",
        icon: "i-lucide-badge-dollar-sign", // Icon chi phí
    },
]);
</script>

<style scoped>
/* Hiệu ứng lơ lửng cho Logo TDMK */
.animate-float {
    animation: float 6s ease-in-out infinite;
}

@keyframes float {
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-15px);
    }
    100% {
        transform: translateY(0px);
    }
}
</style>
