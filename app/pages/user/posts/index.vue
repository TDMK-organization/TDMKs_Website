<script setup>
const { user, clear: clearSession } = useUserSession();

definePageMeta({
    layout: "user",
    middleware: ["authenticated"],
});
</script>
<template>
    <UDashboardPanel>
        <template #header>
            <UDashboardNavbar
                :title="
                    header[currentCategory].title || 'TDMK chia sẻ kiến thức'
                "
                :toggle="{
                    color: 'primary',
                    variant: 'subtle',
                    class: 'rounded-full',
                }"
            >
                <template #leading>
                    <UDashboardSidebarCollapse variant="subtle" />
                </template>
            </UDashboardNavbar>
        </template>
        <template #body>
            <UTable :data="data" class="flex-1" />
        </template>
    </UDashboardPanel>
</template>

<script>
export default {
    props: {
        category: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            currentCategory: computed(() => this.$route.query.category),
            header: {
                forum: {
                    title: "TDMK chia sẻ kiến thức",
                    headline: "List Post Forum",
                },
                news: { title: "Tin tức", headline: "List Post News" },
            },

            data: ref([
                {
                    id: "4600",
                    date: "2024-03-11T15:30:00",
                    status: "paid",
                    email: "james.anderson@example.com",
                    amount: 594,
                },
                {
                    id: "4599",
                    date: "2024-03-11T10:10:00",
                    status: "failed",
                    email: "mia.white@example.com",
                    amount: 276,
                },
                {
                    id: "4598",
                    date: "2024-03-11T08:50:00",
                    status: "refunded",
                    email: "william.brown@example.com",
                    amount: 315,
                },
                {
                    id: "4597",
                    date: "2024-03-10T19:45:00",
                    status: "paid",
                    email: "emma.davis@example.com",
                    amount: 529,
                },
                {
                    id: "4596",
                    date: "2024-03-10T15:55:00",
                    status: "paid",
                    email: "ethan.harris@example.com",
                    amount: 639,
                },
            ]),
        };
    },
};
</script>
<style>
.bg_post {
    padding: 20px;
    width: 100%;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100%;
}
</style>
