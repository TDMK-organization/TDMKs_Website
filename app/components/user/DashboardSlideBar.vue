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
            <UButton
                :avatar="{
                    src: 'https://github.com/benjamincanac.png',
                }"
                :label="collapsed ? undefined : 'Benjamin'"
                color="neutral"
                variant="ghost"
                class="w-full"
                :block="collapsed"
            />
        </template>
    </UDashboardSidebar>
</template>

<script setup></script>

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
                        active: true,
                        to: {
                            path: "/user",
                        },
                    },
                    {
                        label: "Inbox",
                        icon: "i-lucide-inbox",
                        badge: "4",
                    },
                    {
                        label: "Contacts",
                        icon: "i-lucide-users",
                    },
                    {
                        label: "Danh sách bài viết",
                        icon: "i-lucide-settings",
                        defaultOpen: true,
                        children: [
                            {
                                label: "New post",
                                to: {
                                    path: "/user/posts/create",
                                },
                            },
                            {
                                label: "Forum",
                                to: {
                                    path: "/user/posts",
                                    query: { category: "forum" },
                                },
                            },
                            {
                                label: "News",
                                to: {
                                    path: "/user/posts",
                                    query: { category: "news" },
                                },
                            },
                        ],
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
