# Performance-module-

Premium-style **KSU Performance WebUI** with complete multi-page modules:

- `index.html` — Dashboard + smart floating panel
- `module-customize.html` — Module customization
- `module-profiles.html` — Profile manager
- `module-spoof.html` — Spoof engine page
- `module-lock.html` — CPU/GPU lock page

Shared assets:

- `assets/css/app.css`
- `assets/css/module-customize.css`
- `assets/js/app.js`

## Run locally

```bash
python3 -m http.server 4173
```

Then open: `http://localhost:4173`

> Note: This is a front-end UI prototype and does not directly change real hardware clocks.
