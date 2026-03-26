<template>
  <div class="relative min-h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden flex items-center justify-center">
    
    <div class="absolute inset-0 z-0">
      <div v-for="n in 20" :key="n" 
           class="particle absolute rounded-full bg-emerald-500/20"
           :style="generateParticleStyle(n)">
      </div>
    </div>

    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/10 blur-[120px] rounded-full"></div>

    <div class="relative z-10 max-w-2xl px-6 text-center">
      
      <div class="mb-8 inline-block">
        <div class="relative">
          <UIcon name="i-heroicons-cog-8-tooth" class="w-20 h-20 text-emerald-500 animate-spin-slow" />
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
          </div>
        </div>
      </div>

      <h1 class="text-5xl md:text-7xl font-black tracking-tighter mb-4 italic uppercase">
        To Be <br/>
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Continued</span>
      </h1>

      <p class="text-slate-400 font-mono text-sm md:text-base mb-12 tracking-widest uppercase opacity-80">
        // Hệ thống đang được tối ưu hóa <br/>
        // Giải pháp Smart Factory thế hệ mới sắp ra mắt
      </p>

      <div class="max-w-md mx-auto mb-12">
        <div class="flex justify-between mb-2 font-mono text-xs text-emerald-500/70">
          <span>INITIALIZING SYSTEM...</span>
          <span>{{ progress }}%</span>
        </div>
        <div class="h-1.5 w-full bg-slate-900 rounded-full border border-slate-800 overflow-hidden">
          <div class="h-full bg-emerald-500 transition-all duration-500 shadow-[0_0_15px_#10b981]" :style="{ width: progress + '%' }"></div>
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-4 justify-center items-center">
        <UButton 
          to="/" 
          size="xl" 
          variant="ghost" 
          icon="i-heroicons-arrow-left" 
          class="text-slate-400 hover:text-emerald-400"
        >
          Quay lại trang chủ
        </UButton>
        
        <UButton 
          to="/contact" 
          size="xl" 
          class="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
        >
          Liên hệ trước
        </UButton>
      </div>

    </div>

    <div class="absolute bottom-10 left-0 w-full text-center">
      <p class="text-[10px] font-mono text-slate-600 tracking-[0.3em] uppercase">
        © 2026 TDMK Automation - Advanced Solutions
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const progress = ref(0)

// Giả lập tiến trình nạp dữ liệu
onMounted(() => {
  const interval = setInterval(() => {
    if (progress.value < 88) {
      progress.value += Math.floor(Math.random() * 5) + 1
    } else {
      clearInterval(interval)
    }
  }, 800)
})

// Tạo style ngẫu nhiên cho các hạt bay lơ lửng
const generateParticleStyle = (n) => {
  const size = Math.random() * 4 + 2 + 'px'
  const left = Math.random() * 100 + '%'
  const top = Math.random() * 100 + '%'
  const duration = Math.random() * 20 + 10 + 's'
  const delay = Math.random() * 5 + 's'
  
  return {
    width: size,
    height: size,
    left,
    top,
    animation: `float ${duration} linear infinite`,
    animationDelay: delay
  }
}
</script>

<style scoped>
.animate-spin-slow {
  animation: spin 10s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes float {
  0% { transform: translateY(0) translateX(0); opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translateY(-100vh) translateX(20vw); opacity: 0; }
}

.particle {
  pointer-events: none;
}
</style>