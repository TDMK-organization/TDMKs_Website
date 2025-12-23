<template>
    <div
        class="text-primary text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-center"
    >
        {{ text }}
    </div>
</template>
<script>
export default {
    props: { text: String, type: String },
};
</script>
<style scoped></style>
