<template>
  <div class="h-20 lg:h-26">
    <header 
      :class="[
        'hidden lg:block fixed left-1/2 -translate-x-1/2 z-[100] w-full max-w-7xl mx-auto transition-all duration-500 ease-in-out',
        isScrolled 
          ? 'top-2 scale-[0.98] py-2 shadow-2xl bg-white/90 dark:bg-neutral-950/90 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-800/50 rounded-2xl' 
          : 'top-6 scale-100 py-4 bg-white/60 dark:bg-neutral-900/40 backdrop-blur-md border border-neutral-200/20 dark:border-neutral-800/20 rounded-full'
      ]"
    >
      <div class="flex items-center justify-between px-6">
        <div class="flex-shrink-0">
          <Logo />
        </div>

        <nav class="flex items-center justify-center flex-1 px-8">
          <UNavigationMenu
            :items="items"
            orientation="horizontal"
            :ui="{ link: 'text-sm font-semibold px-3' }"
          />
        </nav>

        <div class="flex items-center gap-x-4">
          <UButton
            :label="t('nav.contact_us')"
            to="/contact"
            color="primary"
            class="rounded-full px-6 py-2 font-bold shadow-lg shadow-primary-500/20"
          />
          <div class="flex items-center gap-x-1 bg-neutral-100/50 dark:bg-neutral-800/50 p-1 rounded-full border border-neutral-200/50 dark:border-neutral-700/50">
            <UColorModeButton />
            <SwitchLanguage />
          </div>
        </div>
      </div>
    </header>

    <UHeader 
      class="lg:hidden fixed top-0 left-0 right-0 z-[100] border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md"
    >
      <template #title>
        <Logo mobile />
      </template>

      <template #right>
        <UHeaderMobileButton />
      </template>

      <template #body>
        <div class="p-6">
          <UNavigationMenu
            :items="items"
            orientation="vertical"
            :ui="{ link: 'text-lg font-medium py-3' }"
          />
          <div class="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
             <UButton :label="t('nav.contact_us')" to="/contact" block size="xl" class="rounded-2xl" />
          </div>
        </div>
      </template>
    </UHeader>
  </div>
</template>

<script setup>
const { t } = useI18n();
const route = useRoute();
const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 30;
};

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));

const items = computed(() => [
  { label: t("nav.home_page"), to: "/", icon: "i-lucide-home" },
  { label: t("nav.abouts_us"), to: "/about" },
  { label: t("nav.service"), to: "/services" },
  { label: t("nav.projects_us"), to: "/products" },
  { label: t("nav.forum"), to: "/forum" },
  { label: t("nav.recruitment"), to: "/careers" }
]);
</script>