# Section backgrounds

Drop the soft techy background image here. It will be applied behind
the elevated ("grey") sections — HLASM Knowledge and Contact.

Expected file (exact name):

- `tech.jpg`  (or `tech.webp` / `tech.png`)

Guidance for a clean result:

- **Dark and low-contrast.** The section text is light, so a subtle,
  mostly-dark image reads best (we also layer a dark tint over it).
- **Format:** WebP or JPG preferred for photos/gradients; PNG if it has
  sharp lines/transparency. If you use a name other than `tech.jpg`,
  tell me and I'll update the reference in the CSS.
- **Size:** ~1600–2400px wide is plenty; keep it under ~400 KB so the
  page stays fast.
- **Tileable vs full-bleed:** if the texture is seamless/repeating, say
  so and I'll `background-repeat`; otherwise I'll cover-fit it.
- Files in `public/` are copied to the site root at build time, so
  `public/backgrounds/tech.jpg` is served at `/backgrounds/tech.jpg`
  (base path applied automatically).
