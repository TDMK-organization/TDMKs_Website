<template lang="">
    <UPageSection
        title="HÃY ĐỂ CHÚNG TÔI ĐƠN GIẢN HÓA MỌI VẤN ĐỀ CỦA NHÀ MÁY CỦA BẠN"
        description="Với đội ngũ chuyên gia giàu kinh nghiệm và các giải pháp tiên tiến, chúng tôi cam kết mang lại hiệu quả tối ưu cho hoạt động sản xuất của bạn."
        icon="i-lucide-rocket"
        orientation="horizontal"
        :features="features"
        :links="links"
    >
        <UPageCard spotlight spotlight-color="primary">
            <UColorModeImage
                light="/TDMKLogoB.svg"
                dark="/TDMKLogoW.svg"
                width="352"
                height="647"
                alt="TDMK LOGO"
                class="w-full rounded-lg"
            />
        </UPageCard>
    </UPageSection>
</template>
<script setup>
const features = ref([
    {
        title: "Mỉm cười",
        description:
            "Sự hài lòng của khách hàng là ưu tiên hàng đầu của chúng tôi, và chúng tôi cam kết mang lại trải nghiệm dịch vụ xuất sắc.",
        icon: "i-lucide-smile",
        to: "/docs/getting-started/integrations/icons",
    },
    {
        title: "Quy trình làm việc nhanh chóng, rõ ràng",
        description:
            "Nuxt UI integrates with Nuxt Fonts to provide plug-and-play font optimization.",
        icon: "i-lucide-a-large-small",
        to: "/docs/getting-started/integrations/fonts",
    },
    {
        title: "Chất lượng đảm bảo",
        description:
            "Nuxt UI integrates with Nuxt Color Mode to switch between light and dark.",
        icon: "i-lucide-sun-moon",
        to: "/docs/getting-started/integrations/color-mode",
    },
    {
        title: "Giá cả cạnh tranh",
        description:
            "Nuxt UI integrates with Nuxt Color Mode to switch between light and dark.",
        icon: "i-lucide-sun-moon",
        to: "/docs/getting-started/integrations/color-mode",
    },
]);
</script>
<script>
export default {};
</script>
<style lang=""></style>
