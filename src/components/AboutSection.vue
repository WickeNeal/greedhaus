<template>
  <section id="about" ref="rootEl" class="min-h-screen flex items-center section-gradient relative overflow-hidden">
    <div ref="blob" class="accent-blob -left-48 top-16 opacity-40"></div>
    <div class="seam-top"></div>
    <div class="seam-bottom"></div>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="js-reveal">
          <h2 class="text-4xl font-bold tracking-tighter mb-6 uppercase">About Greedhaus</h2>
          <div class="space-y-4 text-gray-300">
            <p>// Greedhaus was founded on the principle that elite-level insights should not be gatekept. We provide institutional-grade research to individual investors, without the noise and misdirection of mainstream finance.</p>
            <p>// Our methodology focuses on identifying companies with robust fundamentals, exponential growth potential, and market mispricing. Every signal is the result of exhaustive fundamental analysis, macro-thematic investigation, and strategic foresight.</p>
            <p>// We don't sell narratives. We provide actionable intelligence for serious investors.</p>
          </div>
        </div>
        <div class="js-reveal border border-[var(--accent-color)]/50 p-8 subtle-gradient">
          <p class="text-2xl font-semibold text-white">"We don't predict the future. We identify the variables that will define it — and place our bets accordingly."</p>
        </div>
      </div>
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
    reveal({ root: rootEl.value, targets: '.js-reveal', y: 24, start: 'top 85%', stagger: 0.1 })
  }
  if (blob.value) {
    gsap.to(blob.value, { x: 95, y: -70, duration: 10.5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
  }
})
</script>

<style scoped>
</style>


