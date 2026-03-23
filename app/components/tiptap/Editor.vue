<script setup lang="ts">
import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { ImageResizeExtension } from './ImageResizeExtension'

const value = ref('')

async function uploadImages(files: File[]): Promise<string[]> {
  const formData = new FormData()
  files.forEach((file) => formData.append('files', file))
  const res = await $fetch<{ data: { url: string }[] }>('/api/uploads/multiple', {
    method: 'POST',
    body: formData
  })
  return res.data.map((f) => f.url)
}

const ImageUploadExtension = Extension.create({
  name: 'imageUpload',
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('imageUpload'),
        props: {
          handleDrop(view, event) {
            const files = Array.from(event.dataTransfer?.files ?? []).filter(
              (f) => f.type.startsWith('image/')
            )
            if (!files.length) return false

            event.preventDefault()
            const { schema } = view.state
            const imageNode = schema.nodes['image']
            if (!imageNode) return false

            const coordinates = view.posAtCoords({
              left: event.clientX,
              top: event.clientY
            })

            uploadImages(files).then((urls) => {
              urls.forEach((url) => {
                const node = imageNode.create({ src: url, width: 400 })
                const transaction = view.state.tr.insert(coordinates?.pos ?? 0, node)
                view.dispatch(transaction)
              })
            })

            return true
          },
          handlePaste(view, event) {
            const files = Array.from(event.clipboardData?.files ?? []).filter(
              (f) => f.type.startsWith('image/')
            )
            if (!files.length) return false

            event.preventDefault()
            const { schema } = view.state
            const imageNode = schema.nodes['image']
            if (!imageNode) return false

            uploadImages(files).then((urls) => {
              urls.forEach((url) => {
                const node = imageNode.create({ src: url, width: 400 })
                const transaction = view.state.tr.replaceSelectionWith(node)
                view.dispatch(transaction)
              })
            })

            return true
          }
        }
      })
    ]
  }
})

const customHandlers = {
  imageUpload: {
    canExecute: () => true,
    execute: (editor: any) => {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.multiple = true
      input.onchange = async () => {
        const files = Array.from(input.files ?? [])
        if (!files.length) return
        const urls = await uploadImages(files)
        urls.forEach((url) => {
          ;(editor.chain().focus() as any).setImage({ src: url, width: 400 }).run()
        })
      }
      input.click()
      return editor.chain()
    },
    isActive: () => false
  }
}

const toolbarItems = [
  { kind: 'mark', mark: 'bold', icon: 'i-lucide-bold' },
  { kind: 'mark', mark: 'italic', icon: 'i-lucide-italic' },
  { kind: 'heading', level: 1, icon: 'i-lucide-heading-1' },
  { kind: 'heading', level: 2, icon: 'i-lucide-heading-2' },
  { kind: 'bulletList', icon: 'i-lucide-list' },
  { kind: 'orderedList', icon: 'i-lucide-list-ordered' },
  { kind: 'link', icon: 'i-lucide-link' },
  { kind: 'imageUpload', icon: 'i-lucide-image-plus' }
]
</script>

<template>
  <UEditor
    v-slot="{ editor }"
    v-model="value"
    class="w-full min-h-64"
    :image="false"
    :extensions="([ImageResizeExtension, ImageUploadExtension] as any)"
    :handlers="(customHandlers as any)"
  >
    <UEditorToolbar :editor="editor" :items="(toolbarItems as any)" />
  </UEditor>
</template>
