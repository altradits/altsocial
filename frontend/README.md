# Altradits | Precision Social Media Automation

Live life beyond your desk. We'll handle the precision.

Altradits is a frontend-first social media automation dashboard that allows you to compose, tailor, and schedule posts across multiple platforms (LinkedIn, Twitter, Facebook, Instagram, Dev.to, and Bitcoin Blogs) from a single unified interface.

## 🚀 Features

- **Unified Composer:** Write once, preview everywhere.
- **AI Image Analysis:** Upload an image and let Google Gemini generate a captivating, platform-ready caption.
- **Live Previews:** See exactly how your post will look on LinkedIn, Twitter, Facebook, Instagram, Dev.to, and Bitcoin Blogs before you publish.
- **Local Storage:** Drafts and scheduled posts are saved locally in your browser for a seamless demo experience.
- **Lightning Payments:** Integrated Bitcoin Lightning (LNURL) payment flow for subscriptions.

## 🛠️ Tech Stack

- **React 18** (ES Modules, no build step required)
- **Tailwind CSS** (via CDN)
- **Lucide React** (Icons)
- **Google Gemini API** (`@google/genai`)

## 💻 Running Locally

Because this project uses native ES Modules and Import Maps, it requires **zero build tools** (no Webpack, no Vite, no `npm install`).

1. Clone the repository:
   ```bash
   git clone https://github.com/altradits/altsocial.git
   cd altsocial
   ```
2. Serve the directory using any local web server. For example, using Python:
   ```bash
   python3 -m http.server 8000
   ```
   Or using Node.js `serve`:
   ```bash
   npx serve .
   ```
3. Open `http://localhost:8000` in your browser.

## 🌐 Deployment

This project is ready to be deployed instantly to Vercel, Netlify, or GitHub Pages as a static site.

**To deploy on Vercel:**
1. Go to [Vercel](https://vercel.com/new)
2. Import this repository.
3. Leave the Build Command and Output Directory **blank**.
4. Click **Deploy**.

## 🔑 API Keys (For AI Features)

To enable the AI Image Analysis feature, you need a Google Gemini API key.
In a production environment, this should be handled via a backend server to keep the key secure. For local testing, ensure your environment provides `process.env.API_KEY`.
