<template>
    <div 
        class="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
        style="background-image: url('https://vcdn1-dulich.vnecdn.net/2022/03/31/mapilenghagiangvnexpress-16487-2310-5584-1648718524.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=kOOQrA2oCmdoblPaNEpo1A');"
    >
        <div class="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/80 z-0"></div>

        <div class="relative z-10 w-11/12 max-w-4xl p-8 sm:p-12 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] text-center transform transition-all hover:scale-[1.01] duration-500">
            
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-6 border border-emerald-500/30">
                <UIcon name="i-heroicons-map-pin" class="w-4 h-4" />
                Sự kiện Team Building
            </div>

            <h1 class="text-2xl sm:text-6xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-emerald-400 drop-shadow-lg mb-4 tracking-tight">
                HÀ GIANG ĐANG GỌI...
            </h1>
            
            <p class="text-lg sm:text-xl text-slate-300 font-medium mb-12 max-w-xl mx-auto">
                Cùng TDMK chinh phục cực Bắc - Nơi những cung đường đèo vắt ngang mây trời và đồi núi điệp trùng đang chờ đón.
            </p>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
                <div class="flex flex-col items-center justify-center p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-inner group hover:bg-emerald-900/40 transition-colors">
                    <span class="text-5xl sm:text-7xl font-bold font-mono text-white tabular-nums tracking-tighter drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                        {{ formatNumber(days) }}
                    </span>
                    <span class="text-xs sm:text-sm uppercase tracking-[0.2em] mt-3 text-emerald-400 font-semibold">Ngày</span>
                </div>

                <div class="flex flex-col items-center justify-center p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-inner group hover:bg-emerald-900/40 transition-colors">
                    <span class="text-5xl sm:text-7xl font-bold font-mono text-white tabular-nums tracking-tighter drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                        {{ formatNumber(hours) }}
                    </span>
                    <span class="text-xs sm:text-sm uppercase tracking-[0.2em] mt-3 text-emerald-400 font-semibold">Giờ</span>
                </div>

                <div class="flex flex-col items-center justify-center p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-inner group hover:bg-emerald-900/40 transition-colors">
                    <span class="text-5xl sm:text-7xl font-bold font-mono text-white tabular-nums tracking-tighter drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                        {{ formatNumber(minutes) }}
                    </span>
                    <span class="text-xs sm:text-sm uppercase tracking-[0.2em] mt-3 text-emerald-400 font-semibold">Phút</span>
                </div>

                <div class="flex flex-col items-center justify-center p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-inner group hover:bg-emerald-900/40 transition-colors">
                    <span class="text-5xl sm:text-7xl font-bold font-mono text-white tabular-nums tracking-tighter drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-pulse">
                        {{ formatNumber(seconds) }}
                    </span>
                    <span class="text-xs sm:text-sm uppercase tracking-[0.2em] mt-3 text-emerald-400 font-semibold">Giây</span>
                </div>
            </div>

            <div class="mt-12">
                <UButton 
                to="https://www.google.com/maps/dir/s%E1%BB%91+10+%C4%90.+Tr%E1%BA%A7n+Ph%C3%BA,+P.+M%E1%BB%99+Lao,+H%C3%A0+%C4%90%C3%B4ng,+H%C3%A0+N%E1%BB%99i,+Vi%E1%BB%87t+Nam/H%C3%A0+Giang+c%E1%BB%99t+m%E1%BB%91c+s%E1%BB%91+0,+39%2F6+An+C%C6%B0,+T%E1%BB%95+D%C3%A2n+Ph%E1%BB%91+S%E1%BB%91+6,+H%C3%A0+Giang,+Vi%E1%BB%87t+Nam/C%E1%BB%95ng+Tr%E1%BB%9Di+Qu%E1%BA%A3n+B%E1%BA%A1,+QL4C,+Qu%E1%BA%A3n+B%E1%BA%A1,+H%C3%A0+Giang,+Vi%E1%BB%87t+Nam/tt.+M%C3%A8o+V%E1%BA%A1c,+M%C3%A8o+V%E1%BA%A1c,+H%C3%A0+Giang,+Vi%E1%BB%87t+Nam/%C4%90i%E1%BB%83m+b%C3%A1n+v%C3%A9+du+l%E1%BB%8Bch+s%C3%B4ng+Nho+Qu%E1%BA%BF,+Th%C3%B4n+T%C3%ACa+Cua+Si,+Gi%C3%A0ng+Ch%C3%BA+Ph%C3%ACn,+M%C3%A8o+V%E1%BA%A1c,+H%C3%A0+Giang,+Vi%E1%BB%87t+Nam/Nh%C3%A0+H%C3%A0ng+CND+-+L%E1%BA%A9u+g%C3%A0+%C4%91en+-+L%E1%BA%A9u+th%E1%BA%AFng+c%E1%BB%91+-+L%E1%BA%A9u+c%C3%A1+t%E1%BA%A7m+-+Th%E1%BA%AFng+c%E1%BB%91+Ng%E1%BB%B1a,+S%E1%BB%91+380+%C4%91%C6%B0%E1%BB%9Dng+3%2F2+t%E1%BB%95+1+th%E1%BB%8B+tr%E1%BA%A5n+%C4%90%E1%BB%93ng+V%C4%83n+-+Huy%E1%BB%87n+%C4%90%E1%BB%93ng+V%C4%83n,+H%C3%A0+Giang,+02193,+Vi%E1%BB%87t+Nam/%C4%90i%E1%BB%83m+c%E1%BB%B1c+B%E1%BA%AFc+cu%CC%89a+Vi%C3%AA%CC%A3t+Nam,+L%C5%A9ng+C%C3%BA,+%C4%90%E1%BB%93ng+V%C4%83n,+H%C3%A0+Giang,+Vi%E1%BB%87t+Nam/Phim+tr%C6%B0%E1%BB%9Dng+%22Chuy%E1%BB%87n+c%E1%BB%A7a+Pao%22,+66G2%2BVX8,+L%C5%A9ng+C%E1%BA%A9m,+S%E1%BB%A7ng+L%C3%A0,+%C4%90%E1%BB%93ng+V%C4%83n,+H%C3%A0+Giang,+Vi%E1%BB%87t+Nam/@23.189955,105.1953918,13.84z/data=!4m55!4m54!1m5!1m1!1s0x3135accf2e89d531:0x79a6a4e049e4116d!2m2!1d105.7914218!2d20.9836593!1m5!1m1!1s0x36cc7924a35684b7:0xe447e169aee981b6!2m2!1d104.9841875!2d22.8274375!1m5!1m1!1s0x36cc0ad0bf6c067b:0x67d865ad9b9da91d!2m2!1d104.9926772!2d23.0492816!1m10!1m1!1s0x36cbe81fbd0477f3:0xb8b865a695ad5a84!2m2!1d105.4126652!2d23.1556005!3m4!1m2!1d105.4143113!2d23.1543241!3s0x36cbc2991a08c88d:0x4d70db499df494a2!1m5!1m1!1s0x36cbddd4b1c2bc3f:0xe8509eebbd05a4dd!2m2!1d105.4430207!2d23.2223255!1m5!1m1!1s0x36cbe71fde0b8781:0x104e359d7d0b8323!2m2!1d105.3502367!2d23.2780886!1m5!1m1!1s0x36c95f4fc69802e3:0xa2930ab3e99ea3c2!2m2!1d105.3225666!2d23.3831747!1m5!1m1!1s0x36cbfab8e1e833b9:0x73cf3ebc55d28597!2m2!1d105.2037596!2d23.2258006!3e0?entry=tts&g_ep=EgoyMDI2MDMxNy4wKgBIAVAD&skid=5bf7d8c0-68c0-43db-b1d6-a00c88166555"
                    v-if="!isFinished"
                    size="xl" 
                    color="white" 
                    variant="solid" 
                    icon="i-heroicons-calendar-days"
                    class=" text-amber-50 rounded-full px-8 font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform"
                >
                    Xem lịch trình chi tiết
                </UButton>
                
                <div v-else class="text-3xl font-bold text-emerald-400 animate-bounce">
                    🎉 XÁCH BALO LÊN VÀ ĐI THÔI! 🎉
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// 1. Cấu hình ngày đi (YYYY-MM-DDTHH:mm:ss)
// Bạn sửa lại đúng ngày team TDMK khởi hành nhé
const targetDate = new Date('2026-04-04T06:00:00').getTime() 

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
const isFinished = ref(false)
let timer = null

// 2. Hàm tính toán thời gian
const calculateTimeLeft = () => {
    const now = new Date().getTime()
    const distance = targetDate - now

    if (distance <= 0) {
        clearInterval(timer)
        days.value = 0
        hours.value = 0
        minutes.value = 0
        seconds.value = 0
        isFinished.value = true
        return
    }

    days.value = Math.floor(distance / (1000 * 60 * 60 * 24))
    hours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    seconds.value = Math.floor((distance % (1000 * 60)) / 1000)
}

// Hàm thêm số 0 ở trước nếu số < 10 (VD: 9 -> 09)
const formatNumber = (num) => {
    return num < 10 ? `0${num}` : num
}

// 3. Khởi chạy và dọn dẹp interval
onMounted(() => {
    calculateTimeLeft() // Gọi ngay 1 lần để không bị trễ 1 giây đầu tiên
    timer = setInterval(calculateTimeLeft, 1000)
})

onBeforeUnmount(() => {
    if (timer) clearInterval(timer)
})

useSeoMeta({
    title: 'Đếm ngược chuyến đi Hà Giang | TDMK',
    description: 'Cùng TDMK chuẩn bị cho hành trình chinh phục cực Bắc hùng vĩ.'
})
</script>

<style scoped>
/* Tabular nums giúp các con số có độ rộng bằng nhau, khi nhảy giây không bị giật/lệch layout */
.tabular-nums {
    font-variant-numeric: tabular-nums;
}
</style>