<template>
    <UFooter>
        <template #left>
            <p class="text-muted text-sm">
                Copyright © {{ new Date().getFullYear() }}
            </p>
        </template>

        <UNavigationMenu :items="items" variant="link" />

        <template #right>
            <UButton color="neutral" variant="ghost">
                <img
                    src="https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Zalo.png"
                    style="height: 20px"
                />
            </UButton>
            <UButton color="neutral" variant="ghost">
                <img src="/TDMKLogo.svg" style="height: 20px" />
            </UButton>
            <UButton
                icon="i-simple-icons-github"
                color="neutral"
                variant="ghost"
                to="https://github.com/nuxt/nuxt"
                target="_blank"
                aria-label="GitHub"
            />
        </template>
    </UFooter>
</template>
<script>
export default {};
</script>
<style lang=""></style>
