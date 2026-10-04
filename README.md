# Altradits | Precision Social Media Automation

> **Live Life Beyond Your Desk. We'll Handle the Precision.**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Faltradits%2Faltsocial)
[![Live Demo](https://img.shields.io/badge/Demo-Live%20on%20Vercel-success?style=for-the-badge&logo=vercel)](https://altsocial-one.vercel.app)

🌐 **Live URL:** [https://altsocial-one.vercel.app](https://altsocial-one.vercel.app)

---

## 🌟 Overview

**Altradits** is a modern social media automation platform designed for founders, creators, and marketing professionals. It enables unified composing, tailoring, cross-platform previewing, and scheduling across major social networks and publishing channels.

### Supported Channels
- **LinkedIn** (Professional insights & thought leadership)
- **X / Twitter** (Short-form updates & threads)
- **Instagram** (Visual-first storytelling & hashtags)
- **Facebook** (Community updates & link posts)
- **Dev.to** (Technical articles & developer discussions)
- **Bitcoin Blogs** (Crypto, Lightning Network, & Web3 content)

---

## 🚀 Key Features

- **Unified Composer**: Write once, preview across all social channels in real-time.
- **AI Image & Caption Generation**: Upload visuals and generate platform-optimized captions powered by Google Gemini.
- **Cross-Platform Mock Previews**: See authentic pixel-perfect feeds before hitting publish or scheduling.
- **Drafts & Scheduled Posts**: Full workflow with local management and calendar queue.
- **Lightning Network Integration**: Bitcoin Lightning payment support for automated subscription flows.

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons
- **AI Engine**: Google Gemini API (`@google/genai`)
- **Backend / Proxy**: Node.js & Express (Google Cloud Vertex AI proxy integration)
- **Hosting & CDN**: Deployed on [Vercel](https://altsocial-one.vercel.app)

---

## 💻 Local Development

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

### 1. Clone the repository
```bash
git clone https://github.com/altradits/altsocial.git
cd altsocial
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development servers
```bash
# Run both frontend & backend concurrently:
npm run dev

# Or run frontend only:
npm run dev-frontend
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Production Build & Deployment

### Build Locally
```bash
npm run build
```
The optimized bundle will be generated in `frontend/dist/`.

### Deploy to Vercel
This repository is pre-configured with `vercel.json` for zero-configuration deployments.

```bash
npx vercel --prod
```

Or connect the repository on [Vercel Dashboard](https://vercel.com) using:
- **Build Command**: `npm run build --prefix frontend`
- **Output Directory**: `frontend/dist`

---

## 🔗 Live Application

The production application is live at:
👉 **[https://altsocial-one.vercel.app](https://altsocial-one.vercel.app)**
