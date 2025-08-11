<template>
  <section ref="rootEl" class="min-h-screen flex items-center bg-transparent section-gradient relative overflow-hidden">
    <div ref="blob" class="accent-blob -right-56 -bottom-56 opacity-50"></div>
    <div class="seam-top"></div>
    <div class="seam-bottom"></div>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12 sm:mb-16">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter uppercase">Signal Vs. Noise</h2>
        <p class="mt-3 sm:mt-4 text-base sm:text-lg text-gray-500 max-w-3xl mx-auto">// In a world of chaos, the only edge is information.</p>
      </div>
      <div class="relative">
        <div class="absolute left-1/2 -translate-x-1/2 top-0 h-full w-px">
          <div class="progress-line h-0 w-px bg-[var(--accent-color)]/40"></div>
        </div>
        <div class="space-y-12 sm:space-y-16">
          <div class="relative pl-12 md:pl-0 md:text-center js-reveal">
            <div class="absolute left-0 md:left-1/2 md:-translate-x-1/2 -top-2 h-6 w-0.5 bg-[var(--accent-color)]/70"></div>
            <h3 class="js-words text-2xl font-bold mb-4 text-[var(--accent-color)]">INFLATIONARY DECAY</h3>
            <p class="js-words text-gray-400 max-w-md md:mx-auto">Your cash is bleeding value. Savings accounts are a losing game. The system is designed to dilute your wealth.</p>
          </div>
          <div class="relative pl-12 md:pl-0 md:text-center js-reveal">
            <div class="absolute left-0 md:left-1/2 md:-translate-x-1/2 -top-2 h-6 w-0.5 bg-[var(--accent-color)]/70"></div>
            <h3 class="js-words text-2xl font-bold mb-4 text-[var(--accent-color)]">SYSTEMIC RISK</h3>
            <p class="js-words text-gray-400 max-w-md md:mx-auto">Real estate is a bubble. Pension funds are insolvent. Trusting the system is a high-risk strategy.</p>
          </div>
          <div class="relative pl-12 md:pl-0 md:text-center js-reveal">
            <div class="absolute left-0 md:left-1/2 md:-translate-x-1/2 -top-2 h-6 w-0.5 bg-[var(--accent-color)]/70"></div>
            <h3 class="js-words text-2xl font-bold mb-4 text-[var(--accent-color)]">THE ALPHA PATH</h3>
            <p class="js-words text-gray-400 max-w-md md:mx-auto">Calculated, asymmetric bets are the only path to wealth preservation and growth. The market is a weapon. Learn to wield it.</p>
          </div>
        </div>
      </div>
      <div class="text-center mt-16 js-reveal">
        <p class="text-xl font-semibold text-[var(--accent-color)] tracking-widest">&gt; Greedhaus provides the edge.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useScrollReveal, useGsap, revealWords } from '@/composables/useGsap'

const rootEl = ref(null)
const blob = ref(null)
const { reveal } = useScrollReveal()
const { gsap } = useGsap()

onMounted(() => {
  if (rootEl.value) {
    reveal({ root: rootEl.value, targets: '.js-reveal', start: 'top 80%' })
    revealWords({ root: rootEl.value, selector: '.js-words', y: 12, stagger: 0.025 })

    // Progress line grows as the section scrolls
    const line = rootEl.value.querySelector('.progress-line')
    if (line) {
      gsap.fromTo(
        line,
        { height: 0 },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: rootEl.value,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: true,
          },
        }
      )
    }
  }
  if (blob.value) {
    gsap.to(blob.value, { x: -100, y: -60, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut' })
  }
})
</script>

<style scoped>
/* optional: style for word spans if needed */
.word { display: inline-block; will-change: transform, opacity; }
</style>


