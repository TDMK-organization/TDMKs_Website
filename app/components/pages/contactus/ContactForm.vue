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

                        <UFormField orientation="vertical" label="Nội dung yêu cầu">
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
                                class="w-full md:w-auto px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all flex justify-center"
                            > 
                                Gửi thông tin
                                <template #trailing>
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
import { reactive } from 'vue'

// 1. Gộp tất cả data vào một object state duy nhất để UForm dễ quản lý
const state = reactive({
    name: '',
    email: '',
    phone: '',
    message: ''
})

// 2. Hàm xử lý khi bấm nút Gửi
const onSubmit = async (event) => {
    // Ngăn load lại trang (UForm tự động làm việc này nhưng khai báo cho chắc)
    event.preventDefault()
    
    
    // Ở đây bạn có thể gọi API gửi email, ví dụ: $fetch('/api/send-email', { method: 'POST', body: state })
    
    alert('Cảm ơn bạn! Thông tin đã được gửi đến TDMK.')
    
    // Reset form sau khi gửi
    state.name = ''
    state.email = ''
    state.phone = ''
    state.message = ''
}
</script>

<style scoped>
/* Không cần dùng CSS tay nữa vì Tailwind đã lo hết phần layout (flex, grid, w-full, v.v.) */
</style>