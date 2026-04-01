<template>
    <UDashboardSidebar
        collapsible
        resizable
        :ui="{ footer: 'border-t border-default' }"
    >
        <template #header="{ collapsed }">
            <Logo v-if="!collapsed" class="h-5 w-auto shrink-0" />
            <UIcon
                v-else
                name="i-simple-icons-nuxtdotjs"
                class="size-5 text-primary mx-auto"
            />
        </template>

        <template #default="{ collapsed }">
            <UButton
                :label="collapsed ? undefined : 'Search...'"
                icon="i-lucide-search"
                color="neutral"
                variant="outline"
                block
                :square="collapsed"
            >
                <template v-if="!collapsed" #trailing>
                    <div class="flex items-center gap-0.5 ms-auto">
                        <UKbd value="meta" variant="subtle" />
                        <UKbd value="K" variant="subtle" />
                    </div>
                </template>
            </UButton>

            <UNavigationMenu
                :collapsed="collapsed"
                :items="items[0]"
                orientation="vertical"
            />

            <UNavigationMenu
                :collapsed="collapsed"
                :items="items[1]"
                orientation="vertical"
                class="mt-auto"
            />
        </template>

        <template #footer="{ collapsed }">
            <UDropdownMenu
                :items="userItems"
                :content="{ align: 'center', collisionPadding: 12 }"
                :ui="{
                    content: 'w-(--reka-dropdown-menu-trigger-width) min-w-48',
                }"
            >
                <UButton
                    v-bind="user"
                    :label="user?.name"
                    trailing-icon="i-lucide-chevrons-up-down"
                    color="neutral"
                    variant="ghost"
                    square
                    class="w-full data-[state=open]:bg-elevated overflow-hidden"
                    :ui="{
                        trailingIcon: 'text-dimmed ms-auto',
                    }"
                />
            </UDropdownMenu>
        </template>
    </UDashboardSidebar>
</template>
<script setup>
// Sử dụng definePageMeta để xử lý chuyển hướng ngay khi vào trang

const colorMode = useColorMode();

const user = ref({
    name: "Admin",
    avatar: {
        src: "https://github.com/TDMK-organization",
        alt: "Admin",
    },
});

const userItems = computed(() => [
    [
        {
            label: "Profile",
            icon: "i-lucide-user",
        },
        {
            label: "Billing",
            icon: "i-lucide-credit-card",
        },
        {
            label: "Settings",
            icon: "i-lucide-settings",
            to: "/settings",
        },
    ],
    [
        {
            label: "Appearance",
            icon: "i-lucide-sun-moon",
            children: [
                {
                    label: "Light",
                    icon: "i-lucide-sun",
                    type: "checkbox",
                    checked: colorMode.value === "light",
                    onUpdateChecked(checked) {
                        if (checked) {
                            colorMode.preference = "light";
                        }
                    },
                    onSelect(e) {
                        e.preventDefault();
                    },
                },
                {
                    label: "Dark",
                    icon: "i-lucide-moon",
                    type: "checkbox",
                    checked: colorMode.value === "dark",
                    onUpdateChecked(checked) {
                        if (checked) {
                            colorMode.preference = "dark";
                        }
                    },
                    onSelect(e) {
                        e.preventDefault();
                    },
                },
            ],
        },
    ],
    [
        {
            label: "GitHub",
            icon: "i-simple-icons-github",
            to: "https://github.com/TDMK-organization",
            target: "_blank",
        },
        {
            label: "Log out",
            icon: "i-lucide-log-out",
            onSelect() {
                handleLogout();
            },
        },
    ],
]);

const { clear, loggedIn } = useUserSession();
const router = useRouter();

const handleLogout = async () => {
    await $fetch("/api/auth/logout", { method: "POST" });
    clear();
    await router.push("/auth");
};
</script>
<script>
export default {
    name: "DashboardSlideBar",
    data() {
        return {
            items: [
                [
                    {
                        label: "Home",
                        icon: "i-lucide-house",
                        to: {
                            path: "/user",
                        },
                    },
                    {
                        label: "Inbox",
                        icon: "i-lucide-inbox",
                        to: {
                            path: "/user/inboxs",
                        },
                    },

                    {
                        label: "Danh sách bài viết",
                        icon: "i-lucide-settings",
                        defaultOpen: true,
                        to: {
                            path: "/user/posts",
                        },
                    },
                ],
                [
                    {
                        label: "Feedback",
                        icon: "i-lucide-message-circle",
                        to: "https://github.com/nuxt-ui-templates/dashboard",
                        target: "_blank",
                    },
                    {
                        label: "Help & Support",
                        icon: "i-lucide-info",
                        to: "https://github.com/nuxt/ui",
                        target: "_blank",
                    },
                ],
            ],
        };
    },
};
</script>
