<script setup>
const links = ref([
    {
        label: "Get started",
        to: "/docs/getting-started",
        icon: "i-lucide-square-play",
    },
    {
        label: "Learn more",
        to: "/docs/getting-started/theme/design-system",
        color: "neutral",
        variant: "subtle",
        trailingIcon: "i-lucide-arrow-right",
    },
]);
</script>

<template>
    <UPageHero
        title="Computer Vision"
        description="Giải pháp AI cho"
        headline="AI VISION"
        orientation="horizontal"
        :links="links"
    >
        <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq_FvuBt79lcHdNz-karIP-Njs88TnO7UXkw&s"
            alt="App screenshot"
            class="rounded-lg shadow-2xl ring ring-default"
        />
    </UPageHero>
</template>
