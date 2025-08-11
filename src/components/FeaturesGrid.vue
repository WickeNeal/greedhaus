<template>
  <section id="features" ref="rootEl" class="min-h-screen flex items-center relative overflow-hidden">
    <div ref="blob" class="accent-blob -left-64 bottom-0 opacity-40"></div>
    <div class="seam-top"></div>
    <div class="seam-bottom"></div>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="border-t border-b border-gray-800/70 divide-y divide-gray-800/70">
        <div class="grid sm:grid-cols-2 md:grid-cols-4 divide-x divide-gray-800/70 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent">
          <div class="p-6 text-center subtle-gradient js-reveal border-l border-gray-800/70">
            <h3 class="text-lg font-bold text-gray-500 tracking-widest">SUCCESS_STORY</h3>
            <p class="text-3xl font-bold mt-2 text-[var(--accent-color)]">HIMS</p>
            <p class="text-sm text-gray-400">Buy Signal @ $6</p>
            <p class="text-2xl font-bold mt-2">Current: $60 <span class="text-gray-500">(+900%)</span></p>
          </div>
          <div class="p-6 text-center bg-purple-900/10 subtle-gradient js-reveal">
            <h3 class="text-lg font-bold text-gray-500 tracking-widest">CURRENT_OPPORTUNITY</h3>
            <p class="text-3xl font-bold mt-2 text-[var(--accent-color)]">ZETA</p>
            <p class="text-sm text-gray-400">Latest High-Conviction Signal</p>
            <p class="text-lg font-semibold text-white mt-2">Free Analysis Available</p>
          </div>
          <div class="p-6 subtle-gradient js-reveal">
            <h3 class="text-lg font-bold text-gray-500 text-center mb-3 tracking-widest">PORTFOLIO_ACCESS</h3>
            <ul class="space-y-2 text-gray-300">
              <li class="flex items-center"><span class="text-[var(--accent-color)] mr-2">&gt;</span> 50+ Premium Stock Reports</li>
              <li class="flex items-center"><span class="text-[var(--accent-color)] mr-2">&gt;</span> Exclusive In-Depth Research</li>
              <li class="flex items-center"><span class="text-[var(--accent-color)] mr-2">&gt;</span> Transparent Track Record</li>
            </ul>
          </div>
          <div class="p-6 subtle-gradient js-reveal border-r border-gray-800/70">
            <h3 class="text-lg font-bold text-gray-500 text-center mb-3 tracking-widest">TRUSTED_BY_1000+</h3>
            <ul class="space-y-2 text-gray-300">
              <li class="flex items-center"><span class="text-[var(--accent-color)] mr-2">&gt;</span> Proven Returns</li>
              <li class="flex items-center"><span class="text-[var(--accent-color)] mr-2">&gt;</span> Deep Research</li>
              <li class="flex items-center"><span class="text-[var(--accent-color)] mr-2">&gt;</span> Full Transparency</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-12 sm:mt-16">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          <div class="js-reveal js-stat p-8 text-center border border-gray-800 subtle-gradient">
            <p class="text-gray-500 text-xs tracking-widest font-bold">AVG_ALPHA_PER_PICK</p>
            <p class="text-5xl font-extrabold mt-2"><span class="js-counter" data-target="212">0</span><span class="text-[var(--accent-color)]">%</span></p>
          </div>
          <div class="js-reveal js-stat p-8 text-center border border-gray-800 subtle-gradient">
            <p class="text-gray-500 text-xs tracking-widest font-bold">WIN_RATE</p>
            <p class="text-5xl font-extrabold mt-2"><span class="js-counter" data-target="68">0</span><span class="text-[var(--accent-color)]">%</span></p>
          </div>
          <div class="js-reveal js-stat p-8 text-center border border-gray-800 subtle-gradient">
            <p class="text-gray-500 text-xs tracking-widest font-bold">REPORTS_PUBLISHED</p>
            <p class="text-5xl font-extrabold mt-2"><span class="js-counter" data-target="57">0</span></p>
          </div>
        </div>
      </div>

      <div class="mt-12 sm:mt-16 overflow-hidden border-t border-gray-800/60">
        <div class="relative">
          <div class="marquee flex items-center py-4 text-gray-500/80 text-xs tracking-[0.25em] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div class="shrink-0 flex items-center">
              <span class="mx-8">HIMS</span>
              <span class="mx-8">ROKU</span>
              <span class="mx-8">NVDA</span>
              <span class="mx-8">ZETA</span>
              <span class="mx-8">AAPL</span>
              <span class="mx-8">TSLA</span>
              <span class="mx-8">MSFT</span>
              <span class="mx-8">META</span>
            </div>
            <div class="shrink-0 flex items-center">
              <span class="mx-8">HIMS</span>
              <span class="mx-8">ROKU</span>
              <span class="mx-8">NVDA</span>
              <span class="mx-8">ZETA</span>
              <span class="mx-8">AAPL</span>
              <span class="mx-8">TSLA</span>
              <span class="mx-8">MSFT</span>
              <span class="mx-8">META</span>
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

onMounted(() => {
  if (rootEl.value) {
    reveal({ root: rootEl.value, targets: '.js-reveal', y: 40, start: 'top 85%', stagger: 0.1 })
  }
  if (blob.value) {
    gsap.to(blob.value, { x: 90, y: -50, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' })
  }

  // Animate counters when stats row enters viewport
  const counters = rootEl.value?.querySelectorAll('.js-counter') || []
  counters.forEach((el) => {
    const target = Number(el.getAttribute('data-target') || '0')
    const obj = { val: 0 }
    gsap.to(obj, {
      val: target,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el.closest('.js-stat'),
        start: 'top 85%',
        once: true,
      },
      onUpdate: () => {
        const isPercent = el.nextElementSibling?.textContent === '%'
        el.textContent = isPercent ? Math.round(obj.val).toString() : Math.round(obj.val).toString()
      },
    })
  })
})
</script>

<style scoped>
@keyframes scroll-left {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.marquee {
  width: 200%;
  animation: scroll-left 30s linear infinite;
}
</style>


