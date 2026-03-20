import React, { useState } from "react";
import ProfessionalBlue from "../../assets/ProfessionalBlue.png";
import MinimalWhite from "../../assets/MinimalWhite.png";
import ModernGradient from "../../assets/ModernGradient.png";
import ElegantDark from "../../assets/ElegantDark.png";
import CreativePastel from "../../assets/CreativePastel.png";
import StartupPitch from "../../assets/StartupPitch.png";
import FuturisticNeon from "../../assets/FutureNeon.png";
import InfographicStyle from "../../assets/InfographicStyle.png";

const SLIDE_STYLES = [
    {
        "styleName": "Professional Blue 💼",
        "colors": {
            "primary": "#0A66C2",
            "secondary": "#1C1C1C",
            "accent": "#E8F0FE",
            "background": "#FFFFFF",
            "gradient": "linear-gradient(135deg, #0A66C2, #E8F0FE)"
        },
        "designGuide": "🧠 Create a professional corporate-style presentation with blue and white tones, modern sans-serif fonts, clean layout, and minimal icons. Use subtle gradients and geometric backgrounds for a trustworthy business feel.",
        "icon": "Briefcase",
        "bannerImage": ProfessionalBlue
    },
    {
        "styleName": "Minimal White ⚪",
        "colors": {
            "primary": "#1C1C1C",
            "secondary": "#AAAAAA",
            "accent": "#EDEDED",
            "background": "#FFFFFF",
            "gradient": "linear-gradient(135deg, #FFFFFF, #EDEDED)"
        },
        "designGuide": "🧠 Generate a minimalist slide deck with white backgrounds, black text, and light grey accents. Keep layouts clean, use lots of whitespace, and apply simple typography for a calm, elegant aesthetic.",
        "icon": "Square",
        "bannerImage": MinimalWhite
    },
    {
        "styleName": "Modern Gradient 🌈",
        "colors": {
            "primary": "#8A2BE2",
            "secondary": "#00C9FF",
            "accent": "#92FE9D",
            "background": "#FFFFFF",
            "gradient": "linear-gradient(135deg, #8A2BE2, #00C9FF, #92FE9D)"
        },
        "designGuide": "🧠 Design a modern gradient-style PPT with vibrant gradient backgrounds, glassmorphism overlays, and smooth transitions. Use modern typography and bright gradients for an innovative, tech-savvy vibe.",
        "icon": "Sparkles",
        "bannerImage": ModernGradient
    },
    {
        "styleName": "Elegant Dark 🖤",
        "colors": {
            "primary": "#0D0D0D",
            "secondary": "#1F1F1F",
            "accent": "#FFD700",
            "background": "#0D0D0D",
            "gradient": "linear-gradient(135deg, #0D0D0D, #1F1F1F)"
        },
        "designGuide": "🧠 Create a luxury-style dark presentation with black and gold accents, serif fonts, and subtle lighting effects. Keep it premium, cinematic, and elegant.",
        "icon": "Star",
        "bannerImage": ElegantDark
    },
    {
        "styleName": "Creative Pastel 🎨",
        "colors": {
            "primary": "#F6D6FF",
            "secondary": "#A0E7E5",
            "accent": "#B4F8C8",
            "background": "#FFFFFF",
            "gradient": "linear-gradient(135deg, #F6D6FF, #A0E7E5, #B4F8C8)"
        },
        "designGuide": "🧠 Build a creative pastel-style presentation with soft tones, rounded shapes, and hand-drawn illustrations. Ideal for design portfolios or fun workshops.",
        "icon": "Palette",
        "bannerImage": CreativePastel
    },
    {
        "styleName": "Startup Pitch 🚀",
        "colors": {
            "primary": "#0052CC",
            "secondary": "#36B37E",
            "accent": "#172B4D",
            "background": "#FFFFFF",
            "gradient": "linear-gradient(135deg, #0052CC, #36B37E)"
        },
        "designGuide": "🧠 Design a sleek startup pitch deck with blue-green tones, bold headings, clean data charts, and a clear problem-solution layout. Keep slides dynamic and investor-friendly.",
        "icon": "Rocket",
        "bannerImage": StartupPitch
    },
    {
        "styleName": "Futuristic Neon ⚡",
        "colors": {
            "primary": "#00FFFF",
            "secondary": "#FF00FF",
            "accent": "#0A0A0A",
            "background": "#1A1A1A",
            "gradient": "linear-gradient(135deg, #00FFFF, #FF00FF)"
        },
        "designGuide": "🧠 Generate a futuristic neon-style PPT with glowing text, cyberpunk colors, and dark glass backgrounds. Use modern sans-serif fonts and motion-inspired visuals.",
        "icon": "Zap",
        "bannerImage": FuturisticNeon
    },
    {
        "styleName": "Infographic Style 📊",
        "colors": {
            "primary": "#007AFF",
            "secondary": "#FF9500",
            "accent": "#FF3B30",
            "background": "#FFFFFF",
            "gradient": "linear-gradient(135deg, #007AFF, #FF9500, #FF3B30)"
        },
        "designGuide": "🧠 Create an infographic-style presentation using colorful charts, vector icons, and bold data visuals. Focus on clarity, consistency, and engaging flow for data storytelling.",
        "icon": "BarChart",
        "bannerImage": InfographicStyle
    }
];

type props = {
    selectStyle: (value: designStyle) => void
}

type designStyle = {
    styleName: string;
    colors: any;
    designGuide: string;
    icon: string;
    bannerImage: string;
}

function SlidesStyles({ selectStyle }: props) {
    const [selectedStyle, setSelectedStyle] = useState<string>("");
    return (
        <div>
            <div className="flex flex-col items-center justify-center w-full px-6 py-3 bg-white mt-8 space-y-4 ">
                <h2 className="text-2xl font-semibold">Select Slides Styles</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SLIDE_STYLES.map((style, index) => (
                    <div key={index} className={`bg-white rounded-lg shadow-md p-4 cursor-pointer hover:scale-105 transition-all duration-300 ${selectedStyle === style.styleName ? "border-2 border-blue-500" : ""}`}
                        onClick={() => { setSelectedStyle(style.styleName); selectStyle(style) }}
                    >
                        <img src={style.bannerImage} alt={style.styleName} className="w-full h-38 object-cover rounded-lg mb-4 hover:scale-105 transition-all duration-300" />
                        <h3 className="text-sm font-bold mb-2">{style.styleName}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SlidesStyles;
