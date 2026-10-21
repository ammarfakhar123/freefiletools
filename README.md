# FreeFileTools.site

> **100% Free, Unlimited Online File Tools: Images, Documents & Vectors**  
> No Signup • No Login • No Watermark • Files Never Leave Your Device

FreeFileTools is a high-performance, client-side web application providing free online utilities for image editing and document processing. Built with Next.js (App Router), TypeScript, and plain CSS (CSS Variables and CSS Modules), it leverages WebAssembly and browser APIs so that **all processing occurs locally in the user's browser**.

---

## 🛠 Available Tools

### Image Tools
1. **[Image Background Remover](/tools/image-background-remover/)**: Browser-based neural network model (`@imgly/background-removal`) isolating foreground people, objects, and products with sub-pixel precision and before/after slider.
2. **[PNG to SVG Converter](/tools/png-to-svg/)**: Vectorizer converting bitmap images into clean, infinitely scalable SVG curves with color count, detail, and smoothing controls.
3. **[SVG to PNG Converter](/tools/svg-to-png/)**: Hardware-accelerated Canvas renderer supporting 1x, 2x retina, 4x ultra HD, custom pixel dimensions, and transparent or custom background fills.

### Document Tools
4. **[PDF to Word (.docx)](/tools/pdf-to-word/)**: Client-side document parser extracting text flow and paragraphs into editable Microsoft Word (.docx) documents.
5. **[Word (.docx) to PDF](/tools/word-to-pdf/)**: Client-side document publisher transforming Word documents into standardized, immutable PDF files.
6. **[Image to PDF](/tools/image-to-pdf/)**: Multi-page PDF compiler supporting multiple JPG, PNG, and WebP photos with reordering, ISO A4 / US Letter page formats, and customizable margin padding.

---

## 🚀 Key Architectural Advantages

- **Zero Server Compute / 100% Free**: By processing files directly in client WebAssembly and HTML5 Canvas, server overhead is virtually zero, allowing the service to remain permanently free without subscriptions or paywalls.
- **Total Device Privacy**: User files never travel across the network to external servers. Ideal for confidential legal contracts, personal photos, and sensitive financial records.
- **Zero CLS / 95+ Lighthouse Score**: Self-hosted fonts (`Outfit` and `Manrope` via `next/font`), zero heavy component kits, clean CSS Modules, and lazy dynamic imports.
- **Modular Central Registry**: All tools, metadata, navigation, related-tool cross links, and schemas are driven from `src/config/tools.ts`. Adding a new tool is just 1 config entry + 1 component.
- **Contact Form with Auto-Forwarding**: Integrated contact form requesting WhatsApp number and message, automatically dispatching to `muhammadammarfakhar@gmal.com`.

---

## 💻 Local Development

```bash
# Clone or navigate to the directory
cd freefiletools

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Building for Production

```bash
# Generate static build
npm run build

# Start production server
npm start
```

---

## 🌐 Deploying to Vercel

See [docs/deployment.md](docs/deployment.md) for full instructions on deploying to Vercel and connecting the domain `freefiletools.site`.
