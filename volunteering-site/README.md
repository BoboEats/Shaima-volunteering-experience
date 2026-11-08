# Shaima Sharaf - Volunteering experience

Open the folder in VS Code, then double-click `index.html` (or right-click > Open with Live Server)
to see it in your browser. Edit, save (Ctrl+S), refresh.

## Add / change experiences  ->  `experiences.js`
Copy a `{ ... },` block, paste it, change year / title / body. The page sorts newest-first automatically.

## Change colours  ->  top of `style.css` (section 1)
Each colour is one line, e.g. `--color-accent: #E67A52;`. Change the code and everything updates.
Tip: in VS Code, click the little colour square next to a code to pick visually.

## Change fonts  (2 steps)
1. Go to https://fonts.google.com, pick a font, click "Get font" > "Get embed code" > the `<link>` option,
   and copy the font family part, e.g. `family=Lora:wght@500;700`.
   Paste it into the long `<link href="https://fonts.googleapis.com/css2?...">` line in `index.html`,
   separated from the others with `&`.
2. In `style.css` section 2, change the name, e.g. `--font-display: "Lora", serif;`

The four font slots: `--font-display` (English serif), `--font-body` (English sans),
`--font-ar-display` (Arabic serif), `--font-ar-body` (Arabic sans).
Arabic fonts on Google Fonts: Amiri, Noto Naskh Arabic, Scheherazade New (serif); Cairo, Tajawal, IBM Plex Sans Arabic (sans).

## Change the title / Arabic title  ->  `index.html` (the `<header class="title">` block)
## Make Arabic look bigger/smaller  ->  `--ar-scale-display` and `--ar-scale-body` in `style.css`
## Remove the terrazzo strip  ->  delete the `<div class="terrazzo">` block in `index.html`
