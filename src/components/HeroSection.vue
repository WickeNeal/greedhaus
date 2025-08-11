<template>
  <section ref="rootEl" class="min-h-screen flex items-center text-center relative overflow-hidden section-gradient">
    <div class="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
    <div ref="blob" class="accent-blob -top-40 -left-40 opacity-70"></div>
    <div class="seam-bottom"></div>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative">
      <h1 class="js-reveal js-hero-el text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-4 sm:mb-6 uppercase">Premium Stock Analysis</h1>
      <p class="js-reveal js-hero-el text-xl sm:text-2xl md:text-4xl font-bold mb-6 sm:mb-8 max-w-4xl mx-auto">
        Discover <span class="gradient-text">Market Anomalies</span> — Before The Signal Decays
      </p>
      <p class="js-reveal js-hero-el text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-8 sm:mb-10">
        // Greedhaus delivers high-conviction research on asymmetric opportunities. Our members have seen spectacular returns by acting on alpha signals.
      </p>
      <a href="#join" class="js-reveal js-hero-el cta-button-gradient text-white font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-none text-base sm:text-lg tracking-widest">INITIATE_ACCESS</a>
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
    reveal({ root: rootEl.value, targets: '.js-reveal', y: 30, stagger: 0.12 })
  }
  if (blob.value) {
    gsap.to(blob.value, { x: 120, y: 80, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' })
  }

  // Hero text fades/slides out slightly while scrolling down the hero
  if (rootEl.value) {
    const heroEls = rootEl.value.querySelectorAll('.js-hero-el')
    heroEls.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -24 - i * 6,
          ease: 'none',
          scrollTrigger: {
            trigger: rootEl.value,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    })
  }
})
</script>

<style scoped>
</style>


