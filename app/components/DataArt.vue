<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const charts = ref([
  // Main: 20 điểm dữ liệu cho biểu đồ đường
  { id: 1, name: 'Yield Rate (Năng suất)', data: Array(20).fill(60), isCritical: false, isResolving: false, type: 'main' },
  // Sub: 15 điểm dữ liệu cho biểu đồ cột
  { id: 2, name: 'AI Vision Load', data: Array(15).fill(50), isCritical: false, isResolving: false, type: 'sub' },
  { id: 3, name: 'IoT Latency', data: Array(15).fill(40), isCritical: false, isResolving: false, type: 'sub' }
])

const limit = 85
let timer = null

const updateData = () => {
  charts.value.forEach(chart => {
    if (chart.isResolving) return
    const lastPoint = chart.data[chart.data.length - 1]
    
    // Tạo độ nhiễu ngẫu nhiên
    const change = Math.random() * 25 - (lastPoint > 75 ? 15 : 10)
    const nextPoint = Math.max(10, Math.min(98, lastPoint + change))
    
    chart.data.push(nextPoint)
    chart.data.shift()
    
    if (nextPoint > limit) chart.isCritical = true
  })
}

const handleSolve = (id) => {
  const chart = charts.value.find(c => c.id === id)
  chart.isResolving = true
  
  setTimeout(() => {
    // Reset dữ liệu về mức an toàn
    chart.data = chart.data.map(() => Math.random() * 20 + 30)
    chart.isCritical = false
    chart.isResolving = false
  }, 1000)
}

onMounted(() => { timer = setInterval(updateData, 800) })
onUnmounted(() => { clearInterval(timer) })

// Hàm vẽ đường SVG (Cho Chart Main)
// ViewBox width = 300, height = 100. Có 20 điểm dữ liệu -> khoảng cách X là ~15.7
const getPathMain = (data) => {
  return data.map((val, i) => `${i * 15.7},${100 - val * 0.9}`).join(' ')
}
</script>

<template>
  <div class="w-[500px] h-100 p-5 bg-slate-950 rounded-[2.5rem] border-4 border-slate-900 shadow-2xl flex flex-col gap-4 overflow-hidden relative font-sans">
    
    <div class="text-center py-1 z-10">
      <h2 class="text-slate-500 text-[11px] font-black uppercase tracking-[0.4em]">TDMK Monitor System</h2>
    </div>

    <div class="grid grid-rows-2 gap-3 flex-1 z-10">
      
      <div v-for="chart in charts.filter(c => c.type === 'main')" :key="chart.id"
           class="relative rounded-3xl border-2 transition-all duration-500 overflow-hidden flex flex-col p-5 bg-slate-900/50"
           :class="chart.isCritical ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]' : 'border-slate-800'">
        
        <div class="flex justify-between items-start text-xs font-mono uppercase font-bold mb-2">
           <span class="text-slate-400">{{ chart.name }}</span>
           <span :class="chart.isCritical ? 'text-red-500 animate-pulse' : 'text-emerald-400'">
             {{ chart.data[chart.data.length-1].toFixed(0) }}%
           </span>
        </div>

        <div class="flex-1 w-full relative">
          <svg viewBox="0 0 300 100" class="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <polyline 
              fill="none" 
              :stroke="chart.isCritical ? '#ef4444' : '#10b981'" 
              stroke-width="3" 
              stroke-linecap="round" 
              stroke-linejoin="round"
              :points="getPathMain(chart.data)" 
              class="chart-line"
            />
          </svg>
        </div>

        <button v-if="chart.isCritical && !chart.isResolving" 
                @click="handleSolve(chart.id)"
                class="absolute inset-0 m-auto w-36 h-12 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl text-xs shadow-[0_0_20px_rgba(239,68,68,0.5)] active:scale-95 transition-all z-20 flex items-center justify-center gap-2">
          ⚡ REPAIR
        </button>
        <div v-if="chart.isResolving" class="absolute inset-0 bg-yellow-500/10 backdrop-blur-sm flex items-center justify-center text-yellow-500 font-black tracking-widest text-sm z-20">
          FIXING...
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div v-for="chart in charts.filter(c => c.type === 'sub')" :key="chart.id"
             class="relative rounded-3xl border-2 transition-all duration-500 overflow-hidden p-4 bg-slate-900/50 flex flex-col"
             :class="chart.isCritical ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'border-slate-800'">
          
          <div class="flex justify-between items-center text-[10px] font-mono uppercase font-bold mb-3">
            <span class="text-slate-400 truncate">{{ chart.name }}</span>
            <span :class="chart.isCritical ? 'text-red-500' : 'text-cyan-400'">{{ chart.data[chart.data.length-1].toFixed(0) }}</span>
          </div>

          <div class="flex-1 flex items-end justify-between gap-[2px] w-full h-full relative z-10">
            <div v-for="(val, idx) in chart.data" :key="idx"
                 class="w-full rounded-t-[1px] transition-all duration-300"
                 :class="[
                   chart.isCritical ? 'bg-red-500/80 shadow-[0_0_5px_red]' : 'bg-cyan-500/80',
                   chart.isResolving ? 'bg-yellow-500' : ''
                 ]"
                 :style="{ height: val + '%' }">
            </div>
          </div>

          <button v-if="chart.isCritical && !chart.isResolving" 
                  @click="handleSolve(chart.id)"
                  class="absolute inset-0 m-auto w-20 h-10 bg-red-600 hover:bg-red-500 text-white font-black rounded-lg text-[10px] shadow-[0_0_15px_rgba(239,68,68,0.5)] active:scale-95 transition-all z-20">
            FIX
          </button>
          <div v-if="chart.isResolving" class="absolute inset-0 bg-yellow-500/10 backdrop-blur-sm flex items-center justify-center text-yellow-500 font-black text-[10px] z-20">
            FIXING...
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Tạo hiệu ứng phát sáng (Glow) cho đường Line Chart */
.chart-line {
  filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.5));
  transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Đổi màu phát sáng thành Đỏ khi bị quá tải */
.border-red-500 .chart-line {
  filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.8));
}
</style>