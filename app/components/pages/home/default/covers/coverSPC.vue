<script setup>
import { ref, onMounted, onUnmounted } from "vue";
const links = ref([
    {
        label: "Get started",
        to: "/docs/getting-started",
        icon: "i-lucide-square-play",
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
    <UPageHero
        description="Nền tảng tiên phong cho lộ trình chuyển đổi số nhà máy 4.0. Tự động hóa việc giám sát, phân tích dữ liệu và quản trị chất lượng theo thời gian thực với độ chính xác và tin cậy cao nhất."
        headline="Bigdata/SPC "
        orientation="horizontal"
        :links="links"
    >
        <template #title>
            <div
                class="flex flex-col items-start gap-y-1 text-4xl md:text-6xl font-bold tracking-tight"
            >
                <span class="text-white"> Hệ thống Quản Trị </span>

                <div class="relative overflow-hidden leading-normal">
                    <Transition name="fade-slide" mode="out-in">
                        <span
                            :key="keywords[currentIndex]"
                            class="inline-block py-1 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
                        >
                            {{ keywords[currentIndex] }}
                        </span>
                    </Transition>
                </div>
            </div>
        </template>
        <template #default>
            <DataArt />
        </template>
    </UPageHero>
</template>
<style scoped>
/* Hiệu ứng mượt mà */
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
    transform: translateY(30px);
    opacity: 0;
}

.fade-slide-leave-to {
    transform: translateY(-30px);
    opacity: 0;
}

/* Đảm bảo Gradient không bị lỗi trên các trình duyệt */
.bg-clip-text {
    -webkit-background-clip: text;
    background-clip: text;
    display: inline-block; /* Quan trọng để không bị cụt */
}
</style>
