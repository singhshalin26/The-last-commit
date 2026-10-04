# THE LAST COMMIT

A cyberpunk, terminal-themed landing page for a fictional 24-hour hackathon. Built with plain HTML, CSS and JavaScript. No build step.

## Features
- Animated hero terminal, glitch heading, particle background, mouse glow
- Working countdown, scroll-reveal, animated counters, scroll-driven progress line
- Interactive terminal (`help`, `git status`, `git log`, `git commit -m "msg"`...)
- Live-updating fake leaderboard and server status
- Accessible FAQ accordion, rules as expandable cards, mobile menu
- Easter egg: try the Konami code (Up Up Down Down Left Right Left Right B A)

## Run locally
1. Open the folder in VS Code (`File > Open Folder`).
2. Install the **Live Server** extension.
3. Right-click `index.html` and choose **Open with Live Server**.

(You can also just double-click `index.html`.)

## Customize
| What | Where |
|------|-------|
| Hackathon date | `script.js` > `CONFIG.eventDate` (format `YYYY-MM-DDTHH:MM:SS+05:30`) |
| Prize amounts | `script.js` > `CONFIG.prizes` |
| Schedule, rules, FAQ, teams, stats | `script.js` > `CONFIG` |
| Date and location text in the hero | `index.html`, the line with class `meta` |
| Colors | `style.css`, the `:root` block at the top |
| Social links | `index.html`, the footer |

## Deploy
**GitHub Pages:** push to GitHub, then Settings > Pages > Source: `main` branch, `/ (root)`.
**Vercel:** import the repo at vercel.com/new and click Deploy (no settings needed).

## Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```
