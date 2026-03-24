<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const iris = ref(null)

const handleMouseMove = (event) => {
  if (!iris.value) return
  const rect = iris.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  
  const deltaX = (event.clientX - centerX) * 0.1
  const deltaY = (event.clientY - centerY) * 0.1

  const maxMove = 15
  const constrainedX = Math.max(-maxMove, Math.min(maxMove, deltaX))
  const constrainedY = Math.max(-maxMove, Math.min(maxMove, deltaY))

  iris.value.style.transform = `translate(${constrainedX}px, ${constrainedY}px)`
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <div class="flex items-center justify-center p-4">
    <svg 
      viewBox="0 0 200 200" 
      xmlns="http://www.w3.org/2000/svg" 
      class="w-full max-w-[320px] h-auto"
    >
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        <radialGradient id="irisGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color: var(--ui-primary); stop-opacity: 1" />
          <stop offset="100%" style="stop-color: var(--ui-primary); stop-opacity: 0.3" />
        </radialGradient>
      </defs>

      <g class="outer-ring" style="stroke: var(--ui-primary)" stroke-width="0.5" fill="none" opacity="0.3">
        <circle cx="100" cy="100" r="95" stroke-dasharray="5 15" />
        <circle cx="100" cy="100" r="88" stroke-dasharray="20 10" />
      </g>

      <g class="tech-ring" style="stroke: var(--ui-primary)" stroke-width="1.5" fill="none" filter="url(#glow)">
        <circle cx="100" cy="100" r="72" stroke-dasharray="120 40 10 30" />
        <circle cx="100" cy="100" r="68" stroke-dasharray="2 8" opacity="0.4"/>
        
        <circle cx="100" cy="28" r="2.5" style="fill: var(--ui-primary)" class="scan-point scan-1"/>
      </g>

      <g ref="iris" class="iris-group transition-transform duration-150 ease-out">
        <circle cx="100" cy="100" r="42" fill="none" style="stroke: var(--ui-primary)" stroke-width="1" opacity="0.5"/>
        
        <circle cx="100" cy="100" r="32" fill="url(#irisGradient)" filter="url(#glow)" class="pulse-iris"/>
        
        <circle cx="100" cy="100" r="10" fill="#000" style="stroke: var(--ui-primary)" stroke-width="1"/>
        
        <line x1="100" y1="75" x2="100" y2="82" style="stroke: var(--ui-primary)" stroke-width="2" opacity="0.8"/>
        <line x1="100" y1="118" x2="100" y2="125" style="stroke: var(--ui-primary)" stroke-width="2" opacity="0.8"/>
      </g>
      
      <text x="100" y="190" style="fill: var(--ui-primary)" text-anchor="middle" font-size="8" font-family="monospace" font-weight="bold" class="tracking-[0.3em] opacity-60">
        SYSTEM_ACTIVE // VISION_v2
      </text>
    </svg>
  </div>
</template>

<style scoped>
.outer-ring { transform-origin: center; animation: rotate-outer 40s linear infinite; }
.tech-ring { transform-origin: center; animation: rotate-tech 15s linear infinite; }
.pulse-iris { animation: pulse-iris 4s ease-in-out infinite; }
.scan-point { animation: scan-point 2s ease-in-out infinite; }

@keyframes rotate-outer { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes rotate-tech { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
@keyframes pulse-iris { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.05); opacity: 1; } }
@keyframes scan-point { 0%, 100% { opacity: 0.2; } 50% { opacity: 1; } }

.iris-group { transform-origin: center; }
</style>