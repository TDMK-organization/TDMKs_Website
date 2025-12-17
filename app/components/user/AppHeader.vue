<template>
    <UDashboardNavbar
        title="Dashboard"
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
<script>
export default {};
</script>
<style lang=""></style>
