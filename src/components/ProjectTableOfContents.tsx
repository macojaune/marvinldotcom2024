import { useEffect, useRef, useState } from "react"

type Heading = {
  depth: number
  slug: string
  text: string
}

interface Props {
  headings: Heading[]
}

function TocLinks({ headings, activeSlug }: Props & { activeSlug: string }) {
  const listRef = useRef<HTMLOListElement>(null)
  const [markerY, setMarkerY] = useState<number | null>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const update = () => {
      const current = list.querySelector<HTMLElement>(
        '[aria-current="location"]'
      )
      if (current && list.offsetHeight > 0) {
        setMarkerY(current.offsetTop + (current.offsetHeight - 16) / 2)
      }
    }
    update()
    const resize = new ResizeObserver(update)
    resize.observe(list)
    return () => resize.disconnect()
  }, [activeSlug])

  return (
    <div className='toc-rail relative'>
      <ol ref={listRef} className='toc-links relative grid gap-1'>
        {headings.map((heading) => {
          const isActive = heading.slug === activeSlug
          return (
            <li key={heading.slug}>
              <a
                href={`#${heading.slug}`}
                aria-current={isActive ? "location" : undefined}
                className={`relative block rounded-md py-2 pr-2 text-sm leading-5 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-l/tertiary dark:focus-visible:ring-d/accent ${heading.depth === 3 ? "pl-7" : "pl-4"} ${isActive ? "text-l/primary dark:text-d/primary" : "text-l/secondary hover:text-l/primary dark:text-d/subtle dark:hover:text-d/primary"}`}
              >
                <span
                  aria-hidden='true'
                  className='absolute bottom-2 left-0 top-2 w-px bg-l/primary/15 dark:bg-d/primary/15'
                />
                {heading.text}
              </a>
            </li>
          )
        })}
      </ol>
      <span
        aria-hidden='true'
        className='toc-marker bg-l/tertiary dark:bg-d/accent'
        style={{
          opacity: markerY === null ? 0 : 1,
          transform: `translateY(${markerY ?? 0}px)`
        }}
      />
    </div>
  )
}

export default function ProjectTableOfContents({ headings }: Props) {
  const [activeSlug, setActiveSlug] = useState(headings[0]?.slug ?? "")

  useEffect(() => {
    if (headings.length === 0) return

    let frame = 0

    const updateActiveHeading = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const current = headings.reduce((active, heading) => {
          const element = document.getElementById(heading.slug)

          if (element && element.getBoundingClientRect().top <= 180) {
            return heading.slug
          }

          return active
        }, headings[0].slug)

        setActiveSlug(current)
      })
    }

    updateActiveHeading()
    window.addEventListener("scroll", updateActiveHeading, { passive: true })
    window.addEventListener("hashchange", updateActiveHeading)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", updateActiveHeading)
      window.removeEventListener("hashchange", updateActiveHeading)
    }
  }, [headings])

  const links = <TocLinks headings={headings} activeSlug={activeSlug} />

  return (
    <>
      <details className='group border-y border-l/primary/15 py-3 dark:border-d/primary/15 lg:hidden'>
        <summary className='flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-l/secondary outline-none focus-visible:ring-2 focus-visible:ring-l/tertiary dark:text-d/subtle dark:focus-visible:ring-d/accent'>
          Sommaire
          <span
            aria-hidden='true'
            className='text-lg leading-none transition-transform group-open:rotate-45'
          >
            +
          </span>
        </summary>
        <nav aria-label='Sommaire de l’article' className='pt-3'>
          {links}
        </nav>
      </details>

      <nav
        aria-label='Sommaire de l’article'
        className='hidden border-t border-l/primary/15 pt-5 dark:border-d/primary/15 lg:block'
      >
        <p className='mb-3 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-l/secondary dark:text-d/subtle'>
          Sommaire
        </p>
        {links}
      </nav>
    </>
  )
}
