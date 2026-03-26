<template>
    <div>
        <Header class="m-20" text="Đối tác của chúng tôi" />
        
        <UPageCard spotlight spotlight-color="primary" class="relative overflow-hidden py-10">
            
            <div class="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
            <div class="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>

            <div class="flex overflow-hidden">
                <div class="slider-track flex items-center">
                    
                    <div class="flex items-center gap-12 px-6">
                        <UColorModeImage
                            v-for="(item, index) in partners"
                            :key="'orig-' + index"
                            :light="item.link"
                            :dark="item.link"
                            spotlight
                            spotlight-color="primary"
                            class="flex-shrink-0 hover:scale-110 w-[150px] md:w-[200px] max-h-[80px] object-contain cursor-pointer dark:hover:brightness-100 dark:hover:invert-0 hover:grayscale-0 hover:opacity-100 grayscale dark:grayscale-0 dark:brightness-0 dark:invert opacity-40 transition-all duration-300"
                        />
                    </div>
                    
                    <div class="flex items-center gap-12 px-6">
                        <UColorModeImage
                            v-for="(item, index) in partners"
                            :key="'clone-' + index"
                            :light="item.link"
                            :dark="item.link"
                            spotlight
                            spotlight-color="primary"
                            class="flex-shrink-0 hover:scale-110 w-[150px] md:w-[200px] max-h-[80px] object-contain cursor-pointer dark:hover:brightness-100 dark:hover:invert-0 hover:grayscale-0 hover:opacity-100 grayscale dark:grayscale-0 dark:brightness-0 dark:invert opacity-40 transition-all duration-300"
                        />
                    </div>

                </div>
            </div>
        </UPageCard>
    </div>
</template>

<script>
export default {
    data() {
        return {
            partners: [
                {
                    websiteUrl: "https://seev.com.vn/",
                    link: "https://tdmk.vn/wp-content/uploads/2023/10/2560px-Sumitomo_Electric_Industries_logo.svg.png",
                },
                { link: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Panasonic_Group_logo.svg/250px-Panasonic_Group_logo.svg.png" },
                { link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwt34mMl7YY7fyNykitPvYz-FDzPSpHV1TOw&s" },
                { link: "https://tdmk.vn/wp-content/uploads/2023/10/Daikin-Logo.png" },
                { link: "https://tdmk.vn/wp-content/uploads/2023/10/2560px-Hoya_Corporation_logo.svg.png" },
                { link: "https://tdmk.vn/wp-content/uploads/2023/10/2560px-Hoya_Corporation_logo.svg.png" },
                { link: "https://tdmk.vn/wp-content/uploads/2023/10/2560px-Hoya_Corporation_logo.svg.png" },
                { link: "https://tdmk.vn/wp-content/uploads/2023/10/logo-canon.png" },
                {
                    title: "VINES",
                    link: "https://tdmk.vn/wp-content/uploads/2023/10/Logo_VinES.png",
                },
                { link: "https://tdmk.vn/wp-content/uploads/2023/10/Vinfast-logo-new_NO_Tagline-2D-Horizontal-black.png" },
            ],
        };
    },
};
</script>

<style scoped>
.slider-track {
    width: max-content;
    /* Điều chỉnh số giây (40s) để chạy nhanh hay chậm tùy ý */
    animation: scroll 40s linear infinite;
}

/* Tính năng UX cực xịn: Tạm dừng trượt khi người dùng di chuột vào logo để xem */
.slider-track:hover {
    animation-play-state: paused;
}

@keyframes scroll {
    0% {
        transform: translateX(0);
    }
    100% {
        /* Dịch chuyển chính xác 50% tổng chiều dài (tương đương đi hết Group 1) */
        transform: translateX(-50%);
    }
}
</style>