<template>
    <div class="flex flex-col items-center justify-center gap-4 p-4">
        <UPageCard class="w-full max-w-md">
            <UAuthForm
                title="Login"
                description="Enter your credentials to access your account."
                icon="i-lucide-user"
                :fields="fields"
                @submit="onSubmit"
            />
        </UPageCard>
    </div>
</template>
<script>
export default {
    methods: {
        async onSubmit(payload) {
            try {
                console.log("Dữ liệu gửi đi:", payload.data);

                const response = await $fetch(
                    "https://api.tdmk.vn/api/auth/login",
                    {
                        method: "POST",
                        body: payload.data,
                    },
                );

                alert("Đăng nhập thành công!");
                const token = useCookie("auth_token");
                alert("Token nhận được:", response.data.token);
                token.value = response.data.token;
                console.log("Token đã lưu vào cookie:", response.data.token);
            } catch (error) {
                console.error("Lỗi đăng nhập:", error);
                alert("Thông tin đăng nhập không chính xác.");
            }
        },
    },
    data() {
        return {
            schema: {
                email: "",
                password: "",
            },
            fields: [
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
            ],
        };
    },
};
</script>
<script setup>
definePageMeta({
    middleware: "guest", // Gọi middleware đã tạo ở trên
});
</script>
<style lang=""></style>
