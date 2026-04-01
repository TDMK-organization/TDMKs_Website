<template>
    <div class="py-10">
        <UPageCard spotlight spotlight-color="primary" class="relative overflow-hidden border-slate-800 bg-slate-900/50 backdrop-blur-xl">
            
            <div class="absolute top-0 left-0 w-[300px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
            
            <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 p-6 lg:p-10 z-10 relative">
                
                <div class="w-full lg:w-2/5">
                    <div class="relative w-full h-full min-h-[250px] rounded-2xl overflow-hidden group shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10"></div>
                        
                        <UColorModeImage
                            light="https://picsum.photos/id/29/600/800"
                            dark="https://picsum.photos/id/46/600/800"
                            class="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        <div class="absolute bottom-6 left-6 z-20">
                            <h3 class="text-white font-bold text-xl drop-shadow-md">TDMK Support</h3>
                            <p class="text-emerald-400 text-sm font-mono mt-1">24/7 Technical Assistance</p>
                        </div>
                    </div>
                </div>

                <div class="w-full lg:w-3/5 flex flex-col justify-center">
                    
                    <Header text="Để lại thông tin liên hệ" class="mb-6" />

                    <UForm
                        :state="state"
                        class="space-y-5"
                        @submit="onSubmit"
                    >
                        <UFormField orientation="vertical" label="Tên của bạn" required>
                            <UInput
                                v-model="state.name"
                                placeholder="Ví dụ: Nguyễn Văn A"
                                icon="i-heroicons-user"
                                size="lg"
                                class="w-full"
                            />
                        </UFormField>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <UFormField orientation="vertical" label="Email" required>
                                <UInput
                                    v-model="state.email"
                                    type="email"
                                    placeholder="email@congty.com"
                                    icon="i-heroicons-envelope"
                                    size="lg"
                                    class="w-full"
                                />
                            </UFormField>

                            <UFormField orientation="vertical" label="Số điện thoại" required>
                                <UInput
                                    v-model="state.phone"
                                    type="tel"
                                    placeholder="0912 345 678"
                                    icon="i-heroicons-phone"
                                    size="lg"
                                    class="w-full"
                                />
                            </UFormField>
                        </div>

                        <UFormField orientation="vertical" label="Nội dung yêu cầu" required>
                            <UTextarea
                                v-model="state.message"
                                placeholder="Mô tả chi tiết vấn đề hoặc nhu cầu tư vấn của bạn..."
                                :rows="4"
                                size="lg"
                                class="w-full"
                            />
                        </UFormField>

                        <div class="pt-2">
                            <UButton 
                                type="submit" 
                                size="lg"
                                :loading="isLoading"
                                class="w-full md:w-auto px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all flex justify-center"
                            > 
                                {{ isLoading ? 'Đang gửi...' : 'Gửi thông tin' }}
                                <template #trailing v-if="!isLoading">
                                    <UIcon name="i-heroicons-paper-airplane" class="w-5 h-5 ml-2" />
                                </template>
                            </UButton>
                        </div>
                    </UForm>
                </div>
            </div>
        </UPageCard>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

// 1. Khởi tạo chức năng thông báo của Nuxt UI
const toast = useToast() 
const isLoading = ref(false)

// 2. State quản lý Form
const state = reactive({
    name: '',
    email: '',
    phone: '',
    message: ''
})

// 3. Hàm xử lý gửi Form
const onSubmit = async () => {
    // Validate cơ bản nếu người dùng cố tình lách required của HTML
    if (!state.name || !state.email || !state.phone || !state.message) {
        toast.add({
            title: 'Thiếu thông tin',
            description: 'Vui lòng điền đầy đủ các trường bắt buộc.',
            color: 'red',
            icon: 'i-heroicons-exclamation-circle'
        })
        return;
    }

    // Map dữ liệu chuẩn với API Body của TDMK
    const payload = {
        fullname: state.name,
        email: state.email,
        phone: state.phone,
        content: state.message
    }

    isLoading.value = true

    try {
        // Gửi data lên server Nuxt (file server/api/reports/index.post.ts)
        await $fetch('/api/report', { 
            method: 'POST', 
            body: payload 
        })
        
        // Hiện thông báo thành công xanh lá cây góc màn hình
        toast.add({
            title: 'Thành công!',
            description: 'Cảm ơn bạn. Yêu cầu đã được gửi đến bộ phận CSKH của TDMK.',
            color: 'green',
            icon: 'i-heroicons-check-circle'
        })
        
        // Xóa sạch form sau khi gửi
        state.name = ''
        state.email = ''
        state.phone = ''
        state.message = ''
        
    } catch (error) {
        console.error("Lỗi khi gửi form:", error)
        // Hiện thông báo lỗi màu đỏ góc màn hình
        toast.add({
            title: 'Có lỗi xảy ra',
            description: 'Không thể gửi thông tin lúc này. Vui lòng thử lại sau.',
            color: 'red',
            icon: 'i-heroicons-x-circle'
        })
    } finally {
        isLoading.value = false
    }
}
</script>