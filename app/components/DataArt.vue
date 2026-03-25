<script setup>
import { ref, onMounted, onUnmounted, markRaw } from 'vue'

const charts = ref([
  { id: 1, name: 'Yield Rate', data: [70, 65, 75, 80, 70], isCritical: false, isResolving: false, type: 'main' },
  { id: 2, name: 'AI Vision', data: [50, 40, 60, 55, 70], isCritical: false, isResolving: false, type: 'sub' },
  { id: 3, name: 'IoT Latency', data: [30, 45, 35, 50, 40], isCritical: false, isResolving: false, type: 'sub' }
])

const limit = 85
let timer = null

const updateData = () => {
  charts.value.forEach(chart => {
    if (chart.isResolving) return
    const lastPoint = chart.data[chart.data.length - 1]
    const change = Math.random() * 25 - (lastPoint > 75 ? 12 : 10)
    const nextPoint = Math.max(5, Math.min(98, lastPoint + change))
    chart.data.push(nextPoint)
    if (chart.data.length > 20) chart.data.shift()
    if (nextPoint > limit) chart.isCritical = true
  })
}

const handleSolve = (id) => {
  const chart = charts.value.find(c => c.id === id)
  chart.isResolving = true
  setTimeout(() => {
    chart.data = chart.data.map(p => p > 60 ? 45 : p)
    chart.isCritical = false
    chart.isResolving = false
  }, 800)
}

onMounted(() => { timer = setInterval(updateData, 800) })
onUnmounted(() => { clearInterval(timer) })

const getPathMain = (data) => data.map((p, i) => `${i * 15 + 10},${100 - p * 0.8}`).join(' ')
const getPathSub = (data) => data.map((p, i) => `${p * 0.7 + 15},${i * 12 + 10}`).join(' ')
</script>

<template>
  <div class="w-[500px] h-[500px] p-5 bg-slate-950 rounded-[2.5rem] border-4 border-slate-900 shadow-2xl flex flex-col gap-4 overflow-hidden">
    
    <div class="text-center py-1">
      <h2 class="text-gray-400 text-[11px] font-black uppercase tracking-[0.5em]">Hệ thống quản trị TDMK</h2>
    </div>

    <div class="grid grid-rows-2 gap-3 flex-1">
      
      <div v-for="chart in charts.filter(c => c.type === 'main')" :key="chart.id"
           class="relative rounded-3xl border-2 transition-all duration-500 overflow-hidden flex flex-col p-4 bg-slate-950"
           :class="chart.isCritical ? 'border-red-600 shadow-[inset_0_0_20px_rgba(220,38,38,0.2)]' : 'border-slate-800'">
        
        <div class="flex justify-between items-start text-[10px] font-mono opacity-40 uppercase font-bold">
           <span>{{ chart.name }}</span>
           <span :class="chart.isCritical ? 'text-red-500 opacity-100' : ''">{{ chart.data[chart.data.length-1].toFixed(0) }}</span>
        </div>

        <svg viewBox="0 0 300 120" class="flex-1 w-full">
          <polyline fill="none" :stroke="chart.isCritical ? '#ff0000' : '#1e293b'" stroke-width="3" stroke-linecap="round" :points="getPathMain(chart.data)" />
        </svg>

        <button v-if="chart.isCritical && !chart.isResolving" 
                @click="handleSolve(chart.id)"
                class="absolute inset-0 m-auto w-24 h-10 bg-red-600 text-white font-black rounded-xl text-[11px] shadow-lg active:scale-90 transition-transform">
          REPAIR
        </button>
        <div v-if="chart.isResolving" class="absolute inset-0 bg-red-600/10 backdrop-blur-sm flex items-center justify-center animate-pulse text-white font-black text-[10px]">FIXING...</div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div v-for="chart in charts.filter(c => c.type === 'sub')" :key="chart.id"
             class="relative rounded-3xl border-2 transition-all duration-500 overflow-hidden p-4 bg-slate-950 flex flex-col"
             :class="chart.isCritical ? 'border-red-600 shadow-[inset_0_0_15px_rgba(220,38,38,0.2)]' : 'border-slate-800'">
          
          <div class="flex justify-between items-start text-[9px] font-mono opacity-40 uppercase font-bold h-full">
            <span class="rotate-90 origin-left translate-y-4">{{ chart.name }}</span>
            <span>{{ chart.data[chart.data.length-1].toFixed(0) }}%</span>
          </div>

          <svg viewBox="0 0 100 200" class="absolute inset-0 w-full h-full p-6">
            <polyline fill="none" :stroke="chart.isCritical ? '#ff0000' : '#1e293b'" stroke-width="3" stroke-linecap="round" :points="getPathSub(chart.data)" />
          </svg>

          <button v-if="chart.isCritical && !chart.isResolving" 
                  @click="handleSolve(chart.id)"
                  class="absolute inset-0 m-auto w-14 h-14 bg-red-600 text-white font-black rounded-2xl text-[10px] flex items-center justify-center rotate-90 shadow-lg active:scale-90">
            FIX
          </button>
          <div v-if="chart.isResolving" class="absolute inset-0 bg-red-600/10 backdrop-blur-sm flex items-center justify-center animate-pulse"></div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
polyline {
  filter: drop-shadow(0 0 5px rgba(255, 0, 0, 0.3));
  transition: all 0.7s ease-in-out;
}
</style>