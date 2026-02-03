<template>
    <PagesContactusIntro />
    <PagesContactusGgmapplugin />
    <LayoutPageLayout class="bg_layout">
        <PagesContactusContactForm class="mt-30" />
        <div class="text-2xl font-bold mb-2 text-center mt-30">Hoặc</div>
        <Header text="Hãy liên hệ cho chúng tôi" />
        <div class="bg-card mt-30">
            <UPageCard
                v-for="value in items"
                :title="value.title"
                class="w-80"
                description="Tòa nhà Machinco, 10 Trần Phú, Hà Đông, Hà Nội"
                icon="i-simple-icons-tailwindcss"
                to="https://tailwindcss.com/docs/v4-beta"
                target="_blank"
            />
        </div>
    </LayoutPageLayout>
    
</template>
<script setup>
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
<script>
export default {
    data() {
        return {
            items: [
                { title: "Địa chỉ" },
                { title: "Số điện thoại" },
                { title: "Email" },
            ],
        };
    },
};
</script>
<style scoped>
.bg-card {
    display: flex;
    align-items: center;
    justify-content: center;
}
.bg-card > div {
    margin: 20px;
}
</style>
