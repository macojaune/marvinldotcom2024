import { initializeHeroScene } from "./hero-scene"

const arrival = "cubic-bezier(0.16, 1, 0.3, 1)"
let cleanup = () => {}

export function disposeMotion() {
  cleanup()
  cleanup = () => {}
}

export function initializeMotion() {
  disposeMotion()
  const disposeHero = initializeHeroScene()
  const reduced = matchMedia("(prefers-reduced-motion: reduce)")
  const controller = new AbortController()
  const animations = new Set<Animation>()
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        observer.unobserve(entry.target)
        const line = entry.target.querySelector<HTMLElement>(".maggma-glow")
        if (line && !reduced.matches) {
          const animation = line.animate(
            [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
            { duration: 900, easing: arrival }
          )
          animations.add(animation)
          animation.finished
            .then(() => animations.delete(animation))
            .catch(() => {})
        }
      }
    },
    { threshold: 0.2 }
  )
  document
    .querySelectorAll("[data-motion-panel]")
    .forEach((element) => observer.observe(element))
  reduced.addEventListener(
    "change",
    () => animations.forEach((animation) => animation.finish()),
    { signal: controller.signal }
  )
  cleanup = () => {
    disposeHero()
    observer.disconnect()
    controller.abort()
    animations.forEach((animation) => animation.cancel())
    animations.clear()
  }
}
