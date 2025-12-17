<template>
    <div class="logo">
        <div class="text-primary tdmk">TDMK</div>
        <div class="text">
            s
            <div class="last-text">ervices</div>
        </div>
    </div>
</template>
<script setup>
useSeoMeta({
    ogImage: "/public/TDMKLogo.svg",
});
</script>
<script>
export default {};
</script>
<style scoped>
.logo {
    display: flex;
    font-size: 1.5rem;
}
.logo .tdmk {
    font-weight: 1000 !important;
    height: 1.5rem;
}
.logo:hover .tdmk {
    /* Các thuộc tính CSS bạn muốn áp dụng */
    margin-right: 0.5rem;
    transition: margin-right 0.3s ease-out 1s;
}
.last-text {
    display: none;
}

.logo:hover .last-text {
    display: flex;
    text-align: left;
    overflow: hidden; /* Ensures the content is not revealed until the animation */
    border-right: 0.15em solid orange; /* The typwriter cursor */
    margin: 0 auto; /* Gives that scrolling effect as the typing happens */
    animation: typing 1s steps(8, end), blink-caret 0.75s step-end infinite;
}

/* The typing effect */
@keyframes typing {
    from {
        width: 0;
    }
    to {
        width: 100%;
    }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
    from,
    to {
        border-color: transparent;
    }
    50% {
        border-color: white;
    }
}
.text {
    display: flex;
    font-weight: 500 !important;
}
</style>
