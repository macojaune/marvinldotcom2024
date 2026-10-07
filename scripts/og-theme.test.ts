import assert from "node:assert/strict"
import { test } from "node:test"
import { pickSocialTheme, socialThemes } from "../src/og/theme.ts"

test("theme stays stable within a build and varies between builds", () => {
  const paths = Array.from({ length: 64 }, (_, i) => `/projets/test-${i}`)
  const first = paths.map((path) => pickSocialTheme(path, "build-one"))
  assert.deepEqual(
    first,
    paths.map((path) => pickSocialTheme(path, "build-one"))
  )
  assert.deepEqual(new Set(first), new Set(["light", "dark"]))
  assert.notDeepEqual(
    first,
    paths.map((path) => pickSocialTheme(path, "build-two"))
  )
})

function luminance(hex: string) {
  const channels = hex.match(/[a-f0-9]{2}/gi)!.map((part) => {
    const value = parseInt(part, 16) / 255
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  })
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
}

test("both themes keep primary and secondary copy readable", () => {
  for (const [name, colors] of Object.entries(socialThemes)) {
    for (const text of [colors.foreground, colors.secondary]) {
      const values = [luminance(colors.background), luminance(text)].sort(
        (a, b) => b - a
      )
      assert(
        (values[0] + 0.05) / (values[1] + 0.05) >= 4.5,
        `${name}: insufficient contrast`
      )
    }
  }
})
