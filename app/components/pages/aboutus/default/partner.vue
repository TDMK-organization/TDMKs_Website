<template>
    <div>
        <Header class="m-20" text="Đối tác của chúng tôi" />

        <UPageCard
            spotlight
            spotlight-color="primary"
            class="relative overflow-hidden py-12 md:py-16 px-4 md:px-12"
        >
            <div
                class="relative w-full h-[150px] md:h-[200px] flex items-center justify-center group"
                @mouseenter="pauseAutoPlay"
                @mouseleave="startAutoPlay"
            >
                <div
                    class="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-40 pointer-events-none"
                ></div>
                <div
                    class="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-40 pointer-events-none"
                ></div>

                <UButton
                    icon="i-heroicons-chevron-left"
                    color="gray"
                    variant="ghost"
                    class="absolute left-0 md:left-4 z-50 w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 hover:text-white transition-colors shadow-lg"
                    @click="prev"
                />

                <div
                    class="relative w-full h-full flex items-center justify-center"
                >
                    <div
                        v-for="(item, index) in partners"
                        :key="index"
                        class="logo-wrapper absolute w-[150px] md:w-[220px] h-[70px] md:h-[100px] flex items-center justify-center cursor-pointer"
                        :style="getStyle(index)"
                        :class="getClass(index)"
                        @click="goTo(index)"
                    >
                        <UColorModeImage
                            :light="item.link"
                            :dark="item.link"
                            class="w-full h-full object-contain drop-shadow-sm"
                        />
                    </div>
                </div>

                <UButton
                    icon="i-heroicons-chevron-right"
                    color="gray"
                    variant="ghost"
                    class="absolute right-0 md:right-4 z-50 w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 hover:text-white transition-colors shadow-lg"
                    @click="next"
                />
            </div>
        </UPageCard>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const partners = ref([
    {
        link: "https://tdmk.vn/wp-content/uploads/2023/10/2560px-Sumitomo_Electric_Industries_logo.svg.png",
    },
    {
        link: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Panasonic_Group_logo.svg/250px-Panasonic_Group_logo.svg.png",
    },
    {
        link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwt34mMl7YY7fyNykitPvYz-FDzPSpHV1TOw&s",
    },
    { link: "https://tdmk.vn/wp-content/uploads/2023/10/Daikin-Logo.png" },
    {
        link: "https://tdmk.vn/wp-content/uploads/2023/10/2560px-Hoya_Corporation_logo.svg.png",
    },
    { link: "https://tdmk.vn/wp-content/uploads/2023/10/logo-canon.png" },
    { link: "https://tdmk.vn/wp-content/uploads/2023/10/Logo_VinES.png" },
    {
        link: "https://tdmk.vn/wp-content/uploads/2023/10/Vinfast-logo-new_NO_Tagline-2D-Horizontal-black.png",
    },
]);

const currentIndex = ref(0);
let autoPlayInterval = null;

// Thuật toán tính vị trí (offset) từ tâm
const getOffset = (index) => {
    const total = partners.value.length;
    let offset = (index - currentIndex.value) % total;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
};

// 1. Quản lý Tọa độ & Kích thước bằng Inline Style
const getStyle = (index) => {
    const offset = getOffset(index);
    const isCenter = offset === 0;

    // Giãn cách các logo ra xa nhau 130% để không bị lẹm
    const translateX = offset * 130;

    // Kích thước: Ở giữa bự 140%, 2 bên nhỏ lại 85%
    const scale = isCenter ? 1.4 : 0.85;

    // Chỉ ẩn đi (opacity = 0) những logo đã bị đẩy ra ngoài phạm vi 5 logo hiển thị
    const opacity = Math.abs(offset) <= 2 ? 1 : 0;

    return {
        transform: `translateX(${translateX}%) scale(${scale})`,
        opacity: opacity,
        zIndex: 30 - Math.abs(offset),
        pointerEvents: Math.abs(offset) > 1 ? "none" : "auto",
        transition: "all 0.6s cubic-bezier(0.25, 1, 0.5, 1)", // Hiệu ứng trượt êm như nhung
    };
};

// 2. Phân loại Class để CSS làm nhiệm vụ "Nhuộm màu"
const getClass = (index) => {
    const offset = getOffset(index);
    if (offset === 0) return "is-center";
    if (Math.abs(offset) <= 2) return "is-side";
    return "is-hidden";
};

// 3. Các hàm điều khiển cơ bản
const next = () =>
    (currentIndex.value = (currentIndex.value + 1) % partners.value.length);
const prev = () =>
    (currentIndex.value =
        (currentIndex.value - 1 + partners.value.length) %
        partners.value.length);
const goTo = (index) => (currentIndex.value = index);

const startAutoPlay = () => (autoPlayInterval = setInterval(next, 3000));
const pauseAutoPlay = () => {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
};

onMounted(() => startAutoPlay());
onUnmounted(() => pauseAutoPlay());
</script>

<style scoped>
/* =========================================================
   SỨC MẠNH CỦA CSS: DÙNG :deep() ĐỂ ÉP MÀU VÀO TẬN THẺ <img>
========================================================= */

/* Logo ở 2 BÊN: Xám 100%, nét căng, không bị mờ (opacity = 1) */
.logo-wrapper.is-side :deep(img) {
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
    transition: filter 0.6s ease;
}

/* Logo ở GIỮA: Giữ màu gốc rực rỡ + Hất bóng đổ màu xanh lá nhẹ nhàng */
.logo-wrapper.is-center :deep(img) {
    -webkit-filter: grayscale(0%);
    filter: grayscale(0%) drop-shadow(0px 15px 20px rgba(16, 185, 129, 0.2));
    transition: filter 0.6s ease;
}

/* =========================================================
   TỐI ƯU DARK MODE
========================================================= */
/* Khi nền web đen, logo xám sẽ bị chìm. Lệnh này ép logo xám sáng rực lên thành màu trắng */
.dark .logo-wrapper.is-side :deep(img) {
    -webkit-filter: grayscale(100%) brightness(200%);
    filter: grayscale(100%) brightness(200%);
}
</style>
