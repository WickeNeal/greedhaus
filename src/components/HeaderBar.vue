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
        <a href="#join" class="hidden sm:inline-block cta-button-gradient text-white font-bold py-2 px-6 rounded-none text-sm tracking-widest">JOIN_PREMIUM</a>
      </div>
    </div>
  </header>

  
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
    // Always hide when not at top; reveal only by hover-at-top (desktop)
    hideHeader()
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

 
</script>

<style scoped>
</style>


