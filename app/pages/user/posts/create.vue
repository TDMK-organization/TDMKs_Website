<script setup>
// Sử dụng definePageMeta để xử lý chuyển hướng ngay khi vào trang
definePageMeta({
    layout: "user",
    middleware: ["authenticated", "post-creation-guard"],
});
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div class="text-center">
      <UIcon name="i-lucide-loader-2" class="animate-spin text-4xl mb-2" />
      <p>Đang khởi tạo bài viết mới...</p>
    </div>  
  </div>
</template>