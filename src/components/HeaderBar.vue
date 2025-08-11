<template>
  <header ref="rootEl" class="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between" :class="isCompact ? 'h-14' : 'h-20'">
        <a href="#" class="text-2xl font-bold tracking-widest text-[var(--accent-color)]">GREEDHAUS</a>
        <nav class="hidden md:flex items-center space-x-8">
          <a href="#features" class="text-sm font-medium text-gray-400 hover:text-white transition">FEATURES</a>
          <a href="#track-record" class="text-sm font-medium text-gray-400 hover:text-white transition">TRACK_RECORD</a>
          <a href="#about" class="text-sm font-medium text-gray-400 hover:text-white transition">ABOUT</a>
        </nav>
        <div class="flex items-center gap-3">
          <a href="#join" class="hidden sm:inline-block cta-button-gradient text-white font-bold py-2 px-6 rounded-none text-sm tracking-widest">JOIN_PREMIUM</a>
          <button @click="toggleMenu" class="md:hidden inline-flex items-center justify-center w-10 h-10 border border-white/10 bg-black/30 text-white"
            aria-label="Toggle menu">
            <span class="block w-5 h-0.5 bg-white mb-1"></span>
            <span class="block w-5 h-0.5 bg-white mb-1"></span>
            <span class="block w-5 h-0.5 bg-white"></span>
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Mobile menu overlay -->
  <div v-show="isMenuOpen" class="fixed inset-0 z-40 md:hidden" aria-modal="true" role="dialog">
    <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" @click="toggleMenu"></div>
    <div ref="menuPanel" class="absolute top-0 right-0 h-full w-80 max-w-[80%] bg-black/90 border-l border-white/10 text-white p-6 flex flex-col">
      <div class="flex items-center justify-between">
        <span class="text-xl font-bold tracking-widest text-[var(--accent-color)]">GREEDHAUS</span>
        <button @click="toggleMenu" class="p-2" aria-label="Close menu">✕</button>
      </div>
      <nav class="mt-8 space-y-4 text-sm">
        <a @click="toggleMenu" href="#features" class="block text-gray-300 hover:text-white">FEATURES</a>
        <a @click="toggleMenu" href="#track-record" class="block text-gray-300 hover:text-white">TRACK_RECORD</a>
        <a @click="toggleMenu" href="#about" class="block text-gray-300 hover:text-white">ABOUT</a>
        <a @click="toggleMenu" href="#join" class="inline-block mt-4 cta-button-gradient text-white font-bold py-2 px-6 rounded-none text-sm tracking-widest">JOIN_PREMIUM</a>
      </nav>
      <div class="mt-auto text-xs text-gray-500">© 2024 Greedhaus</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useGsap } from '@/composables/useGsap'

const rootEl = ref(null)
const { gsap } = useGsap()
const isCompact = ref(false)
let hideTween = null
let showTween = null
let lastMouseNearTop = false
const isMenuOpen = ref(false)
const menuPanel = ref(null)
let isTouch = false

function showHeader(mode = 'auto') {
  if (!rootEl.value) return
  if (showTween) showTween.kill()
  if (hideTween) hideTween.kill()
  showTween = gsap.to(rootEl.value, { autoAlpha: 1, duration: 0.25, ease: 'power2.out' })
  if (mode === 'full') isCompact.value = false
  if (mode === 'compact') isCompact.value = true
}

function hideHeader() {
  if (!rootEl.value) return
  if (showTween) showTween.kill()
  if (hideTween) hideTween.kill()
  hideTween = gsap.to(rootEl.value, { autoAlpha: 0, duration: 0.25, ease: 'power2.out' })
}

onMounted(() => {
  if (!rootEl.value) return
  // Initial entrance
  gsap.fromTo(rootEl.value, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: 'power2.out' })

  // Detect touch (coarse pointer)
  isTouch = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches

  const onScroll = () => {
    const atTop = window.scrollY <= 2
    isCompact.value = !atTop
    if (atTop) {
      showHeader('full')
      return
    }
    if (isTouch) {
      // On touch devices keep a compact, visible header for accessibility
      showHeader('compact')
    } else {
      // Always hide when not at top; reveal only via hover handler
      hideHeader()
    }
  }

  const onMouseMove = (e) => {
    const nearTop = e.clientY <= 14
    if (nearTop && !lastMouseNearTop) {
      if (window.scrollY > 2) showHeader('compact')
    }
    lastMouseNearTop = nearTop
  }

  const onMouseLeave = () => {
    if (window.scrollY > 2) hideHeader()
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseleave', onMouseLeave)

  // Initial state
  onScroll()

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseleave', onMouseLeave)
  })
})

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
  if (!menuPanel.value) return
  if (isMenuOpen.value) {
    gsap.fromTo(menuPanel.value, { x: 320, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.25, ease: 'power2.out' })
  } else {
    gsap.to(menuPanel.value, { x: 320, autoAlpha: 0, duration: 0.2, ease: 'power2.in' })
  }
}
</script>

<style scoped>
</style>


