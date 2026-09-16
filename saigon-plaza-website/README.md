# Saigon Plaza - Project Showcase

Static portfolio showcase for **Saigon Plaza**, an Unreal Engine 5 FPS/world-build project
rooted in Little Saigon-inspired reference, Blender asset reconstruction, Unreal import
verification, animation direction, and first-person interaction evidence.

## Stack (modern, zero-build)
- **HTML5** — semantic, progressive enhancement, works without JS.
- **CSS** — custom properties, CSS Grid/Flex, responsive, no framework.
- **JavaScript** — ES modules, WebGL canvas hero, IntersectionObserver reveals, dark/light toggle.
- **Assets** - structured under `assets/`, with current showcase renders copied into `assets/images/showcase/`.

## Layout
```
saigon-plaza-website/
├── index.html          # entry page
├── css/                # stylesheets
├── js/                 # ES modules (hero, nav, reveals)
├── assets/
│   ├── images/         # static imagery / art
│   ├── videos/         # trailers, b-roll
│   ├── audio/          # SFX / music
│   └── fonts/          # webfonts
└── README.md
```

## Run
No build step. Open `index.html` directly, or serve locally:
```bash
python3 -m http.server 8000 --directory saigon-plaza-website
# then visit http://localhost:8000
```

## Local visual QA
This project uses project-local Playwright with a pinned Chromium runner. It checks only
the local static page, saves screenshots locally, and does not use a cloud dashboard.

```bash
npm install
npx playwright install chromium
npm run visual:qa
```

Outputs are saved under `artifacts/visual-qa/`.

## Add assets
Drop files into the matching `assets/*` folder. Reference with relative paths
(e.g. `assets/images/logo.svg`, `assets/videos/trailer.mp4`).

## Current showcase media
- `assets/images/showcase/cafe-props-preview.png` - Blender cafe prop batch.
- `assets/images/showcase/urban-props-preview.png` - Blender urban prop batch.
- `assets/images/showcase/cafe-furniture-preview.png` - Photo-inspired cafe furniture batch.
- `assets/images/showcase/fps-pie-smoke.png` - Unreal first-person validation evidence.
