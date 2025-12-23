<template>
    <Header class="m-20" text="Đối tác của chúng tôi" />
    <UPageCard spotlight spotlight-color="primary">
        <div class="flex flex-wrap w-full justify-center items-center">
            <UColorModeImage
                v-for="(item, index) in partners"
                :key="index"
                :light="item.link"
                :dark="item.link"
                spotlight
                spotlight-color="primary"
                class="hover:scale-110 m-5 w-full max-h-[100px] max-w-[200px] h-auto object-contain cursor-pointer dark:hover:brightness-100 dark:hover:invert-0 hover:grayscale-0 hover:opacity-100 grayscale dark:grayscale-0 dark:brightness-0 dark:invert opacity-40 transition-all"
            />
        </div>
    </UPageCard>
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
                {
                    link: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Panasonic_Group_logo.svg/250px-Panasonic_Group_logo.svg.png",
                },
                {
                    link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwt34mMl7YY7fyNykitPvYz-FDzPSpHV1TOw&s",
                },
                {
                    link: "https://tdmk.vn/wp-content/uploads/2023/10/Daikin-Logo.png",
                },
                {
                    link: "https://tdmk.vn/wp-content/uploads/2023/10/2560px-Hoya_Corporation_logo.svg.png",
                },
                {
                    link: "https://tdmk.vn/wp-content/uploads/2023/10/2560px-Hoya_Corporation_logo.svg.png",
                },
                {
                    link: "https://tdmk.vn/wp-content/uploads/2023/10/2560px-Hoya_Corporation_logo.svg.png",
                },
                {
                    link: "https://tdmk.vn/wp-content/uploads/2023/10/logo-canon.png",
                },
                {
                    title: "VINES",
                    link: "https://tdmk.vn/wp-content/uploads/2023/10/Logo_VinES.png",
                },
                {
                    link: "https://tdmk.vn/wp-content/uploads/2023/10/Vinfast-logo-new_NO_Tagline-2D-Horizontal-black.png",
                },
            ],
        };
    },
};
</script>
<style scoped></style>
