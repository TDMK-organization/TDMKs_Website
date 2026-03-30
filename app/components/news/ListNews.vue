<template>
    <div class="grid_page">
        <UPageGrid>
            <UPageCard
                v-for="(card, index) in cards"
                :key="index"
                v-bind="card"
            >
                <UColorModeImage
                    v-if="card.image"
                    :light="`${card.image.path}-light.svg`"
                    :dark="`${card.image.path}-dark.svg`"
                    :width="card.image.width"
                    :height="card.image.height"
                    :alt="card.title"
                    loading="lazy"
                    class="w-full"
                />
            </UPageCard>
        </UPageGrid>
        <UPagination v-model:page="page" :total="100" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            page: 5,
            cards: ref([
                {
                    title: "Theme",
                    description:
                        "Learn how to customize Nuxt UI components using Tailwind CSS v4.",
                    icon: "i-lucide-swatch-book",
                    to: "/",
                    class: "lg:col-span-2",
                    image: {
                        path: "https://ui2.nuxt.com/illustrations/color-palette",
                        width: 363,
                        height: 152,
                    },
                    orientation: "horizontal",
                },
                {
                    title: "Fonts",
                    description:
                        "Nuxt UI integrates with Nuxt Fonts to provide plug-and-play font optimization.",
                    icon: "i-lucide-a-large-small",
                    to: "/",
                    variant: "soft",
                },
                {
                    title: "Color Mode",
                    description:
                        "Nuxt UI integrates with Nuxt Color Mode to switch between light and dark.",
                    icon: "i-lucide-sun-moon",
                    to: "/",
                    variant: "soft",
                },
                {
                    title: "Icons",
                    description:
                        "Nuxt UI integrates with Nuxt Icon to access over 200,000+ icons from Iconify.",
                    icon: "i-lucide-smile",
                    to: "/",
                    image: {
                        path: "https://ui2.nuxt.com/illustrations/icon-library",
                        width: 362,
                        height: 184,
                    },
                    class: "lg:col-span-2",
                    orientation: "horizontal",
                    reverse: true,
                },
            ]),
        };
    },
};
</script>
<style scoped>
.grid_page {
    gap: 1.5rem;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
</style>
