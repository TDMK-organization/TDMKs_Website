<template>
    <ULocaleSelect
        :model-value="locale"
        :locales="Object.values(locales)"
        @update:model-value="setLocale($event)"
    />
</template>
<script setup>
const { locale, locales, setLocale } = useI18n();
</script>
<style lang=""></style>
