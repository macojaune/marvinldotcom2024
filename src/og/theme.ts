import { createHash } from "node:crypto"

export type SocialTheme = "light" | "dark"

export const socialThemes = {
  light: {
    background: "#EEDDBD",
    foreground: "#792F21",
    secondary: "#835044",
    divider: "#C5A990"
  },
  dark: {
    background: "#741D12",
    foreground: "#FFF4CF",
    secondary: "#E3B79D",
    divider: "#B3765A"
  }
} as const

export function pickSocialTheme(path: string, buildSeed: string): SocialTheme {
  // Repeated lookups within the build must select exactly the same image URL.
  const hash = createHash("sha256").update(`${buildSeed}:${path}`).digest()
  return hash[0] < 128 ? "light" : "dark"
}
