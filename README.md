# mave — María García · portfolio

Hand-built editorial portfolio. No build step, no dependencies — plain HTML / CSS / JS.

## Pages
- `index.html` — home (hero · Hi! intro · A quick look · work · contact)
- `about.html` — full about / CV page (skills · experience · education · tools · languages)
- `letstalk.html` — contact page: form (sends to maria.garvelasco@gmail.com) + email / phone / LinkedIn

> **LinkedIn:** update the placeholder URL in `letstalk.html`.
> **Form:** it opens the visitor's email app pre-filled. For instant sending without
> a mail app, paste a Formspree/Getform endpoint into `FORM_ENDPOINT` in `letstalk.html`.

## Run it
Open `index.html` directly in a browser. Or serve locally:
```bash
ruby .claude/serve.rb        # → http://localhost:4599
```
Claude Code preview serves a mirror from `/tmp/mave-site` (its sandbox can't read
`~/Desktop`). After editing the source, refresh it: `bash .claude/sync-preview.sh`

## Colour palette (exact)
| token | hex |
|-------|-----|
| pink  | `#FFE6EE` |
| gray  | `#F2F0F0` |
| red   | `#C21718` |
| white | `#FFFFFF` |
| favicon "ma" | `#E3ACBD` |

Defined once in `:root` at the top of `css/styles.css`. Background is white with a
very subtle grain overlay.

## Type
- **Anaheim** — everything.

## Logo assets
`logo.png` is your textured spray logo. `logo-white.png`, `logo-red.png` and
`logo-pink.png` are recolored versions that **keep the texture** (generated from
your original in `_full/`, mapped to each brand colour, no white border).
`favicon.png` is the "ma" in `#E3ACBD`. The cursor is a small red `#C21718` dot.

## Portfolio — grouped by project
Everything lives in `js/portfolio.js`:
- `PROJECTS` — the collage, grouped by project (matches the `img/proyecto-*` folders).
  Images of the same project stay together, some tilted.
- `STRIP` — the "A quick look" row (one distinct piece per project, no repeats).

To add work: drop the image in its `img/proyecto-*` folder and add an entry.
```js
{ src: "img/proyecto-x/file.jpg", size: "s"|"m"|"l", tilt: -3 }
```

## Images
Photos were downscaled to ~1600px and converted to JPEG for the web. **Your full-size
originals are safe in `img/_full/`** — you can delete that folder anytime (it is not
served and is excluded from the preview sync). `logo.png`, `maria.png` and the
portrait stay lossless PNG (transparency / orientation).

## Interactions
Hero mouse-trail (big, sparse white logos) · scroll-driven horizontal strip ·
per-project parallax · blurred pink watermark logos · reveal-on-scroll · hover states.
All soften on touch and respect `prefers-reduced-motion`.
