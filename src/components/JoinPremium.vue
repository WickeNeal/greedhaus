<template>
  <section id="join" ref="rootEl" class="min-h-screen flex items-center bg-gradient-to-t from-gray-900/50 to-transparent relative overflow-hidden">
    <div ref="blob" class="accent-blob -right-48 bottom-10 opacity-40"></div>
    <div class="seam-top"></div>
    <div class="seam-bottom"></div>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
        <div class="text-center lg:text-left">
          <p class="js-reveal text-[var(--accent-color)] font-semibold tracking-widest text-xs mb-3">ACCESS GRANTED</p>
          <h2 class="js-reveal text-4xl md:text-5xl font-bold tracking-tighter uppercase">Join Greedhaus Premium</h2>
          <p class="js-reveal mt-4 text-xl text-gray-300">// Unlock all 50+ premium reports.</p>
          <p class="js-reveal mt-2 text-lg text-gray-500">// Start seeing the market through a new lens.</p>

          <div class="js-reveal mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-gray-300">
            <div class="flex items-start space-x-3">
              <span class="text-[var(--accent-color)]">▸</span>
              <span>Real-time alerts on high-conviction signals</span>
            </div>
            <div class="flex items-start space-x-3">
              <span class="text-[var(--accent-color)]">▸</span>
              <span>Deep-dive research reports and models</span>
            </div>
            <div class="flex items-start space-x-3">
              <span class="text-[var(--accent-color)]">▸</span>
              <span>Transparent, auditable track record</span>
            </div>
            <div class="flex items-start space-x-3">
              <span class="text-[var(--accent-color)]">▸</span>
              <span>Private community access</span>
            </div>
          </div>

          <div class="js-reveal mt-8 sm:mt-10">
            <a href="#" class="inline-block cta-button-gradient text-white font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-none text-base sm:text-lg tracking-widest">Unlock All Access</a>
            <p class="mt-3 text-xs text-gray-500">No fluff. Cancel anytime.</p>
          </div>
        </div>

        <div class="js-reveal">
          <div class="chart-card relative overflow-hidden border border-[var(--accent-color)]/30 subtle-gradient">
            <div class="chart-grid absolute inset-0 opacity-30"></div>
            <svg ref="chartSvg" viewBox="0 0 600 300" class="block w-full h-[220px] sm:h-[300px]">
              <defs>
                <linearGradient id="chartStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="rgba(168,85,247,0.2)"/>
                  <stop offset="50%" stop-color="rgba(168,85,247,0.9)"/>
                  <stop offset="100%" stop-color="rgba(168,85,247,0.2)"/>
                </linearGradient>
              </defs>
              <polyline ref="chartLine"
                fill="none"
                stroke="url(#chartStroke)"
                stroke-width="3"
                points="0,240 40,230 80,210 120,220 160,180 200,190 240,130 280,150 320,100 360,140 400,120 440,170 480,150 520,190 560,160 600,190"/>
            </svg>
            <div class="px-4 py-3 border-t border-[var(--accent-color)]/20 flex items-center justify-between text-xs text-gray-400">
              <div class="flex items-center space-x-6">
                <span>HIMS +900%</span>
                <span>NVDA +608%</span>
                <span>ROKU +300%</span>
              </div>
              <div class="uppercase tracking-widest text-[var(--accent-color)]">Live Sim</div>
            </div>
          </div>
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
const chartSvg = ref(null)
const chartLine = ref(null)

onMounted(() => {
  if (rootEl.value) {
    reveal({ root: rootEl.value, targets: '.js-reveal', start: 'top 85%', y: 26 })
  }
  if (blob.value) {
    gsap.to(blob.value, { x: -80, y: 50, duration: 9.5, repeat: -1, yoyo: true, ease: 'sine.inOut' })
  }

  if (chartLine.value) {
    const path = chartLine.value
    const length = path.getTotalLength ? path.getTotalLength() : null
    if (length) {
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
      // Draw the line on reveal
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: chartSvg.value,
          start: 'top 85%',
          once: true,
        },
      })
      // Gentle breathing
      gsap.to(path, { opacity: 0.6, duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    }
  }
})
</script>

<style scoped>
.chart-card { backdrop-filter: blur(2px); background-color: rgba(3,0,5,0.35); }
.chart-grid { background-image: linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 40px 1px, 1px 40px; }
</style>


