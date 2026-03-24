<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Khởi tạo 3 biểu đồ với dữ liệu riêng biệt
const charts = ref([
  { id: 1, name: 'AI Vision Accuracy', data: [50, 40, 60], isCritical: false },
  { id: 2, name: 'IoT Sensor Latency', data: [30, 45, 35], isCritical: false },
  { id: 3, name: 'Production Yield', data: [70, 65, 75], isCritical: false }
])

const limit = 85
const isResolving = ref(false)
let timer = null

const updateData = () => {
  if (isResolving.value) return

  charts.value.forEach(chart => {
    const lastPoint = chart.data[chart.data.length - 1]
    // Tạo biến động ngẫu nhiên
    const change = Math.random() * 25 - (lastPoint > 75 ? 8 : 10)
    const nextPoint = Math.max(5, Math.min(98, lastPoint + change))
    
    chart.data.push(nextPoint)
    if (chart.data.length > 12) chart.data.shift()

    // Kiểm tra ngưỡng lỗi
    if (nextPoint > limit) {
      chart.isCritical = true
    }
  })
}

// Hàm xử lý khi nhấn nút TDMK
const handleSolve = () => {
  isResolving.value = true
  
  // Hiệu ứng đưa tất cả dữ liệu về vùng an toàn
  setTimeout(() => {
    charts.value.forEach(chart => {
      chart.data = chart.data.map(p => p > 60 ? 50 : p)
      chart.isCritical = false
    })
    isResolving.value = false
  }, 1000)
}

onMounted(() => {
  timer = setInterval(updateData, 800)
})

onUnmounted(() => {
  clearInterval(timer)
})

const getPath = (data) => {
  return data.map((p, i) => `${i * 25 + 5},${80 - (p * 0.7)}`).join(' ')
}

// Kiểm tra xem có bất kỳ biểu đồ nào đang lỗi không để hiện nút
const hasError = () => charts.value.some(c => c.isCritical)
</script>

<template>
  <div class="relative w-full max-w-[450px] p-5 bg-slate-950/80 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl overflow-hidden">
    
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
        <span class="text-[10px] font-mono text-gray-400 uppercase tracking-widest">TDMK Control Center</span>
      </div>
      <div class="text-[10px] font-mono text-gray-500">v2.0.4 - ACTIVE</div>
    </div>

    <div class="space-y-4">
      <div v-for="chart in charts" :key="chart.id" 
           class="relative p-3 rounded-xl border transition-all duration-300"
           :class="chart.isCritical ? 'bg-red-500/10 border-red-500/50' : 'bg-white/5 border-white/5'">
        
        <div class="flex justify-between items-center mb-2">
          <span class="text-[10px] font-semibold text-gray-300">{{ chart.name }}</span>
          <span :class="['text-[9px] font-mono', chart.isCritical ? 'text-red-500' : 'text-primary']">
            {{ chart.isCritical ? '⚠ OVER LIMIT' : '✓ STABLE' }}
          </span>
        </div>

        <svg viewBox="0 0 300 80" class="w-full h-16">
          <line x1="0" y1="15" x2="300" y2="15" stroke="#ef4444" stroke-dasharray="2" opacity="0.3" />
          
          <polyline
            fill="none"
            :stroke="chart.isCritical ? '#ef4444' : 'var(--ui-primary)'"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            :points="getPath(chart.data)"
            class="transition-all duration-500"
          />
        </svg>
      </div>
    </div>

    <Transition name="scale-fade">
      <div v-if="hasError()" class="absolute inset-0 z-30 flex items-center justify-center bg-slate-900/60 backdrop-blur-[2px]">
        <button 
          @click="handleSolve"
          class="group relative px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-full font-bold shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.5)] transition-all transform hover:scale-105 active:scale-95"
        >
          <div class="flex items-center gap-2">
            <span class="tracking-wider">TDMK SOLUTION</span>
            <div class="w-2 h-2 bg-white rounded-full group-hover:animate-ping"></div>
          </div>
          <div class="absolute -bottom-4 -right-4 opacity-20 pointer-events-none group-hover:scale-110 transition-transform">
             <svg width="60" height="60" viewBox="0 0 100 100" fill="white">
                <path d="M10,90 L40,50 L70,50 L90,20" stroke="white" stroke-width="5" fill="none"/>
             </svg>
          </div>
        </button>
      </div>
    </Transition>

    <div v-if="isResolving" class="absolute inset-0 z-40 flex items-center justify-center bg-primary/20 animate-pulse">
        <span class="text-white font-mono text-sm tracking-[0.5em] animate-bounce">OPTIMIZING...</span>
    </div>
  </div>
</template>

<style scoped>
.scale-fade-enter-active, .scale-fade-leave-active {
  transition: all 0.4s ease;
}
.scale-fade-enter-from, .scale-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

polyline {
  transition: all 0.8s ease-in-out;
}
</style>