<template>
  <section ref="rootEl" class="min-h-screen flex items-center section-gradient relative overflow-hidden">
    <div ref="blob" class="accent-blob -left-40 top-10 opacity-50"></div>
    <div class="seam-top"></div>
    <div class="seam-bottom"></div>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="js-reveal text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">What’s the Next <span class="text-[var(--accent-color)]">Signal?</span></h2>
      <p class="js-reveal mt-3 sm:mt-4 text-lg sm:text-xl text-gray-300">Our current high-conviction idea is <span class="font-bold text-white">ZETA</span>.</p>
      <p class="js-reveal mt-2 text-base sm:text-lg text-gray-500">// Strong fundamentals. Massive asymmetry. Still under the radar.</p>
      <a href="#" class="js-reveal mt-6 sm:mt-8 inline-block cta-button-gradient text-white font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-none text-base sm:text-lg tracking-widest">&gt; Get the Free ZETA Report</a>
    </div>
  </section>
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
    reveal({ root: rootEl.value, targets: '.js-reveal', start: 'top 80%', y: 22 })
  }
  if (blob.value) {
    gsap.to(blob.value, { x: 110, y: 40, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut' })
  }
})
</script>

<style scoped>
</style>


