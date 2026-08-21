# Arbor Insight - Investor Presentation Deck

Slidev-based web presentation deck for Arbor Insight's US fundraising journey.

## Stack
- **Framework**: [Slidev](https://sli.dev/) (Vue 3 + Vite + Tailwind CSS)
- **Deployment**: Cloudflare Pages / Cloudflare Tunnel
- **Exports**: PDF (via Playwright), PPTX, PNG per slide

## Getting Started

### Local Development
```bash
npm install
npm run dev
```
Navigates to `http://localhost:3030`. Presenter mode is available at `http://localhost:3030/presenter`.

### Building Static Assets (for Cloudflare Pages)
```bash
npm run build
```
Generates static HTML SPA in `./dist`.

### Exporting Assets for Marketing / Investor Email
```bash
# Export vector PDF for email attachments
npm run export:pdf

# Export PPTX for legacy viewers
npm run export:pptx

# Export high-res PNG images per slide for Figma
npm run export:png
```

## Slide Deck Architecture & Grounded Data
The deck structure is defined in `slides.md` and strictly grounded in Arbor Insight's canonical metrics:
- Techstars Turin 2024 graduate & €300k non-dilutive grant
- 1,200 ha Spain pistachio pilot, 275 ha Loacker hazelnut estates, 14,000-tree Ohio chestnut inventory
- $15/ha/yr ($6/acre) SaaS pricing model + Enterprise Co-Op dashboards ($10k-$20k/yr)
- Sub-10cm thermal CWSI & 1cm RGB resolution with 24-hour turnaround
