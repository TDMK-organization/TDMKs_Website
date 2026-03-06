<template>
    <div class="flex flex-col items-center justify-center gap-4 p-4">
        <UPageCard class="w-full max-w-md">
            <UAuthForm
                title="Đăng nhập"
                description="Nhập thông tin đăng nhập của bạn để truy cập tài khoản."
                icon="i-lucide-user"
                :fields="fields"
                :submit="{
                    label: 'Login',
                    cursor: 'pointer',
                }"
                @submit="onSubmit"
            />
        </UPageCard>
    </div>
</template>
<script setup>
// 1. Khai báo Middleware
definePageMeta({
    middleware: "guest",
});

// 2. Lấy hàm fetch từ nuxt-auth-utils để cập nhật session ở client
const { fetch: refreshSession } = useUserSession();

// 3. Cấu hình form fields
const fields = [
    {
        name: "email",
        label: "Email",
        type: "email",
        required: true,
    },
    {
        name: "password",
        label: "Password",
        type: "password",
        required: true,
    },
];

// 4. Hàm xử lý submit
async function onSubmit(payload) {
    try {

        // Gọi đến API Nuxt Server mà bạn đã tạo (server/api/auth/login.post.ts)
        await $fetch("/api/auth/login", {
            method: "POST",
            body: payload.data,
        });

        // QUAN TRỌNG: Cập nhật lại session ở phía client sau khi server gán thành công
        await refreshSession();
        await navigateTo("/user");
    } catch (error) {
        
        console.error("Lỗi đăng nhập:", error);
        // Hiển thị thông báo lỗi chi tiết từ server gửi về
        const msg =
            error.data?.message || "Thông tin đăng nhập không chính xác.";
        alert(msg);
    }
}
</script>
