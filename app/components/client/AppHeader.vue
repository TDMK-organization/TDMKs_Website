<template>
    <UHeader>
        <template #title>
            <Logo />
        </template>

        <UNavigationMenu :items="items" />

        <template #right>
            <UColorModeButton />
            <SwitchLanguage />
        </template>
        <template #body>
            <UNavigationMenu
                :items="items"
                orientation="vertical"
                class="-mx-2.5"
            />
        </template>
    </UHeader>
</template>
<script setup>
const { t } = useI18n();
const route = useRoute();
const items = computed(() => [
    {
        title: "Home",
        to: "/",
        label: t("nav.home_page"),
    },
    {
        title: "About",
        to: "/about",
        label: t("nav.abouts_us"),
        active: route.path.startsWith("/about"),
    },
    {
        title: "Services",
        to: "/services",
        label: t("nav.service"),
        active: route.path.startsWith("/services"),
    },
    {
        title: "Products",
        to: "/products",
        label: t("nav.projects_us"),
        active: route.path.startsWith("/products"),
    },
    {
        title: "Forum",
        to: "/forum",
        label: t("nav.forum"),
        active: route.path.startsWith("/forum"),
    },
    {
        title: "Careers",
        to: "/careers",
        label: t("nav.recruitment"),
        active: route.path.startsWith("/careers"),
    },
    {
        title: "Contact",
        to: "/contact",
        label: t("nav.contact_us"),
        active: route.path.startsWith("/contact"),
    },
]);
</script>
<script>
export default {};
</script>

<style lang=""></style>
