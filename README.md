# Dylan Ashley Alves — Portfolio & 3D World

My personal portfolio, plus a 3D open world you can ride a bike through to explore my work.

**🌐 Live site:** https://dylanashleyalves.github.io/dylan-portfolio/
**🚲 3D world:** https://dylanashleyalves.github.io/dylan-portfolio/world.html

![Riding through the 3D portfolio world](images/projects/world.jpg)

> **Status: beta.** The world is still growing, and feedback is very welcome.

---

## About me

I'm a Computer Engineering graduate from Temasek Polytechnic (Class of 2026). I build practical apps powered by AI, and I love helping others understand how they work. I'm serving National Service until 2028, and I'm open to software and AI roles after that, so I'm happy to connect now.

[LinkedIn](https://www.linkedin.com/in/dylan-alves-757831281)

---

## What's inside

### The portfolio site (`index.html`)

- Projects with demo videos and screenshot slideshows
- Career path, achievements, and verifiable certifications
- A "Life" gallery for darts, fitness, and more
- A working contact form

### The 3D world (`world.html`)

A night-time open world built with Three.js that runs entirely in the browser, with no installs.

- **Ride and explore:** a bike with steering, leaning, pedalling animation, and a headlight. Each glowing landmark opens a piece of my portfolio.
- **Passport:** stamp all 9 landmarks to complete it.
- **Collectibles and laps:** 20 hidden orbs and a lap timer with a saved best time.
- **Football:** push the ball into either goal on a floodlit pitch.
- **Darts:** a full regulation board with Practice, 301 / 501 / 701 (bust rules, PPD), and Cricket (MPR).
- **Stickers:** an emote wheel of custom stickers, unlocked by playing.
- **Live multiplayer:** see other visitors riding in real time, with optional name tags, shared bells, and stickers.
- **Music:** three original, generative background tracks created live in the browser.
- **Settings:** a retro-style menu for graphics quality, fullscreen, sound, music, camera distance, minimap, reduced motion, and saved data.
- **Works on phones** with on-screen controls.

---

## Built with

| Area | Tools |
|---|---|
| Site | HTML, CSS, JavaScript, Tailwind CSS |
| 3D world | Three.js (WebGL), Web Audio API |
| Multiplayer | Supabase Realtime (presence + broadcast) |
| Forms | Formspree |
| Analytics | GoatCounter (privacy-friendly, no cookies) |
| Hosting | GitHub Pages |

---

## Project structure

```
dylan-portfolio/
├── index.html          # Portfolio homepage
├── world.html          # 3D world (styles and game code in one file)
├── css/styles.css      # Custom styles for the homepage
├── js/main.js          # Homepage interactions, gallery, contact form
├── images/             # Portrait, project screenshots, gallery photos, stickers
└── videos/             # Project demo videos
```

---

## Running it locally

No build step is needed.

1. Clone the repo:
   ```bash
   git clone https://github.com/dylanashleyalves/dylan-portfolio.git
   ```
2. Open the folder in VS Code and start it with the **Live Server** extension (right-click `index.html` → *Open with Live Server*).

The 3D world loads Three.js from a CDN, so it needs an internet connection. Opening the files directly (double-clicking) may block some features, so use a local server.

### Configuration

These values are set near the top of the relevant files:

- **GoatCounter:** the `data-goatcounter` script tag in `index.html` and `world.html`
- **Contact form:** `CONTACT_FORM_URL` in `js/main.js` (Formspree)
- **World guestbook:** `GUESTBOOK_URL` in `world.html` (Formspree)
- **Multiplayer:** `SUPABASE_URL` and `SUPABASE_KEY` in `world.html` 

---

## Credits

- 3D engine: [Three.js](https://threejs.org/)
- Fonts: [JetBrains Mono](https://www.jetbrains.com/lp/mono/) and [Silkscreen](https://fonts.google.com/specimen/Silkscreen)
- Background music is generated live in code, so it's original to this project.

## License

The code is free to read and learn from. The photos, videos, stickers, and personal content are mine, so please don't reuse them without permission.
