import { onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let gsapRegistered = false

function ensureGsapRegistered() {
  if (!gsapRegistered) {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger)
      gsapRegistered = true
    }
  }
}

export function useGsap() {
  ensureGsapRegistered()
  return { gsap, ScrollTrigger }
}

export function useScrollReveal() {
  ensureGsapRegistered()

  function reveal(options) {
    const {
      root,
      targets = null,
      once = false,
      start = 'top 85%',
      y = 24,
      duration = 0.8,
      stagger = 0.08,
      delay = 0,
      ease = 'power3.out',
      opacity = 0,
    } = options

    if (!root || (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      return
    }

    const elements = targets ? root.querySelectorAll(targets) : [root]

    gsap.from(elements, {
      y,
      opacity,
      autoAlpha: opacity === 0 ? 0 : undefined,
      duration,
      ease,
      delay,
      stagger,
      clearProps: 'all',
      scrollTrigger: {
        trigger: root,
        start,
        toggleActions: once ? 'play none none none' : 'play none none reverse',
        once,
      },
    })
  }

  onBeforeUnmount(() => {
    try {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    } catch {}
  })

  return { reveal }
}

/**
 * Splits text nodes in an element into word spans for animation.
 * Idempotent via the 'data-split-words' flag.
 */
export function splitWords(rootEl) {
  if (!rootEl || rootEl.dataset.splitWords === 'true') return

  const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue) return NodeFilter.FILTER_REJECT
      const trimmed = node.nodeValue.trim()
      return trimmed.length > 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    },
  })

  const textNodes = []
  while (walker.nextNode()) textNodes.push(walker.currentNode)

  textNodes.forEach((textNode) => {
    const parent = textNode.parentNode
    const text = textNode.nodeValue
    const frag = document.createDocumentFragment()
    const parts = text.split(/(\s+)/)
    parts.forEach((part) => {
      if (part.trim().length === 0) {
        frag.appendChild(document.createTextNode(part))
      } else {
        const span = document.createElement('span')
        span.className = 'word'
        span.textContent = part
        frag.appendChild(span)
      }
    })
    parent.replaceChild(frag, textNode)
  })

  rootEl.dataset.splitWords = 'true'
}

/**
 * Reveals words within selector targets inside root using GSAP stagger.
 */
export function revealWords({ root, selector = '.js-words', y = 14, duration = 0.6, stagger = 0.02, start = 'top 85%', ease = 'power3.out' }) {
  ensureGsapRegistered()
  if (!root) return

  const targets = root.querySelectorAll(selector)
  targets.forEach((el) => {
    splitWords(el)
    const words = el.querySelectorAll('.word')
    if (!words.length) return
    gsap.from(words, {
      y,
      opacity: 0,
      duration,
      ease,
      stagger,
      clearProps: 'all',
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none reverse',
      },
    })
  })
}


