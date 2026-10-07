const clamp = (value: number) => Math.max(0, Math.min(1, value))
const mix = (from: number, to: number, progress: number) =>
  from + (to - from) * progress

/** Native scrolling drives one composition: a sentence becomes a project spread. */
export function initializeHeroScene() {
  const scene = document.querySelector<HTMLElement>("[data-hero-scene]")
  const title = scene?.querySelector<HTMLElement>("[data-hero-title]")
  const cards = [
    ...(scene?.querySelectorAll<HTMLElement>("[data-hero-project]") ?? [])
  ]
  const marker = scene?.querySelector<HTMLElement>("[data-hero-progress]")
  if (!scene || !title || cards.length === 0) return () => {}

  const desktop = matchMedia("(min-width: 768px)")
  const reduced = matchMedia("(prefers-reduced-motion: reduce)")
  const controller = new AbortController()
  let frame = 0
  let focusFrame = 0
  let start = 0
  let travel = 1
  let width = 0
  let cardWidth = 0
  let lastProgress = -1

  function paint() {
    frame = 0
    if (reduced.matches || !desktop.matches) return
    const progress = clamp((window.scrollY - start) / travel)
    if (progress === lastProgress) return
    lastProgress = progress
    // The sentence stays opaque and readable; geometry, rather than a fade, carries the transition.
    title!.style.transform = `translateY(${-24 * progress}px) scale(${mix(1, 0.68, progress)})`
    const spread = 1 - Math.pow(1 - progress, 2)
    cards.forEach((card, index) => {
      const finalX =
        index * ((width - cardWidth) / Math.max(1, cards.length - 1))
      const x = mix(width - cardWidth - 42 + index * 14, finalX, spread)
      const y = mix(18 + index * 6, 0, spread)
      const angle = mix([-9, 2, 12][index] ?? 0, 0, spread)
      card.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${angle}deg)`
    })
    if (marker) marker.style.transform = `translateX(${48 * progress}px)`
  }
  function schedule() {
    if (!frame && !reduced.matches && desktop.matches)
      frame = requestAnimationFrame(paint)
  }
  function measure() {
    if (frame) cancelAnimationFrame(frame)
    frame = 0
    scene!.classList.remove("is-kinetic")
    cards.forEach((card) => {
      card.style.removeProperty("transform")
    })
    title!.style.removeProperty("transform")
    if (reduced.matches || !desktop.matches) return
    width = scene!.clientWidth
    const titleTop = 78
    const titleHeight = title!.offsetHeight
    cardWidth = (width - 48) / 3
    // Preserve enough room for the fully readable sentence and the initial project pile.
    const cardsTop = titleTop + titleHeight * 0.78 + 12
    const cardHeight = cardWidth / 1.6 + 72
    const height = cardsTop + cardHeight + 70
    travel = Math.max(640, window.innerHeight * 0.85)
    scene!.style.setProperty("--hero-height", `${height}px`)
    scene!.style.setProperty("--hero-travel", `${travel}px`)
    scene!.style.setProperty("--hero-title-top", `${titleTop}px`)
    scene!.style.setProperty("--hero-cards-top", `${cardsTop}px`)
    scene!.style.setProperty("--hero-card-width", `${cardWidth}px`)
    scene!.classList.add("is-kinetic")
    start = scene!.getBoundingClientRect().top + window.scrollY - 16
    lastProgress = -1
    paint()
  }

  window.addEventListener("scroll", schedule, {
    passive: true,
    signal: controller.signal
  })
  window.addEventListener("resize", measure, { signal: controller.signal })
  reduced.addEventListener("change", measure, { signal: controller.signal })
  desktop.addEventListener("change", measure, { signal: controller.signal })
  cards.forEach((card) =>
    card.addEventListener(
      "focus",
      () => {
        if (
          reduced.matches ||
          !desktop.matches ||
          !card.matches(":focus-visible")
        )
          return
        // Spread the fan so the focused project is visible.
        if (focusFrame) cancelAnimationFrame(focusFrame)
        // Run after the browser's own focus scrolling, without animating keyboard travel.
        focusFrame = requestAnimationFrame(() => {
          focusFrame = 0
          window.scrollTo({
            top: start + travel,
            behavior: "instant"
          })
          schedule()
        })
      },
      { signal: controller.signal }
    )
  )
  measure()
  document.fonts.ready.then(() => {
    if (!controller.signal.aborted) measure()
  })
  return () => {
    controller.abort()
    if (focusFrame) cancelAnimationFrame(focusFrame)
    if (frame) cancelAnimationFrame(frame)
    scene.classList.remove("is-kinetic")
    cards.forEach((card) => card.style.removeProperty("transform"))
    title.style.removeProperty("transform")
  }
}
