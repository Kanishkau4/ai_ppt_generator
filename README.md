

<br />

<h1 align="center">✨ AI PPT Generator</h1>

<p align="center">
  <strong>Turn any idea into a stunning, professional presentation in under 60 seconds — powered by Google Gemini AI.</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-how-it-works">How It Works</a> •
  <a href="#-pricing">Pricing</a> •
  <a href="#-environment-variables">Environment Setup</a>
</p>
<br />
<p align="center">
  <img src="https://img.shields.io/badge/AI%20Powered-Gemini-blueviolet?style=for-the-badge&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</p>

---

## 🚀 Overview

**AI PPT Generator** is a full-stack web application that harnesses the power of **Google Gemini AI** to create professional PowerPoint presentations from a simple text prompt. Describe your topic, pick a style, edit the outline, and generate a polished, export-ready `.pptx` file in under a minute — all without touching a design tool.

---

## 🤔 Why AI PPT Generator?

Creating presentations is often a tedious process of balancing content creation with visual design. AI PPT Generator bridges that gap by:

- ✅ **Eliminating Blank Page Syndrome:** Get a full outline and slide draft in seconds from a single prompt.
- ✅ **Consistent Professionalism:** Every slide follows modern design principles automatically, ensuring your decks always look premium.
- ✅ **Focus on Your Message:** Spend your time perfecting your story and delivery while the AI handles the pixels and layouts.
- ✅ **Enterprise-ready Export:** Export to industry-standard `.pptx` format to keep your workflow flexible across all platforms.

---

## 📸 Demo & Screenshots

<p align="center">
  <img src="ai_ppt_editor_mockup_1774510067965.png" alt="AI PPT Editor Mockup" width="90%" style="border-radius: 12px; border: 1px solid #333; box-shadow: 0 4px 30px rgba(0,0,0,0.3);" />
</p>

<p align="center">
  <em>A glimpse into our sleek, dark-mode editor powered by Gemini AI.</em>
</p>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI Outline Generation** | Gemini AI generates a structured slide-by-slide outline from your prompt |
| 🎨 **Design Style Picker** | Choose from multiple professional design themes before generating |
| ✏️ **Editable Outline** | Review and customize each slide's content before finalizing |
| 📊 **Slide Editor** | Full slide editor with rich layout rendering and drag-and-drop elements |
| 📥 **PPTX Export** | Download your finished presentation as a native `.pptx` file via `pptxgenjs` |
| 🔐 **Auth with Clerk** | Secure sign-up/sign-in with Clerk authentication |
| 💰 **Credit System** | Per-generation credit system with elite plan bypass |
| 📁 **Project Management** | Save, revisit, and manage all your past presentations |
| 🌙 **Dark / Light Mode** | Fully theme-aware UI with smooth mode transitions |
| 📱 **Responsive Design** | Optimized for desktop, tablet, and mobile presentation editing |

---

## 📈 Roadmap

We're constantly evolving! Here's what's hitting the editor soon:

- [ ] **AI Image Suggestions** — Automatically source high-quality Unsplash images for your slides.
- [ ] **Real-time Collaboration** — Multiple users editing the same deck simultaneously.
- [ ] **Voice-to-Slide** — Speak your ideas and watch the deck form in real-time.
- [ ] **Custom Brand Kits** — Upload your own fonts, logos, and color palettes.
- [ ] **Browser Presenter View** — Dedicated notes and timer for live presentations.

---

## ❓ FAQ

**Q: What is AI PPT Generator used for?**
A: Our app is designed to help you create professional, high-quality presentations in seconds. Simply provide a prompt or topic, and our AI will generate content, structure, and design for your slides.

**Q: How is my data secured?**
A: We take security seriously. All your presentations and account data are encrypted and stored securely. We do not use your private data to train our AI models without your explicit permission.

**Q: Can I change my subscription plan later?**
A: Absolutely. You can upgrade or downgrade your plan at any time from your account settings. Changes will be reflected in your next billing cycle.

---

## 🛠 Tech Stack

### Frontend & UI
- **[React 19](https://react.dev/)** — Core UI library
- **[TypeScript 5.9](https://www.typescriptlang.org/)** — Type-safe development
- **[Vite 7](https://vite.dev/)** — Lightning-fast builds
- **[Tailwind CSS 4](https://tailwindcss.com/)** — Modern layout engine
- **[shadcn/ui](https://ui.shadcn.com/)** & **[Radix UI](https://www.radix-ui.com/)** — Composable UI primitives
- **[Motion](https://motion.dev/)** — Advanced UI animations

### Backend & Intelligence
- **[Firebase Firestore](https://firebase.google.com/products/firestore)** — Real-time cloud database
- **[Google Gemini AI](https://ai.google.dev/)** — Generative AI engine
- **[Clerk](https://clerk.com/)** — Authentication & User management

---

## 📁 Project Structure

```bash
ai-ppt-generator/
├── config/                  # API and Service initializations
├── context/                 # Application state (Credits, User)
├── src/
│   ├── components/
│   │   ├── custom/          # Core feature components (Hero, Editor, Outlines)
│   │   └── ui/              # shadcn base components
│   ├── workspace/           # Dashboard and Project routing
│   ├── App.tsx              # Main entry layout
│   └── main.tsx             # ReactDOM entry
└── public/                  # Static assets
```

---

## 🏁 Getting Started

### Prerequisites

- **Node.js** v18+ 
- A **Firebase** project
- A **Google Gemini API** key
- A **Clerk** account

### Setup Steps

1. **Clone & Install**
   ```bash
   git clone https://github.com/your-username/ai-ppt-generator.git
   cd ai-ppt-generator
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file with your credentials (see [Environment Variables](#-environment-variables)).

3. **Run Development**
   ```bash
   npm run dev
   ```

---

## 🔑 Environment Variables

```env
# Clerk
VITE_CLERK_PUBLISHABLE_KEY=pk_...

# Firebase
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...

# Google AI
VITE_GEMINI_API_KEY=...
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ by <strong>Kanishka</strong> • 2026
</p>
