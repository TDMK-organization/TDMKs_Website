<script setup>
import { onMounted } from "vue";

onMounted(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        },
        { threshold: 0.1 },
    ); // Hiện ra khi thấy 10% nội dung

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
});
</script>
<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
