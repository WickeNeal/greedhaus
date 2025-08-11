<script setup>
import { onMounted } from 'vue'
import { useGsap } from '@/composables/useGsap'
import HeaderBar from './components/HeaderBar.vue'
import HeroSection from './components/HeroSection.vue'
import SignalVsNoise from './components/SignalVsNoise.vue'
import FeaturesGrid from './components/FeaturesGrid.vue'
import TrackRecord from './components/TrackRecord.vue'
import NextSignal from './components/NextSignal.vue'
import JoinPremium from './components/JoinPremium.vue'
import AboutSection from './components/AboutSection.vue'
import SiteFooter from './components/SiteFooter.vue'

const { gsap } = useGsap()

onMounted(() => {
  const sections = Array.from(document.querySelectorAll('main section'))
  sections.forEach((section, idx) => {
    gsap.set(section, { opacity: idx === 0 ? 1 : 0.92, willChange: 'opacity' })
    const next = sections[idx + 1]
    if (next) {
      gsap.fromTo(
        section,
        { opacity: 1 },
        {
          opacity: 0.88,
          scrollTrigger: {
            trigger: next,
            start: 'top bottom',
            end: 'top center',
            scrub: true,
          },
        }
      )
      gsap.fromTo(
        next,
        { opacity: 0.88 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: next,
            start: 'top 85%',
            end: 'top 50%',
            scrub: true,
          },
        }
      )
    }
  })
})
</script>

<template>
  <div class="antialiased">
    <HeaderBar />
    <main>
      <HeroSection />
      <SignalVsNoise />
      <FeaturesGrid />
      <TrackRecord />
      <NextSignal />
      <JoinPremium />
      <AboutSection />
    </main>
    <SiteFooter />
  </div>
  
</template>

<style>
:root {
  --accent-color: #A855F7;
  --secondary-accent: #D1D5DB;
}
body {
  font-family: 'Roboto Mono', monospace;
  background-color: #030005;
  color: #FFFFFF;
}
.gradient-text {  
  background: linear-gradient(90deg, var(--accent-color), #FFFFFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; 
}
.cta-button {  
  background-color: var(--accent-color);
  color: #FFFFFF;
  transition: all 0.3s ease;
  border: 1px solid var(--accent-color); 
}
.cta-button:hover {  
  background-color: transparent;
  color: var(--accent-color);
}
.glow-line {  
  box-shadow: 0 0 8px var(--accent-color), 0 0 16px var(--accent-color), 0 0 24px var(--accent-color);
}
.subtle-gradient {  
  background: linear-gradient(180deg, rgba(168, 85, 247, 0.05) 0%, rgba(168, 85, 247, 0) 100%);
}
.section-gradient {  
  background: radial-gradient(circle at 50% 0%, rgba(31, 19, 52, 0.5) 0%, rgba(3, 0, 5, 0) 40%);
}
.cta-button-gradient {  
  background-image: linear-gradient(to right, #8E2DE2, #4A00E0);
  transition: all 0.3s ease;
}
.cta-button-gradient:hover {  
  opacity: 0.9;
}

.accent-blob {
  pointer-events: none;
  position: absolute;
  width: 40rem;
  height: 40rem;
  border-radius: 9999px;
  background: radial-gradient(circle, rgba(168,85,247,0.20) 0%, rgba(168,85,247,0.08) 35%, rgba(168,85,247,0) 65%);
  filter: blur(0px);
  mix-blend-mode: screen;
}

.seam-top, .seam-bottom {
  pointer-events: none;
  position: absolute;
  left: 0; right: 0; height: 90px;
}
.seam-top { top: -1px; background: linear-gradient(to bottom, rgba(3,0,5,1), rgba(3,0,5,0)); }
.seam-bottom { bottom: -1px; background: linear-gradient(to top, rgba(3,0,5,1), rgba(3,0,5,0)); }
</style>
