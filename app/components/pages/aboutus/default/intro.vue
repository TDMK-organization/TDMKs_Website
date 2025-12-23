<template>
    <UPageSection
        class="min-h-screen"
        title="CÔNG TY TNHH THƯƠNG MẠI VÀ DỊCH VỤ TDMK"
        description="Được thành lập vào năm 2016 bởi đội ngũ kỹ sư nhiều năm kinh nghiệm trong nhiều lĩnh vực, trọng tâm chính của TDMK là cung cấp thiết bị chất lượng cao nhất và dịch vụ chất lượng cao dành cho khách hàng."
        icon="i-lucide-rocket"
        :features="features"
    >
        
    </UPageSection>
</template>
<script setup>
const features = ref([
    {
        title: "Thiết bị đo lường",
        description:
            "Một trong những công ty đi đầu trong lĩnh vực cung cấp thiết bị và giải pháp trong lĩnh vực đo lường tại Việt Nam.",
        icon: "material-symbols:assistant-device",
        to: "/docs/getting-started/integrations/icons",
    },
    {
        title: "Phần mềm và giải pháp",
        description:
            "Cung cấp các giải pháp & phần mềm cho nhà máy thông minh. Tối ưu hóa quy trình sản xuất với các phương pháp tiên tiến nhất.",
        icon: "streamline-sharp:store-factory-solid",
        to: "/docs/getting-started/integrations/fonts",
    },
    {
        title: "Sửa chữa và bảo trì",
        description:
            "Nuxt UI integrates with Nuxt Color Mode to switch between light and dark.",
        icon: "material-symbols:settings-heart-rounded",
        to: "/docs/getting-started/integrations/color-mode",
    },
]);
const links = ref([
    {
        label: "Explore components",
        to: "/docs/components/app",
        color: "neutral",
        variant: "subtle",
        trailingIcon: "i-lucide-arrow-right",
    },
]);
</script>
