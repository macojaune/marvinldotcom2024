import type { CSSProperties } from "react"
import type { SocialCard as Card } from "./catalog"
import { socialThemes } from "./theme"

export const socialImageSize = { width: 1200, height: 630 }
const column: CSSProperties = { display: "flex", flexDirection: "column" }
const row: CSSProperties = { display: "flex", alignItems: "center" }
const display: CSSProperties = {
  fontFamily: "Anybody",
  fontWeight: 800,
  letterSpacing: "-0.035em",
  lineHeight: 1.02
}

type ArtImages = Partial<Record<NonNullable<Card["art"]>, string>>

function ArtPlate({
  art,
  width,
  images
}: {
  art: NonNullable<Card["art"]>
  width: number
  images: ArtImages
}) {
  return (
    <img
      src={images[art]}
      alt=''
      width={width}
      height={width * 0.68}
      style={{ borderRadius: 16, flexShrink: 0 }}
    />
  )
}

export function SocialCard({
  card,
  artImages
}: {
  card: Card
  artImages: ArtImages
}) {
  const { background, foreground, secondary, divider } =
    socialThemes[card.theme]
  const baseTitleSize =
    card.title.length > 100
      ? 56
      : card.title.length > 65
        ? 64
        : card.title.length > 38
          ? 76
          : 88
  const longestWord = Math.max(
    ...card.title.split(/\s+/).map((word) => word.length)
  )
  const titleSize =
    card.kind === "project" && card.art
      ? Math.min(baseTitleSize, 68, 554 / (longestWord * 0.75))
      : baseTitleSize
  return (
    <div
      style={{
        ...column,
        ...socialImageSize,
        padding: "42px 52px 34px",
        background,
        color: foreground,
        fontFamily: "IBM Plex Sans",
        fontWeight: 400,
        justifyContent: "space-between"
      }}
    >
      <div
        style={{
          ...row,
          justifyContent: "space-between",
          fontSize: 25,
          fontWeight: 600
        }}
      >
        <span>MarvinL.com</span>
        <span style={{ color: secondary, fontSize: 21 }}>
          {card.kind === "home" ? "Marvin Londinfer · Guadeloupe" : card.label}
        </span>
      </div>

      {card.kind === "project" ? (
        <div style={{ ...row, gap: 42, flex: 1 }}>
          <div style={{ ...column, width: card.art ? 554 : 1040, gap: 28 }}>
            <div style={{ ...display, fontSize: titleSize }}>{card.title}</div>
            <div
              style={{
                fontSize: 27,
                lineHeight: 1.4,
                color: secondary,
                maxWidth: card.art ? 510 : 840
              }}
            >
              {card.description}
            </div>
          </div>
          {card.art && (
            <ArtPlate images={artImages} art={card.art} width={500} />
          )}
        </div>
      ) : card.kind === "article" ? (
        <div style={{ ...column, flex: 1, justifyContent: "center", gap: 28 }}>
          <div style={{ ...display, fontSize: titleSize, maxWidth: 1070 }}>
            {card.title}
          </div>
          <div
            style={{
              color: secondary,
              maxWidth: 990,
              fontSize: 27,
              lineHeight: 1.4
            }}
          >
            {card.description}
          </div>
        </div>
      ) : card.kind === "home" ? (
        <div style={{ ...row, flex: 1, gap: 28 }}>
          <div style={{ ...column, width: 628, gap: 28 }}>
            <div style={{ ...display, fontSize: 67 }}>{card.title}</div>
            <div style={{ fontSize: 24, color: secondary, maxWidth: 530 }}>
              {card.description}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: 440,
              height: 395,
              position: "relative"
            }}
          >
            {card.featured
              ?.slice(0, 3)
              .reverse()
              .map((project, i) => (
                <div
                  key={project.art}
                  style={{
                    display: "flex",
                    position: "absolute",
                    top: i * 58,
                    left: (2 - i) * 16,
                    transform: `rotate(${(i - 1) * 5}deg)`
                  }}
                >
                  <ArtPlate images={artImages} art={project.art} width={408} />
                </div>
              ))}
          </div>
        </div>
      ) : card.kind === "projects" ? (
        <div style={{ ...column, flex: 1, justifyContent: "center", gap: 28 }}>
          <div style={{ ...row, gap: 36, alignItems: "flex-end" }}>
            <div style={{ ...display, fontSize: 84, width: 740 }}>
              {card.title}
            </div>
            <div
              style={{
                color: secondary,
                fontSize: 24,
                width: 340,
                lineHeight: 1.35
              }}
            >
              {card.description}
            </div>
          </div>
          <div style={{ ...row, gap: 24, marginTop: 10 }}>
            {card.featured?.map((project) => (
              <ArtPlate
                images={artImages}
                key={project.art}
                art={project.art}
                width={349}
              />
            ))}
          </div>
        </div>
      ) : (
        <div style={{ ...row, gap: 64, flex: 1 }}>
          <div style={{ ...column, width: 555, gap: 26 }}>
            <div style={{ ...display, fontSize: 100 }}>{card.title}</div>
            <div style={{ color: secondary, fontSize: 28 }}>
              {card.description}
            </div>
          </div>
          <div style={{ ...column, flex: 1, gap: 25 }}>
            {card.articles?.map((title, i) => (
              <div
                key={title}
                style={{
                  display: "flex",
                  fontSize: i === 0 ? 28 : 24,
                  lineHeight: 1.35,
                  paddingBottom: 24,
                  borderBottom: `1px solid ${divider}`,
                  color: i === 0 ? foreground : secondary
                }}
              >
                {title}
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        style={{
          ...row,
          justifyContent: "space-between",
          paddingTop: 18,
          borderTop: `1px solid ${divider}`,
          fontSize: 20,
          color: secondary
        }}
      >
        <span>
          {card.date
            ? `Publié le ${card.date}`
            : card.kind === "home"
              ? "Produits, expériences et idées en construction."
              : card.kind === "project"
                ? card.technos?.slice(0, 3).join(" · ") ||
                  "Marvin Londinfer · Guadeloupe"
                : card.kind === "blog"
                  ? "Développement web · Produits · Entrepreneuriat"
                  : "Marvin Londinfer · Guadeloupe"}
        </span>
        <span>
          {card.kind === "article"
            ? "marvinl.com / blog"
            : card.kind === "project"
              ? "marvinl.com / projets"
              : `marvinl.com${card.path === "/" ? "" : card.path}`}
        </span>
      </div>
    </div>
  )
}
