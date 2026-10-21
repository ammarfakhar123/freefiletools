# Step-by-Step Vercel Deployment Guide for freefiletools.site

This guide provides clear instructions to deploy **freefiletools.site** to Vercel, connect your custom domain, and configure DNS records.

---

## 1. Push Project to GitHub

1. Open PowerShell / Terminal in your project directory:
   ```bash
   cd "C:\Users\USER 1\.gemini\antigravity\scratch\freefiletools"
   ```
2. Initialize git repository if not already done:
   ```bash
   git init
   git add .
   git commit -m "feat: complete production-ready freefiletools.site"
   ```
3. Create a new private or public repository on GitHub named `freefiletools`.
4. Link and push your code:
   ```bash
   git remote add origin https://github.com/<your-username>/freefiletools.git
   git branch -M main
   git push -u origin main
   ```

---

## 2. Import into Vercel

1. Log into your account at [vercel.com](https://vercel.com).
2. Click **Add New...** -> **Project**.
3. Select your GitHub repository `freefiletools` and click **Import**.
4. Configure Project Settings:
   - **Framework Preset**: Next.js (automatically detected)
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (leave default)
   - **Install Command**: `npm install`
5. Optional Environment Variables:
   - `WEB3FORMS_ACCESS_KEY`: (Optional) Your Web3Forms access key if you wish to use custom API delivery for contact messages to `muhammadammarfakhar@gmal.com`.
6. Click **Deploy**. Vercel will build the project and issue a preview URL (e.g., `https://freefiletools.vercel.app`).

---

## 3. Connect Custom Domain: freefiletools.site

1. In your Vercel Project Dashboard, navigate to **Settings** -> **Domains**.
2. Type in: `freefiletools.site` and click **Add**.
3. Also add: `www.freefiletools.site` (select redirect to `freefiletools.site`).

---

## 4. Configure DNS Records with Domain Registrar

Log into your domain registrar (Namecheap, GoDaddy, Cloudflare, Hostinger, etc.) and open DNS Management for `freefiletools.site`:

| Type | Name / Host | Value / Target | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` (or leave blank) | `76.76.21.21` | Automatic / 300s |
| **CNAME** | `www` | `cname.vercel-dns.com.` | Automatic / 300s |

*Note: If using Cloudflare, set proxy status to **DNS Only** (grey cloud) during initial SSL certificate verification by Vercel.*

Vercel will automatically provision a free Let's Encrypt wildcard SSL certificate within 2-5 minutes once DNS propagates.

---

## 5. Verification Checklist

- [ ] Visit `https://freefiletools.site` in an incognito window.
- [ ] Confirm automatic HTTPS redirection.
- [ ] Confirm all 6 tool pages load with zero layout shift.
- [ ] Submit a test message on `/contact/` and verify delivery to `muhammadammarfakhar@gmal.com`.
- [ ] Check `/sitemap.xml` and `/robots.txt` in your browser.
