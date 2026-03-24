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
    <UPageHero title="TDMK SERVICES" :links="links">
        <template #description>
            Cung cấp giải pháp chuyển đổi số toàn diện cho nhà máy thông minh
            thông qua hệ thống AI Vision, IoT và tự động hóa hiện đại.<br />
            Chúng tôi đồng hành cùng doanh nghiệp tối ưu hóa quy trình vận hành
            và nâng cao năng suất sản xuất bằng công nghệ đột phá.
        </template>
    </UPageHero>
</template>
