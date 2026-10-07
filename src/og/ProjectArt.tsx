import type { CSSProperties, ReactNode } from "react"
import AutoSongLinkArt from "../components/AutoSongLinkArt"
import type { previewProjects } from "../project-previews"

type Art = (typeof previewProjects)[number]
const row: CSSProperties = { display: "flex", alignItems: "center" }
const column: CSSProperties = { display: "flex", flexDirection: "column" }
const fill: CSSProperties = { width: "100%", height: "100%" }

function Frame({
  background,
  color = "#171717",
  children
}: {
  background: string
  color?: string
  children: ReactNode
}) {
  return (
    <div
      style={{
        ...column,
        ...fill,
        position: "relative",
        background,
        color,
        padding: 30,
        overflow: "hidden",
        fontFamily: "IBM Plex Sans",
        fontWeight: 600
      }}
    >
      {children}
    </div>
  )
}

function Lines({ color = "#c8cad0" }: { color?: string }) {
  return (
    <div style={{ ...column, flex: 1, gap: 14, justifyContent: "center" }}>
      <div
        style={{ height: 8, width: "80%", background: color, opacity: 0.9 }}
      />
      <div
        style={{ height: 6, width: "55%", background: color, opacity: 0.5 }}
      />
    </div>
  )
}

function BrowserBar({ color }: { color: string }) {
  return (
    <div style={{ ...row, gap: 8, marginBottom: 26 }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{ width: 9, height: 9, borderRadius: 9, background: color }}
        />
      ))}
    </div>
  )
}

function Map({ dark = false }: { dark?: boolean }) {
  const roads = dark ? "#3c5d57" : "#b7b8b7"
  return (
    <svg width='100%' height='100%' viewBox='0 0 360 240' fill='none'>
      <path
        d='M-10 42C78 18 104 95 176 73s83-3 194-59M52 250c-9-65 60-64 56-123S74 41 91-10M178 250c15-69-13-118 35-151s87-12 101-109'
        stroke={roads}
        strokeWidth='3'
      />
      {dark ? (
        <g>
          <path
            d='M38 180c41-23 56-60 103-55s72 30 126-17'
            stroke='#ff8f5b'
            strokeWidth='5'
            strokeLinecap='round'
          />
          <circle
            cx='38'
            cy='180'
            r='8'
            fill='#ff8f5b'
            stroke='#143a38'
            strokeWidth='4'
          />
          <circle
            cx='142'
            cy='125'
            r='8'
            fill='#ff8f5b'
            stroke='#143a38'
            strokeWidth='4'
          />
          <circle
            cx='267'
            cy='108'
            r='11'
            fill='#f5edda'
            stroke='#143a38'
            strokeWidth='4'
          />
        </g>
      ) : (
        <g>
          <circle
            cx='92'
            cy='84'
            r='9'
            fill='#ef5656'
            stroke='white'
            strokeWidth='4'
          />
          <circle
            cx='206'
            cy='152'
            r='9'
            fill='#ef5656'
            stroke='white'
            strokeWidth='4'
          />
          <circle
            cx='278'
            cy='58'
            r='9'
            fill='#ef5656'
            stroke='white'
            strokeWidth='4'
          />
        </g>
      )}
    </svg>
  )
}

// Social-format adaptations of the eleven compositions in ProjectPreview.astro.
// These are illustrative product previews, not screenshots or live statistics.
export function ProjectArt({ project }: { project: Art }) {
  switch (project) {
    case "kalot-municipales":
      return (
        <Frame background='#111211' color='#f6f6f2'>
          <div
            style={{ ...row, justifyContent: "space-between", fontSize: 20 }}
          >
            <span>KALOT</span>
            <span style={{ color: "#91ff3c" }}>MUNICIPALES</span>
          </div>
          <div style={{ ...row, flex: 1, gap: 18 }}>
            {[0, 1].map((i) => (
              <div
                key={i}
                style={{
                  ...row,
                  flex: 1,
                  padding: 16,
                  height: 106,
                  border: "1px solid #5c5c5b",
                  borderRadius: 12,
                  gap: 12
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 50,
                    background: i ? "#d4afff" : "#91ff3c"
                  }}
                />
                <Lines color='#f6f6f2' />
              </div>
            ))}
            <span
              style={{
                position: "absolute",
                left: "46%",
                top: "68%",
                color: "#91ff3c",
                fontSize: 22
              }}
            >
              VS
            </span>
          </div>
          <div style={{ ...row, gap: 7 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  height: 6,
                  flex: 1,
                  background: i < 3 ? "#91ff3c" : "#383a35"
                }}
              />
            ))}
          </div>
        </Frame>
      )
    case "stay-connect":
      return (
        <Frame background='#f4f5f7'>
          <div style={{ fontSize: 34, color: "#f15a29", marginBottom: 16 }}>
            #StayConnect
          </div>
          <div
            style={{
              ...column,
              gap: 10,
              borderLeft: "2px solid #f15a29",
              paddingLeft: 20
            }}
          >
            {["#ffd7c9", "#cbdaf5", "#d7e8d3"].map((c) => (
              <div
                key={c}
                style={{
                  ...row,
                  padding: 10,
                  gap: 20,
                  background: "#fff",
                  border: "1px solid #dedfe3",
                  borderRadius: 10
                }}
              >
                <div
                  style={{
                    height: 40,
                    width: 40,
                    background: c,
                    borderRadius: 6
                  }}
                />
                <Lines color='#5d5f66' />
              </div>
            ))}
          </div>
        </Frame>
      )
    case "o-mas-la":
      return (
        <Frame background='#143a38' color='#f5edda'>
          <div style={{ ...fill, display: "flex" }}>
            <Map dark />
          </div>
          <span
            style={{
              position: "absolute",
              bottom: 28,
              right: 30,
              fontSize: 26
            }}
          >
            O MAS LA ?
          </span>
        </Frame>
      )
    case "pani-limye-pani-dlo":
      return (
        <Frame background='#f7f7f4'>
          <div
            style={{
              ...row,
              background: "#141827",
              justifyContent: "space-between",
              padding: 16,
              fontSize: 24
            }}
          >
            <span style={{ color: "#ffc82e" }}>Pani limyè</span>
            <span style={{ color: "#55c8ed" }}>Pani Dlo</span>
          </div>
          <div style={{ ...row, flex: 1 }}>
            <div
              style={{
                ...column,
                width: "40%",
                gap: 18,
                padding: 18,
                fontSize: 22
              }}
            >
              <span>Chez toi, c’est comment ?</span>
              <span
                style={{
                  border: "1px solid #c7c8cd",
                  padding: 10,
                  fontSize: 14
                }}
              >
                Activer ma localisation
              </span>
            </div>
            <div
              style={{
                display: "flex",
                height: "100%",
                flex: 1,
                background: "#d9d9d7"
              }}
            >
              <Map />
            </div>
          </div>
        </Frame>
      )
    case "lejustecoin-jeu-en-ligne-sur-l-immobilier-en-guadeloupe":
      return (
        <Frame background='#ffe6d7'>
          <div style={{ fontSize: 34, color: "#de571d", marginBottom: 26 }}>
            LeJusteCoin
          </div>
          <div
            style={{
              ...row,
              background: "#fff",
              borderRadius: 14,
              overflow: "hidden",
              height: 220
            }}
          >
            <div
              style={{
                display: "flex",
                width: "38%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                background: "#f6c7aa"
              }}
            >
              <svg width='115' height='130' viewBox='0 0 100 110'>
                <path d='m5 45 45-35 45 35Z' fill='#ffd1b5' />
                <path d='M18 45h64v55H18Z' fill='#de571d' />
                <path d='M44 70h18v30H44Z' fill='#ffe6d7' />
              </svg>
            </div>
            <div style={{ ...column, padding: 20, flex: 1, gap: 16 }}>
              <span style={{ fontSize: 22 }}>Quel est le loyer ?</span>
              <span style={{ fontSize: 15, color: "#745645" }}>
                3 pièces · Guadeloupe
              </span>
              <div style={{ ...row, gap: 6 }}>
                {["850 €", "1 150 €", "1 400 €"].map((price) => (
                  <span
                    key={price}
                    style={{
                      padding: 8,
                      fontSize: 13,
                      background: "#ffe6d7",
                      borderRadius: 4
                    }}
                  >
                    {price}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Frame>
      )
    case "extension-chrome-odesli":
      return <AutoSongLinkArt />
    case "days-since-scolo":
      return (
        <Frame background='#fbf2c8' color='#212819'>
          <span style={{ fontSize: 19 }}>DERNIÈRE RENCONTRE</span>
          <span
            style={{
              fontFamily: "Anybody",
              fontWeight: 800,
              fontSize: 148,
              lineHeight: 1.1
            }}
          >
            12
          </span>
          <span style={{ fontSize: 25 }}>jours sans scolopendre</span>
          <div style={{ ...row, gap: 8, marginTop: 22 }}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 8,
                  background: i < 4 ? "#778248" : "#d6d9af"
                }}
              />
            ))}
          </div>
        </Frame>
      )
    case "macojaune":
      return (
        <Frame background='#f6ce37'>
          <div
            style={{ ...row, justifyContent: "space-between", fontSize: 24 }}
          >
            <span>@MACOJAUNE</span>
            <span style={{ fontSize: 14 }}>LE SITE</span>
          </div>
          <div style={{ ...row, flex: 1, gap: 12, marginTop: 26 }}>
            {["#e89968", "#e86f39", "#8096ad"].map((color) => (
              <div
                key={color}
                style={{
                  ...column,
                  background: color,
                  flex: 1,
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <svg
                  width='55'
                  height='55'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='#171717'
                  strokeWidth='1.2'
                >
                  <rect x='3' y='3' width='18' height='18' rx='2' />
                  <circle cx='8.5' cy='8.5' r='1.5' />
                  <path d='m21 15-5-5L5 21' />
                </svg>
              </div>
            ))}
          </div>
          <span style={{ fontSize: 36, marginTop: 18 }}>
            JE SUIS MACOJAUNE.
          </span>
        </Frame>
      )
    case "marvinl-point-com":
      return (
        <Frame background='#741d12' color='#fff4cf'>
          <BrowserBar color='#b76a53' />
          <span
            style={{
              fontFamily: "Anybody",
              fontWeight: 800,
              fontSize: 142,
              lineHeight: 1.2
            }}
          >
            ML
          </span>
          <Lines color='#f3bf86' />
        </Frame>
      )
    case "quilivreou":
      return (
        <Frame background='#fceed8' color='#080808'>
          <div
            style={{
              ...column,
              padding: 18,
              gap: 14,
              background: "#f48229",
              border: "1px solid #080808"
            }}
          >
            <span
              style={{ fontSize: 36, fontFamily: "Anybody", fontWeight: 800 }}
            >
              QUILIVREOÙ?
            </span>
            <div
              style={{
                ...row,
                padding: 12,
                gap: 15,
                background: "white",
                border: "1px solid #080808",
                fontSize: 15
              }}
            >
              <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
                <circle cx='8' cy='8' r='5' stroke='#080808' strokeWidth='2' />
                <path d='m12 12 5 5' stroke='#080808' strokeWidth='2' />
              </svg>
              <div style={{ height: 5, flex: 1, background: "#b7b0a6" }} />
              <span>Antilles / Guyane</span>
            </div>
          </div>
          <div style={{ ...row, flex: 1, gap: 16, marginTop: 24 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  ...column,
                  flex: 1,
                  padding: 12,
                  gap: 14,
                  background: "white",
                  border: "1px solid #080808",
                  alignItems: "center"
                }}
              >
                <svg
                  width='72'
                  height='70'
                  viewBox='0 0 72 48'
                  fill='none'
                  stroke='#080808'
                  strokeWidth='2'
                >
                  <path
                    d={
                      i === 0
                        ? "m18 15 18-8 18 8v22l-18 8-18-8ZM18 15l18 8 18-8M36 23v22"
                        : i === 1
                          ? "M19 17h34l3 27H16ZM28 22V13a8 8 0 0 1 16 0v9"
                          : "M13 27 25 10l10 7 5 12 18 5q5 1 5 9H10v-8ZM12 36h45M30 22l9-3M34 28l9-3"
                    }
                  />
                </svg>
                <span style={{ color: "#285b32", fontSize: 14 }}>LIVRE</span>
              </div>
            ))}
          </div>
        </Frame>
      )
    case "sauve-ta-saint-valentin":
      return (
        <Frame background='#f7dfe4' color='#841f37'>
          <div style={{ ...row, ...fill, gap: 12 }}>
            <div style={{ ...column, flex: 1, gap: 16 }}>
              <span style={{ fontSize: 17 }}>14 FÉVRIER</span>
              <span
                style={{
                  fontFamily: "Anybody",
                  fontWeight: 800,
                  fontSize: 38,
                  lineHeight: 1.1
                }}
              >
                Sauve ta Saint-Valentin
              </span>
            </div>
            <svg width='160' height='190' viewBox='0 0 100 100' fill='#841f37'>
              <path d='M50 88 13 52C-5 34 14 4 34 16l16 13 16-13c20-12 39 18 21 36Z' />
            </svg>
          </div>
        </Frame>
      )
  }
}
