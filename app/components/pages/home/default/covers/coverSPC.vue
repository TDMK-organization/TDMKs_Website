<script setup>
import { ref, onMounted, onUnmounted } from "vue";
const links = ref([
    {
        label: "Get started",
        to: "/docs/getting-started",
        icon: "i-lucide-square-play",
        color: "primary", // Hoặc "emerald" nếu bạn cấu hình màu primary là xanh lá
    },
    {
        label: "Learn more",
        to: "/docs/getting-started/theme/design-system",
        color: "neutral",
        variant: "subtle",
        trailingIcon: "i-lucide-arrow-right",
    },
]);

// Danh sách các từ khóa trending bạn muốn hiển thị
const keywords = ["Big data", "Smart Factory", "SPC Control", "Automation"];

const currentIndex = ref(0);
let timer = null;

onMounted(() => {
    timer = setInterval(() => {
        // Tăng index, nếu đến cuối danh sách thì quay lại 0
        currentIndex.value = (currentIndex.value + 1) % keywords.length;
    }, 3000);
});

onUnmounted(() => {
    // Xóa timer khi component bị hủy để tránh rò rỉ bộ nhớ
    if (timer) clearInterval(timer);
});
</script>

<template>
    <div class="relative w-full bg-[#0b1120] overflow-hidden">
        <div
            class="absolute top-0 -left-[10%] w-[500px] h-[500px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none z-0"
        ></div>
        <div
            class="absolute bottom-1/4 -right-[10%] w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none z-0"
        ></div>

        <UPageHero
            class="relative z-10"
            description="Nền tảng tiên phong cho lộ trình chuyển đổi số nhà máy 4.0. Tự động hóa việc giám sát, phân tích dữ liệu và quản trị chất lượng theo thời gian thực với độ chính xác và tin cậy cao nhất."
            headline="Bigdata/SPC"
            orientation="horizontal"
            :links="links"
        >
            <template #title>
                <div
                    class="flex flex-col items-start text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mt-2"
                >
                    <span class="text-white pb-1"> Hệ thống Quản Trị </span>

                    <div class="relative w-full h-[1.2em] overflow-visible">
                        <Transition name="fade-slide">
                            <span
                                :key="keywords[currentIndex]"
                                class="absolute top-0 left-0 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 drop-shadow-[0_0_20px_rgba(52,211,153,0.4)] whitespace-nowrap pb-2"
                            >
                                {{ keywords[currentIndex] }}
                            </span>
                        </Transition>
                    </div>
                </div>
            </template>

            <template #default>
                <div
                    class="transform transition-transform duration-700 hover:scale-[1.02] hidden md:flex"
                >
                    <DataArt />
                </div>
            </template>
        </UPageHero>
    </div>
</template>
<style scoped>
/* Hiệu ứng trượt chữ chồng lên nhau mượt mà */
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
    transform: translateY(50%); /* Trượt từ dưới lên */
    opacity: 0;
    filter: blur(4px);
}

.fade-slide-leave-to {
    transform: translateY(-50%); /* Trượt lên trên và biến mất */
    opacity: 0;
    filter: blur(4px);
}

/* Đảm bảo Gradient không bị lỗi trên các trình duyệt */
.bg-clip-text {
    -webkit-background-clip: text;
    background-clip: text;
    display: inline-block;
}
</style>