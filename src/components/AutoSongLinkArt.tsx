import type { CSSProperties } from "react"

// The same 500 × 340 composition is rendered by Astro and by Satori for OG.
export default function AutoSongLinkArt({ web = false }: { web?: boolean }) {
  const size = (value: number) => (web ? `${value / 5}cqw` : value)
  const length = (value: number) => `${value}${web ? "cqw" : "px"}`
  const cssSize = (value: number) => length(web ? value / 5 : value)
  const box = (
    left: number,
    top: number,
    width: number,
    height?: number
  ): CSSProperties => ({
    display: "flex",
    position: "absolute",
    left: size(left),
    top: size(top),
    width: size(width),
    ...(height === undefined ? {} : { height: size(height) })
  })
  const line: CSSProperties = { display: "flex", alignItems: "center" }
  return (
    <div
      className='autosong-art'
      style={{
        display: "flex",
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#e1e6cd",
        color: "#171a17",
        fontFamily: "IBM Plex Sans",
        fontWeight: 600
      }}
    >
      <svg
        width={size(295)}
        height={size(295)}
        viewBox='0 0 128 128'
        fill='none'
        style={{
          position: "absolute",
          left: size(-65),
          top: size(-20),
          transform: "rotate(-12deg)"
        }}
      >
        <path
          d='m53 75-9 9a18 18 0 0 1-26-26l23-23a18 18 0 0 1 26 0M75 53l9-9a18 18 0 0 1 26 26L87 93a18 18 0 0 1-26 0M45 83 83 45'
          stroke='#cedb9e'
          strokeWidth='12'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
      <span
        style={{
          ...box(30, 25, 250),
          fontSize: size(20),
          letterSpacing: "-0.025em"
        }}
      >
        AutoSongLink
      </span>
      <span
        style={{ ...box(387, 30, 85), fontSize: size(9), color: "#4d5939" }}
      >
        Chrome · v1.0
      </span>
      <div
        style={{
          ...box(35, 78, 430, 204),
          background: "#c8d0b4",
          borderRadius: size(10),
          boxShadow: `0 ${cssSize(14)} ${cssSize(24)} #29331c24`
        }}
      >
        <div
          style={{
            ...line,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: size(25),
            padding: `0 ${cssSize(14)}`,
            gap: size(4),
            background: "#f0f2e5",
            borderTopLeftRadius: size(10),
            borderTopRightRadius: size(10)
          }}
        >
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              style={{
                display: "flex",
                width: size(4),
                height: size(4),
                borderRadius: "50%",
                background: "#929d80"
              }}
            />
          ))}
          <span
            style={{
              display: "flex",
              marginLeft: size(9),
              fontSize: size(8),
              color: "#566446"
            }}
          >
            open.spotify.com/track/…
          </span>
          <svg
            width={size(14)}
            height={size(14)}
            viewBox='0 0 24 24'
            fill='none'
            style={{ marginLeft: "auto" }}
          >
            <path
              d='M9 3h4v4h4v4h4v7h-7v3H7v-7H3V7h6z'
              stroke='#52633c'
              strokeWidth='1.7'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      </div>
      <div
        style={{
          ...box(68, 132, 120),
          flexDirection: "column",
          alignItems: "center",
          gap: size(14)
        }}
      >
        <svg width={size(53)} height={size(53)} viewBox='0 0 64 64' fill='none'>
          <circle cx='32' cy='32' r='31' fill='#344325' />
          <path
            d='M15 25c12-4 26-3 36 3'
            stroke='#c8d0b4'
            strokeWidth='4.5'
            strokeLinecap='round'
          />
          <path
            d='M17 34c10-3 22-2 30 3'
            stroke='#c8d0b4'
            strokeWidth='3.7'
            strokeLinecap='round'
          />
          <path
            d='M20 43c8-2 16-1 23 2'
            stroke='#c8d0b4'
            strokeWidth='3'
            strokeLinecap='round'
          />
        </svg>
        <span style={{ fontSize: size(14) }}>Spotify</span>
        <div
          style={{
            display: "flex",
            position: "relative",
            width: size(88),
            height: size(3),
            borderRadius: size(4),
            background: "#a1ae87"
          }}
        >
          <span
            style={{
              width: "41%",
              height: "100%",
              background: "#4d6333",
              borderRadius: size(4)
            }}
          />
          <span
            style={{
              position: "absolute",
              left: "41%",
              top: size(-2),
              width: size(7),
              height: size(7),
              background: "#4d6333",
              borderRadius: "50%"
            }}
          />
        </div>
      </div>
      <div
        style={{
          ...box(230, 125, 215, 162),
          padding: size(18),
          flexDirection: "column",
          background: "#171a17",
          color: "#f3f5ec",
          borderRadius: size(10),
          boxShadow: `0 ${cssSize(9)} ${cssSize(18)} #19231638`
        }}
      >
        <div
          style={{
            ...line,
            gap: size(6),
            fontSize: size(12),
            marginBottom: size(14)
          }}
        >
          <svg
            width={size(19)}
            height={size(19)}
            viewBox='0 0 28 28'
            fill='none'
          >
            <path
              d='m11 17-2 2a5 5 0 0 1-7-7l5-5a5 5 0 0 1 7 0M17 11l2-2a5 5 0 0 1 7 7l-5 5a5 5 0 0 1-7 0M9 19 19 9'
              stroke='#dbf878'
              strokeWidth='2.5'
              strokeLinecap='round'
            />
          </svg>
          <span>AutoSongLink</span>
        </div>
        <div
          style={{
            ...line,
            height: size(29),
            padding: `0 ${cssSize(9)}`,
            gap: size(6),
            background: "#20251f",
            border: "1px solid #3b4238",
            borderRadius: size(6),
            color: "#c9d1c1",
            fontSize: size(8)
          }}
        >
          <svg
            width={size(12)}
            height={size(12)}
            viewBox='0 0 28 28'
            fill='none'
          >
            <path
              d='m11 17-2 2a5 5 0 0 1-7-7l5-5a5 5 0 0 1 7 0M17 11l2-2a5 5 0 0 1 7 7l-5 5a5 5 0 0 1-7 0M9 19 19 9'
              stroke='#afb8a7'
              strokeWidth='1.7'
              strokeLinecap='round'
            />
          </svg>
          <span>open.spotify.com/track/…</span>
        </div>
        <span
          className='autosong-result'
          style={{
            display: "flex",
            color: "#afb8a7",
            fontSize: size(9),
            marginTop: size(13),
            marginBottom: size(12)
          }}
        >
          song.link/s/…
        </span>
        <div
          style={{
            ...line,
            justifyContent: "center",
            position: "relative",
            height: size(32),
            background: "#dbf878",
            color: "#1c2410",
            borderRadius: size(6),
            fontSize: size(10)
          }}
        >
          <span className='autosong-ready' style={{ ...line, gap: size(6) }}>
            <svg
              width={size(12)}
              height={size(12)}
              viewBox='0 0 24 24'
              fill='none'
            >
              <rect
                x='8'
                y='8'
                width='12'
                height='13'
                rx='2'
                stroke='#1c2410'
                strokeWidth='1.8'
              />
              <path
                d='M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3'
                stroke='#1c2410'
                strokeWidth='1.8'
              />
            </svg>
            Copier le lien
          </span>
          {web && (
            <span
              className='autosong-copied'
              style={{
                ...line,
                position: "absolute",
                inset: 0,
                justifyContent: "center",
                gap: size(6)
              }}
            >
              <svg
                width={size(12)}
                height={size(12)}
                viewBox='0 0 24 24'
                fill='none'
              >
                <path
                  d='m5 12 4 4L19 6'
                  stroke='#1c2410'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              Lien copié
            </span>
          )}
        </div>
      </div>
      <div
        style={{
          ...box(60, 315, 380),
          justifyContent: "center",
          alignItems: "center",
          gap: size(17),
          color: "#4b5938",
          fontSize: size(8)
        }}
      >
        {["Spotify", "Apple Music", "YouTube", "YouTube Music"].map(
          (source) => (
            <span
              key={source}
              style={{ display: "flex", whiteSpace: "nowrap" }}
            >
              {source}
            </span>
          )
        )}
      </div>
    </div>
  )
}
