<template>
    <div>
        <UPageCard spotlight spotlight-color="primary" class="p-10">
            <div class="flex bg-form">
                <div style="width: 40%;"  class="picture">
                    <UColorModeImage
                        light="https://picsum.photos/id/29/400"
                        dark="https://picsum.photos/id/46/400"
                     style="width: 100%;"
                    />
                </div>
                <div style="width: 60%; margin: 40px;"" class="form">
                    <Header text="Để lại thông tin liên hệ" />

                    <UForm
                        :schema="schema"
                        :state="state"
                        class="mt-10 space-y-2"
                        @submit="onSubmit"
                    >
                        <div class="flex space-x-4">
                            <UFormField
                                orientation="vertical"
                                label="Tên của bạn"
                                class="w-full"
                            >
                                <UInput
                                    placeholder="Nhập tên của bạn"
                                    class="w-full"
                                />
                            </UFormField>
                        </div>
                        <div class="flex space-x-4">
                            <UFormField
                                orientation="vertical"
                                label="Email"
                                class="w-72"
                                required="Bạn cần nhập email của bạn"
                            >
                                <UInput
                                    placeholder="Nhập email của bạn"
                                    class="w-full"
                                />
                            </UFormField>
                            <UFormField
                                orientation="vertical"
                                label="Số điện thoại"
                                class="w-72"
                                required="Bạn cần nhập số điện thoại của bạn"
                            >
                                <UInput
                                    v-model="phone"
                                    type="tel"
                                    placeholder="Số điện thoại của bạn"
                                    icon="i-heroicons-phone"
                                    class="w-full"
                                />
                            </UFormField>
                        </div>
                        <UFormField orientation="vertical" label="Nội dung">
                            <UTextarea
                                placeholder="Nội dung vấn đề của bạn"
                                class="w-full"
                                :ui="{ base: 'h-30' }"
                            />
                        </UFormField>

                        <UButton type="submit" class=""> Gửi </UButton>
                    </UForm>
                </div>
            </div>
        </UPageCard>
    </div>
</template>
<script setup></script>
<script>
export default {
    data() {
        return {
            items: [
                { title: "Địa chỉ" },
                { title: "Số điện thoại" },
                { title: "Email" },
            ],
        };
    },
};
</script>
<style scoped>
.bg-form > div {
    width: 100%;
    margin-top: 40px;
}

.bg-form-2 {
    display: none;
    width: 50%;
    height: 100%;
    position: absolute;
    background-color: #f5f5f5;
}
</style>
