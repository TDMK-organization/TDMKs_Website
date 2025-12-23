<template>
    <div class="w-full min-h-[80vh] overflow-hidden">
        <UCarousel
            v-slot="{ item }"
            loop
            arrows
            dots
            :items="items"
            :ui="{
                container: 'transition-[height]',
                controls: 'absolute -bottom-8 inset-x-12',
                dots: '-top-7',
                dot: 'w-6 h-1',
            }"
        >
            <div
                class="w-full h-[70vh] overflow-hidden"
                style="display: flex; justify-content: center"
            >
                <img
                    v-if="item.type == 'image'"
                    :src="item.link"
                    class="rounded-lg"
                />
                <component
                    v-if="item.type == 'component'"
                    :is="item.component"
                />
            </div>
        </UCarousel>
    </div>
</template>

<script setup>
import coverIndex from "./covers/coverIndex.vue";
import coverMV from "./covers/coverMV.vue";
import coverSPC from "./covers/coverSPC.vue";
const items = [
    {
        type: "component",
        component: coverIndex,
    },
    {
        type: "component",
        component: coverMV,
    },
    {
        type: "component",
        component: coverSPC,
    },
    {
        type: "image",
        link: "https://picsum.photos/1000/1020?random=1",
    },
];
</script>
<style scoped></style>
