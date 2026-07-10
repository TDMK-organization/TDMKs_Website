<template>
    <UFooter>
        <template #top>
            <div
                class="w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-4 lg:flex lg:items-center lg:justify-between lg:gap-x-3"
            >
                <div class="space-y-4 mb-4">
                    <h3
                        class="text-sm font-bold uppercase tracking-wider text-primary"
                    >
                        Thông tin công ty
                    </h3>
                    <ul
                        class="space-y-3 text-sm text-neutral-600 dark:text-neutral-400"
                    >
                        <li class="flex gap-2">
                            <UIcon
                                name="i-lucide-map-pin"
                                class="w-5 h-5 flex-shrink-0 text-primary"
                            />
                            <span
                                >Địa chỉ: TT20-35, KĐTM Văn Phú, Hà Đông, Hà
                                Nội.</span
                            >
                        </li>
                        <li class="flex gap-2">
                            <UIcon
                                name="i-lucide-building"
                                class="w-5 h-5 flex-shrink-0 text-primary"
                            />
                            <span
                                >Văn phòng: Tầng 3, Tòa nhà Machinco, 10 Trần
                                Phú, Hà Đông.</span
                            >
                        </li>
                        <li class="flex gap-2">
                            <UIcon
                                name="i-lucide-hash"
                                class="w-5 h-5 flex-shrink-0 text-primary"
                            />
                            <span>MST: 0107422131</span>
                        </li>
                        <li class="flex gap-2">
                            <UIcon
                                name="i-lucide-phone"
                                class="w-5 h-5 flex-shrink-0 text-primary"
                            />
                            <span>Hotline: 043225 2988 | 097 775 3665</span>
                        </li>
                    </ul>
                </div>

                <div class="space-y-4 mb-4">
                    <h3
                        class="text-sm font-bold uppercase tracking-wider text-primary"
                    >
                        Về chúng tôi
                    </h3>
                    <ul class="space-y-2 text-sm">
                        <li v-for="link in aboutLinks" :key="link.label">
                            <ULink
                                :to="link.to"
                                class="hover:text-primary flex items-center gap-1"
                            >
                                <UIcon
                                    name="i-lucide-chevron-right"
                                    class="w-3 h-3"
                                />
                                {{ link.label }}
                            </ULink>
                        </li>
                    </ul>
                </div>

                <div class="space-y-4 mb-4">
                    <h3
                        class="text-sm font-bold uppercase tracking-wider text-primary"
                    >
                        Dịch vụ khách hàng
                    </h3>
                    <ul class="space-y-2 text-sm">
                        <li v-for="link in serviceLinks" :key="link.label">
                            <ULink
                                :to="link.to"
                                class="hover:text-primary flex items-center gap-1"
                            >
                                <UIcon
                                    name="i-lucide-chevron-right"
                                    class="w-3 h-3"
                                />
                                {{ link.label }}
                            </ULink>
                        </li>
                    </ul>
                </div>

                <div class="space-y-4 mb-4">
                    <h3
                        class="text-sm font-bold uppercase tracking-wider text-primary"
                    >
                        Google Map
                    </h3>
                    <div
                        class="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 h-48 w-full shadow-inner"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.234497278942!2d105.79111429999999!3d20.9832352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad0034b680d5%3A0xbb51e6c4d0539b85!2sC%C3%94NG%20TY%20TNHH%20TDMK!5e0!3m2!1svi!2s!4v1774941237844!5m2!1svi!2s"
                            width="100%"
                            height="100%"
                            style="border: 0"
                            allowfullscreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </div>
        </template>
        <template #left>
            <p class="text-muted text-sm">
                Copyright © {{ new Date().getFullYear() }}
            </p>
        </template>

        <template #right>
            <UButton
                to="https://zalo.me/0879889000"
                color="neutral"
                variant="ghost"
            >
                <img
                    src="https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Zalo.png"
                    style="height: 20px"
                />
            </UButton>
            <UButton to="https://tdmk.vn/" color="neutral" variant="ghost">
                <img src="/TDMKLogo.svg" style="height: 20px" />
            </UButton>
            <UButton
                icon="i-simple-icons-github"
                color="neutral"
                variant="ghost"
                to="https://github.com/TDMK-organization"
                target="_blank"
                aria-label="GitHub"
            />
        </template>
    </UFooter>
</template>
<script>
export default {
    data() {
        return {
            serviceLinks: [
                {
                    label: "Chính sách thanh toán",
                    to: "https://tdmk.vn/thanh-toan-2/",
                },
                {
                    label: "Quy định vận chuyển",
                    to: "https://tdmk.vn/thanh-toan-2/",
                },
                {
                    label: "Chính sách bảo mật",
                    to: "https://tdmk.vn/privacy-policy/",
                },
                {
                    label: "Chính sách bảo hành",
                    to: "https://tdmk.vn/bao-tri/",
                },
            ],
            aboutLinks: [
                { label: "Giới thiệu", to: "/about" },
                { label: "Sản phẩm", to: "/products" },
                { label: "Chia sẻ kiến thức", to: "/forum" },
                { label: "Liên hệ", to: "/contact" },
            ],
            items: [
                {
                    label: "tdmk.vn",
                    to: "https://tdmk.vn/",
                    target: "_blank",
                },
                {
                    label: "Playground",
                    to: "https://stackblitz.com/edit/nuxt-ui",
                    target: "_blank",
                },
                {
                    label: "Releases",
                    to: "https://github.com/nuxt/ui/releases",
                    target: "_blank",
                },
            ],
        };
    },
};
</script>
<style lang=""></style>
