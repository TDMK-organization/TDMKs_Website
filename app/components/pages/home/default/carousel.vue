<template>
    <div class="w-full min-h-[100vh] overflow-hidden">
        <UCarousel
            v-slot="{ item }"
            loop
            arrows
            dots
            :slides-to-scroll="1"
            :loop="true"
            :autoplay="{
                delay: 13000, // 13 giây mỗi slide
                stopOnInteraction: false, // tiếp tục chạy sau khi user kéo
                stopOnMouseEnter: true, // dừng khi hover
            }"
            :items="items"
            :ui="{
                container: 'transition-[height]',
                // 1. controls: 'inset-y-0' căn giữa dọc, 'inset-x-4' đẩy vào trong slide
                // 'pointer-events-none' để vùng trống không chặn click, nhưng nút vẫn bấm được
                controls:
                    'absolute inset-y-0 inset-x-20 z-10 hidden md:flex items-center justify-between pointer-events-none',
                // 2. Cho phép click vào nút
                prev: 'pointer-events-auto shadow-sm',
                next: 'pointer-events-auto shadow-sm', // 2. indicators: căn giữa dải dots ở đáy slide
                indicators: {
                    wrapper:
                        'absolute bottom-20 inset-x-0 flex justify-center gap-2 z-20',
                },

                // 3. dot: hình dáng thanh ngang như bạn muốn
                dot: 'w-6 h-1 rounded-full transition-all duration-300 pointer-events-auto',
            }"
        >
            <div
                class="w-full h-[90vh] overflow-hidden"
                style="display: flex; justify-content: center"
            >
                <img
                    v-if="item.type == 'image'"
                    :src="item.link"
                    class="rounded-lg"
                />
                <component
                    v-if="item.type == 'component'"
                    :is="item.component"
                />
            </div>
        </UCarousel>
    </div>
</template>

<script setup>
import coverIndex from "./covers/coverIndex.vue";
import coverMV from "./covers/coverMV.vue";
import coverSPC from "./covers/coverSPC.vue";
const items = [
    {
        type: "component",
        component: coverIndex,
    },
    {
        type: "component",
        component: coverMV,
    },
    {
        type: "component",
        component: coverSPC,
    },
];
</script>
<style scoped></style>
