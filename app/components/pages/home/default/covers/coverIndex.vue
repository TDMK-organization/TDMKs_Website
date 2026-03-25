<script setup>
const links = ref([
    {
        label: "Bắt đầu lên ý tưởng cho vấn đề của bạn",
        to: "/about",
        icon: "i-lucide-square-play",
    },
    {
        label: "Tìm hiểu chúng tôi",
        to: "/about",
        color: "neutral",
        variant: "subtle",
        trailingIcon: "i-lucide-arrow-right",
    },
]);
</script>

<template>
    <UPageHero class="bg-tech-grid" title="TDMK SERVICES" :links="links">
        <div>
            <div
                class="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-cyan-600/20 blur-[120px] -z-10 rounded-full"
            ></div>

            <div
                class="absolute bottom-[-10%] right-[-10%] w-[30%] h-[40%] bg-emerald-600/20 blur-[120px] -z-10 rounded-full"
            ></div>
            
        </div>
        <template #title>
            <span>TDMK</span>
            <span
                class="bg-gradient-to-r from-emerald-500 via-emerald-400 to-cyan-500 bg-clip-text text-transparent glow-text"
            >
                SERVICES
            </span>
        </template>
        <template #description>
            Cung cấp giải pháp chuyển đổi số toàn diện cho nhà máy thông minh
            thông qua hệ thống AI Vision, IoT và tự động hóa hiện đại.<br />
            Chúng tôi đồng hành cùng doanh nghiệp tối ưu hóa quy trình vận hành
            và nâng cao năng suất sản xuất bằng công nghệ đột phá.
        </template>
    </UPageHero>
</template>
<style scoped>
.glow-text {
    /* Hiệu ứng Glow lóe sáng mạnh */
    /* text-shadow: [x-offset] [y-offset] [blur-radius] [color] */
    text-shadow:
        0 0 10px rgba(16, 185, 129, 0.4),
        /* Glow mờ màu xanh emerald đậm */ 0 0 25px rgba(16, 185, 129, 0.2),
        /* Glow tỏa xa hơn, nhạt hơn */ 0 0 40px rgba(6, 182, 212, 0.15); /* Glow màu xanh cyan ở viền ngoài cùng */

    /* Đôi khi một chút làm mờ nhẹ toàn bộ chữ giúp hiệu ứng lóe sáng "mượt" hơn */
    filter: blur(0.3px);
}

/* Thêm hiệu ứng nhấp nháy lóe sáng nhẹ (Tùy chọn) */
@keyframes glow-pulse {
    0% {
        text-shadow: 0 0 15px rgba(16, 185, 129, 0.3);
    }
    50% {
        text-shadow: 0 0 30px rgba(16, 185, 129, 0.5);
    }
    100% {
        text-shadow: 0 0 15px rgba(16, 185, 129, 0.3);
    }
}

.glow-text {
    animation: glow-pulse 4s infinite ease-in-out;
}
.bg-tech-grid {
    background-image:
        linear-gradient(
            to right,
            rgba(255, 255, 255, 0.03) 1px,
            transparent 1px
        ),
        linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.03) 1px,
            transparent 1px
        );
    background-size: 40px 40px; /* Kích thước ô lưới */
}
</style>
