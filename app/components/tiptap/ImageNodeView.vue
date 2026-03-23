<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'

const props = defineProps(nodeViewProps)

const isZoomed = ref(false)
const isResizing = ref(false)
const startX = ref(0)
const startWidth = ref(0)

const width = ref<number>(props.node.attrs.width || 400)

function onMouseDown(e: MouseEvent) {
  e.preventDefault()
  isResizing.value = true
  startX.value = e.clientX
  startWidth.value = width.value

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

function onMouseMove(e: MouseEvent) {
  if (!isResizing.value) return
  const diff = e.clientX - startX.value
  width.value = Math.max(100, startWidth.value + diff)
}

function onMouseUp() {
  isResizing.value = false
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)

  // Save width to node attrs
  props.updateAttributes({ width: width.value })
}

function openZoom() {
  if (!isResizing.value) isZoomed.value = true
}
</script>

<template>
  <NodeViewWrapper class="inline-block relative group" :style="{ width: width + 'px' }">
    <!-- Image -->
    <img
      :src="node.attrs.src"
      :alt="node.attrs.alt"
      :style="{ width: '100%', display: 'block' }"
      class="rounded cursor-zoom-in select-none"
      draggable="false"
      @click="openZoom"
    />

    <!-- Resize handle (bottom-right) -->
    <div
      class="absolute bottom-0 right-0 w-4 h-4 bg-primary rounded-tl cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity"
      @mousedown="onMouseDown"
    />

    <!-- Selected border -->
    <div
      v-if="selected"
      class="absolute inset-0 border-2 border-primary rounded pointer-events-none"
    />

    <!-- Zoom Modal -->
    <UModal v-model:open="isZoomed" :ui="{ content: 'max-w-5xl' }">
      <template #content>
        <div class="p-2 flex items-center justify-center bg-black/90 rounded-lg">
          <img
            :src="node.attrs.src"
            :alt="node.attrs.alt"
            class="max-w-full max-h-[85vh] object-contain rounded"
          />
        </div>
      </template>
    </UModal>
  </NodeViewWrapper>
</template>
