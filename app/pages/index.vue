<template>
    <div class="bg-main">
        <p>Index</p>
        <p>{{ t("nav.home_page") }}</p>
    </div>
</template>
<script setup>
const { t, locales, setLocale } = useI18n();
</script>
<style scoped>
.bg-main {
    height: 200vh;
}
</style>
