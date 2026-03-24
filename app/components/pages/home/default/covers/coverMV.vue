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
    <UPageHero
        title="Thị giác máy tính"
        description="Giải pháp tích hợp AI Vision tiên tiến, cung cấp khả năng nhận diện và phân tích hình ảnh chính xác, giúp doanh nghiệp tối ưu hóa quy trình sản xuất và nâng cao hiệu suất vận hành."
        headline="AI VISION"
        orientation="horizontal"
        :links="links"
    >
        <template #default>
            <div class="hidden lg:flex items-center justify-center">
                <EyeFollow />
            </div>
        </template>
    </UPageHero>
</template>
