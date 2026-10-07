import assert from "node:assert/strict"
import { readFile, readdir } from "node:fs/promises"
import { join } from "node:path"

const root = "dist/client"
const servedOrigin = process.argv[2]
async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? files(join(directory, entry.name))
          : join(directory, entry.name)
      )
    )
  ).flat()
}
function metadata(html, name) {
  for (const tag of html.matchAll(/<meta\b[^>]*>/g)) {
    const attrs = Object.fromEntries(
      [
        ...tag[0].matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)
      ].map((match) => [match[1], match[2] ?? match[3] ?? match[4]])
    )
    if (attrs.property === name || attrs.name === name) return attrs.content
  }
}

const output = await files(root)
const pages = output.filter(
  (path) => path.endsWith("index.html") && !path.includes("/admin/")
)
let verified = 0
const images = new Set()
for (const page of pages) {
  const html = await readFile(page, "utf8")
  if (page === `${root}/ideas/index.html`) continue // Redirect, no separate share destination.
  const image = metadata(html, "og:image")
  assert(image, `${page}: missing og:image`)
  const url = new URL(image)
  assert.match(
    url.pathname,
    /^\/og\/.+\.(light|dark)\.[a-f0-9]{12}\.png$/,
    `${page}: unversioned or generic image`
  )
  assert.equal(
    metadata(html, "twitter:image"),
    image,
    `${page}: Twitter image differs`
  )
  assert.equal(metadata(html, "og:image:width"), "1200")
  assert.equal(metadata(html, "og:image:height"), "630")
  const bytes = await readFile(join(root, decodeURI(url.pathname)))
  assert.equal(
    bytes.subarray(0, 8).toString("hex"),
    "89504e470d0a1a0a",
    `${page}: invalid PNG`
  )
  assert.equal(bytes.readUInt32BE(16), 1200)
  assert.equal(bytes.readUInt32BE(20), 630)
  assert(bytes.length < 1_000_000, `${page}: image exceeds 1 MB`)
  images.add(url.pathname)
  if (servedOrigin) {
    const pagePath = `/${page.slice(root.length + 1).replace(/index.html$/, "")}`
    const servedPage = await fetch(new URL(pagePath, servedOrigin))
    assert.equal(servedPage.status, 200, `${pagePath}: served page failed`)
    assert.equal(metadata(await servedPage.text(), "og:image"), image)
    const servedImage = await fetch(new URL(url.pathname, servedOrigin))
    assert.equal(
      servedImage.status,
      200,
      `${url.pathname}: served image failed`
    )
    assert.match(servedImage.headers.get("content-type"), /^image\/png/)
    const servedBytes = Buffer.from(await servedImage.arrayBuffer())
    assert(
      servedBytes.equals(bytes),
      `${url.pathname}: served bytes differ from the build`
    )
  }
  verified++
}
assert(verified > 3, "Missing content pages")
assert.equal(images.size, verified, "Two pages share the same image")
const variants = output.filter((path) =>
  /^dist\/client\/og\/.+\.(light|dark)\.[a-f0-9]{12}\.png$/.test(path)
)
assert.equal(
  variants.length,
  verified * 2,
  "Each page needs both theme variants"
)
for (const selected of images) {
  const prefix = `${root}${selected.replace(/\.(light|dark)\.[a-f0-9]{12}\.png$/, "")}`
  for (const theme of ["light", "dark"]) {
    assert.equal(
      variants.filter((path) => path.startsWith(`${prefix}.${theme}.`)).length,
      1,
      `${prefix}: missing ${theme} variant`
    )
  }
}
for (const variant of variants) {
  const bytes = await readFile(variant)
  assert.equal(bytes.subarray(0, 8).toString("hex"), "89504e470d0a1a0a")
  assert.equal(bytes.readUInt32BE(16), 1200)
  assert.equal(bytes.readUInt32BE(20), 630)
  assert(bytes.length < 1_000_000, `${variant}: image exceeds 1 MB`)
  if (servedOrigin) {
    const response = await fetch(
      new URL(variant.slice(root.length), servedOrigin)
    )
    assert.equal(response.status, 200)
    assert.match(response.headers.get("content-type"), /^image\/png/)
    assert(Buffer.from(await response.arrayBuffer()).equals(bytes))
  }
}
assert(
  !output.some((path) =>
    /entrepreneur-malgre-moi|tann-audio|anais-colors|comite-des-assureurs/.test(
      path
    )
  ),
  "Draft leaked into the public build"
)
if (servedOrigin) {
  for (const path of [
    "/og/inconnu.000000000000.png",
    "/blog/entrepreneur-malgre-moi/"
  ]) {
    assert.equal(
      (await fetch(new URL(path, servedOrigin))).status,
      404,
      `${path}: should be unavailable`
    )
  }
}
console.log(
  `${verified} pages and ${variants.length} light/dark variants verified: distinct versioned OG/Twitter images, valid 1200×630 PNGs, no draft exposure.${servedOrigin ? " HTTP pages/images/404 checks passed." : ""}`
)
