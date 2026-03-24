<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import coverIndex from "./covers/coverIndex.vue";
import coverMV from "./covers/coverMV.vue";
import coverSPC from "./covers/coverSPC.vue";

// 1. Khai báo Ref để truy cập vào component Carousel
const carouselRef = ref(null)
const progress = ref(0) // Dùng để làm thanh loading nếu muốn
let timer = null
const INTERVAL_TIME = 13000 // 13 giây

const items = [
    { type: "component", component: coverIndex },
    { type: "component", component: coverMV },
    { type: "component", component: coverSPC },
];

// 2. Hàm xử lý chuyển slide tự động
const startAutoplay = () => {
    timer = setInterval(() => {
        if (carouselRef.value) {
            // Gọi hàm next() có sẵn của UCarousel
            carouselRef.value.next()
            // Reset lại progress mỗi lần chuyển slide
            progress.value = 0 
        }
    }, INTERVAL_TIME)
}

onMounted(() => {
    startAutoplay()
})

onUnmounted(() => {
    // Quan trọng: Xóa timer khi chuyển trang để tránh lỗi RAM
    if (timer) clearInterval(timer)
})
</script>

<template>
    <div class="w-full min-h-[100vh] overflow-hidden bg-slate-950">
        <UCarousel
            ref="carouselRef"
            v-slot="{ item }"
            loop
            arrows
            dots
            :items="items"
            :ui="{
                container: 'transition-[height]',
                controls: 'absolute -bottom-8 inset-x-12',
                dots: '-top-7',
                dot: 'w-6 h-1 transition-all duration-300',
            }"
            class="relative"
        >
            <div
                class="w-full h-[70vh] overflow-hidden flex justify-center items-center"
            >
                <img
                    v-if="item.type == 'image'"
                    :src="item.link"
                    class="rounded-lg object-cover"
                />
                <component
                    v-if="item.type == 'component'"
                    :is="item.component"
                />
            </div>

            <div class="absolute bottom-0 left-0 h-1 bg-primary/30 w-full z-10">
                <div 
                    class="h-full bg-primary transition-all linear"
                    :style="{ 
                        width: '100%', 
                        transitionDuration: '5000ms',
                        animation: 'progress-animation 13s linear infinite'
                    }"
                ></div>
            </div>
        </UCarousel>
    </div>
</template>

<style scoped>
@keyframes progress-animation {
    from { width: 0%; }
    to { width: 100%; }
}

/* Đảm bảo carousel không bị nhảy layout khi chuyển slide */
:deep(.relative) {
    display: flex;
    align-items: center;
}
</style>