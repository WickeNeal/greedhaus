<template>
  <footer ref="rootEl" class="py-12 bg-black border-t border-gray-800/50 relative overflow-hidden">
    <div ref="blob" class="accent-blob -right-48 -top-48 opacity-30"></div>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
      <p>© 2024 Greedhaus. All rights reserved. [Transmission End]</p>
      <p class="text-xs mt-2">// This is not financial advice. Investing involves significant risk. All actions are your own. Conduct your own due diligence.</p>
    </div>
  </footer>
 </template>

<script setup>
import { ref, onMounted } from 'vue'
import { useScrollReveal, useGsap } from '@/composables/useGsap'

const rootEl = ref(null)
const blob = ref(null)
const { reveal } = useScrollReveal()
const { gsap } = useGsap()

onMounted(() => {
  if (rootEl.value) {
    reveal({ root: rootEl.value, y: 20, once: true, start: 'top 95%' })
  }
  if (blob.value) {
    gsap.to(blob.value, { x: -60, y: 40, duration: 12, repeat: -1, yoyo: true, ease: 'sine.inOut' })
  }
})
</script>

<style scoped>
</style>


