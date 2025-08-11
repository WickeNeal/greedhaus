<template>
  <section id="track-record" ref="rootEl" class="min-h-screen flex items-center bg-transparent section-gradient relative overflow-hidden">
    <div ref="blob" class="accent-blob -right-40 top-20 opacity-40"></div>
    <div class="seam-top"></div>
    <div class="seam-bottom"></div>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter uppercase">Proven Track Record</h2>
        <p class="mt-3 sm:mt-4 text-base sm:text-lg text-gray-500">// Our results are not luck. They are the output of a repeatable process. Rigorous research, fundamental analysis, and pattern recognition.</p>
      </div>
      <div class="space-y-12">
        <div class="relative py-6 sm:py-8 border-t border-b border-gray-800 subtle-gradient js-left">
          <div class="absolute -top-px left-0 h-px w-1/4 bg-[var(--accent-color)] glow-line"></div>
          <div class="absolute -bottom-px right-0 h-px w-1/4 bg-[var(--accent-color)] glow-line"></div>
          <div class="grid md:grid-cols-12 gap-8 items-center">
            <div class="md:col-span-4">
              <h3 class="text-5xl font-bold text-[var(--accent-color)]">HIMS</h3>
              <p class="text-xl text-gray-300 mt-2">Hims &amp; Hers Health</p>
              <div class="mt-4 space-y-2 text-lg">
                <p><strong>March 2022</strong></p>
                <p>Entry Price: <span class="font-semibold">$6</span></p>
                <p>Current Price: <span class="font-semibold">$60</span></p>
                <p class="text-4xl font-bold text-[var(--accent-color)]">+900%</p>
              </div>
            </div>
            <div class="md:col-span-8">
              <p class="text-lg text-gray-300">“Signal identified: telehealth adoption curve steepening. HIMS possessed strong fundamentals in a hyper-growth market. Low-risk entry point.”</p>
              <a href="#" class="inline-block mt-6 font-semibold text-white hover:text-[var(--accent-color)] transition">Read Full Analysis →</a>
            </div>
          </div>
        </div>
        <div class="relative py-6 sm:py-8 border-t border-b border-gray-800 subtle-gradient js-right">
          <div class="absolute -top-px right-0 h-px w-1/4 bg-[var(--accent-color)] glow-line"></div>
          <div class="absolute -bottom-px left-0 h-px w-1/4 bg-[var(--accent-color)] glow-line"></div>
          <div class="grid md:grid-cols-12 gap-8 items-center">
            <div class="md:col-span-8 md:order-last text-right">
              <p class="text-lg text-gray-300">“Signal identified: Streaming was a trojan horse. ROKU's platform-centric, ad-driven revenue model was the real play for the COVID-era attention economy.”</p>
              <a href="#" class="inline-block mt-6 font-semibold text-white hover:text-[var(--accent-color)] transition">Read Full Analysis →</a>
            </div>
            <div class="md:col-span-4 text-right">
              <h3 class="text-5xl font-bold text-[var(--accent-color)]">ROKU</h3>
              <p class="text-xl text-gray-300 mt-2">Roku Inc</p>
              <div class="mt-4 space-y-2 text-lg">
                <p><strong>July 2020</strong></p>
                <p>Entry Price: <span class="font-semibold">$45</span></p>
                <p>Current Price: <span class="font-semibold">$180</span></p>
                <p class="text-4xl font-bold text-[var(--accent-color)]">+300%</p>
              </div>
            </div>
          </div>
        </div>
        <div class="relative py-6 sm:py-8 border-t border-b border-gray-800 subtle-gradient js-left">
          <div class="absolute -top-px left-0 h-px w-1/4 bg-[var(--accent-color)] glow-line"></div>
          <div class="absolute -bottom-px right-0 h-px w-1/4 bg-[var(--accent-color)] glow-line"></div>
          <div class="grid md:grid-cols-12 gap-8 items-center">
            <div class="md:col-span-4">
              <h3 class="text-5xl font-bold text-[var(--accent-color)]">NVDA</h3>
              <p class="text-xl text-gray-300 mt-2">NVIDIA Corporation</p>
              <div class="mt-4 space-y-2 text-lg">
                <p><strong>December 2022</strong></p>
                <p>Entry Price: <span class="font-semibold">$120</span></p>
                <p>Current Price: <span class="font-semibold">$850</span></p>
                <p class="text-4xl font-bold text-[var(--accent-color)]">+608%</p>
              </div>
            </div>
            <div class="md:col-span-8">
              <p class="text-lg text-gray-300">“Signal identified: The AI computation boom was inevitable. NVIDIA’s monopolistic hold on GPUs made it a foundational investment for the next decade.”</p>
              <a href="#" class="inline-block mt-6 font-semibold text-white hover:text-[var(--accent-color)] transition">Read Full Analysis →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
 </template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useGsap } from '@/composables/useGsap'

const rootEl = ref(null)
const blob = ref(null)
const { gsap, ScrollTrigger } = useGsap()

onMounted(() => {
  const root = rootEl.value
  if (!root) return

  const animateFrom = (els, x) => {
    els.forEach((el) => {
      gsap.from(el, {
        x,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    })
  }

  animateFrom(root.querySelectorAll('.js-left'), -80)
  animateFrom(root.querySelectorAll('.js-right'), 80)
  if (blob.value) {
    gsap.to(blob.value, { x: -120, y: 60, duration: 11, repeat: -1, yoyo: true, ease: 'sine.inOut' })
  }
})

onBeforeUnmount(() => {
  try {
    ScrollTrigger.getAll().forEach((t) => t.kill())
  } catch {}
})
</script>

<style scoped>
</style>


