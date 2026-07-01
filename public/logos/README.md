# Company logos

Drop the employer logo files here. They are referenced by
`src/data/content.js` (`profile.stats` → `logos`) and rendered in the
Profile section.

Expected files (exact names):

- `ibm.svg`
- `citigroup.svg`

Notes:

- SVG preferred (crisp at any size); PNG works too — if you use PNG,
  update the extensions in `src/data/content.js`.
- Logos render at 24px tall on a dark card, so a **white / light**
  variant reads best.
- Files placed in `public/` are copied to the site root at build time,
  so `public/logos/ibm.svg` is served at `/logos/ibm.svg`
  (with the configured base path applied automatically).
- Until the files exist, the logo `<img>`s hide themselves on error,
  so the layout stays clean.
