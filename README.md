# DWP Consulting, LLC

A responsive two-page consulting website, built with HTML, CSS and JavaScript. Pages: homepage (`/`) and content library (`/library/`). Includes animated advisor coordination diagram, four-stage checkup process, scroll reveals, reduced-motion support, hero video with pause control, and mobile navigation.

## Preview

Run `npm ci` and `npm run dev`. Open the address printed by Vite. Use `npm run build` for validation. The build validates the static site and copies production files into `dist/`.

## GitHub → Netlify

1. Add the project files to the intended GitHub repository (exclude `node_modules`).
2. In Netlify, import that GitHub repository.
3. Use build command `npm run build` and publish directory `dist` (configured in `netlify.toml`).
4. Connect the domain in Netlify after reviewing the launch items below.

## Launch items requiring owner input

- `config.js`: replace `bookingUrl` with the approved DWP Consulting booking calendar. It currently goes to the existing Dynasty contact page; it does not reserve a time.
- Set `newsletterUrl` to the exact LinkedIn newsletter URL. Until supplied, the CTA opens an honest notice and links to the verified Dynasty LinkedIn company page.
- Add verified social profiles to `socialLinks` in `config.js`. Only the verified LinkedIn company page is currently included; other channels have not been invented.
- Supply approved past articles/videos to populate the content library. The current library links to real Dynasty planning, FAQ and LinkedIn resources; it does not present invented articles as past publications.
- Confirm the mission wording. The original brief's mission sentence was incomplete; this version uses a proposed mission focused on clarity, coordination and purpose.
- Confirm the final business disclosures and scope of services for DWP Consulting. The separate Dynasty advisory business's licenses, awards, testimonials and registration disclosures have not been represented as DWP Consulting credentials.

## Assets

- `assets/logo.png`: 1254px AI-cleaned version of the supplied logo. Inspect against original before brand approval; generative reconstruction is not a vector tracing.
- Hero video: Pexels clip 7584599, already embedded in the supplied Dynasty reference website. Source: https://videos.pexels.com/video-files/7584599/7584599-sd_960_506_25fps.mp4 . Local optimized excerpt, no audio. Confirm continued use is appropriate for this extension brand.
- Fonts: DM Sans and Manrope via Google Fonts, with local system fallbacks.

## Validation

`npm run build` checks the two routes and all local links/assets. `node --check app.js` checks script syntax. Visual and interaction checks are recorded in DELIVERY.md.
