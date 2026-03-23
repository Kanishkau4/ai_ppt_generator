import { useEffect, useRef, useState } from 'react'
import { GeminiModel } from '../../../config/FirebaseConfig';
import FloatingActionTool from './FloatingActionTool';


const HTML_DEFAULT = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Slide</title>
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Custom Tailwind Config for Colors -->
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {colorCodes},
        backgroundImage: {
          gradient: 'linear-gradient(90deg, #6366F1 0%, #10B981 100%)',
        },
      },
    },
  };
</script>
  <!-- Flowbite CSS & JS -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
  <!-- Font Awesome Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <!-- Chart.js -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <!-- AOS -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
  <!-- GSAP -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <!-- Swiper.js -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css" />
  <script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>
</head>
{code}
</html>
`

type Props = {
    slide: { code: string };
    colors: any;
    setUpdateSlider: (html: string) => void;
}

function SlidesFrame({ slide, colors, setUpdateSlider }: Props) {
    const FINAL_CODE = HTML_DEFAULT
        .replace("{colorCodes}", JSON.stringify(colors ?? {}))
        .replace("{code}", slide?.code ?? "");

    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [loading, setLoading] = useState(false);
    // Store the selected element reference — persists across FloatingActionTool usage
    const selectedElRef = useRef<HTMLElement | null>(null);
    // Store card position — null means FloatingActionTool is closed
    const [cardPosition, setCardPosition] = useState<{ x: number, y: number } | null>(null);
    // Track if FloatingActionTool is open so blur doesn't trigger re-save
    const isToolOpenRef = useRef(false);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        const handleLoad = () => {
            const iframeDoc = iframe.contentDocument;
            if (!iframeDoc?.body) return;

            // Reset selection state when iframe reloads
            selectedElRef.current = null;
            isToolOpenRef.current = false;

            let hoverEl: HTMLElement | null = null;
            let selectedEl: HTMLElement | null = null;

            const handleMouseOver = (e: MouseEvent) => {
                if (selectedEl) return;
                const target = e.target as HTMLElement;
                if (hoverEl && hoverEl !== target) hoverEl.style.outline = "";
                hoverEl = target;
                hoverEl.style.outline = "2px dotted #3b82f6";
            };

            const handleMouseOut = () => {
                if (selectedEl) return;
                if (hoverEl) {
                    hoverEl.style.outline = "";
                    hoverEl = null;
                }
            };

            const handleClick = (e: MouseEvent) => {
                e.stopPropagation();
                const target = e.target as HTMLElement;

                // Deselect and save previous element on explicit switch
                if (selectedEl && selectedEl !== target) {
                    selectedEl.style.outline = '';
                    selectedEl.removeAttribute('contenteditable');
                    // Save inline text edits when switching elements (not on blur to avoid re-render loops)
                    const currentCode = iframe.contentDocument?.body?.innerHTML;
                    if (currentCode) {
                        setUpdateSlider(currentCode);
                    }
                }

                selectedEl = target;
                selectedElRef.current = target;
                selectedEl.style.outline = "2px solid #3b82f6";
                selectedEl.setAttribute("contenteditable", "true");
                selectedEl.focus();

                // Calculate position for FloatingActionTool (using viewport coords for fixed positioning)
                const rect = target.getBoundingClientRect();
                const iframeRect = iframe.getBoundingClientRect();
                const x = iframeRect.left + rect.left + rect.width / 2;
                const y = iframeRect.top + rect.bottom + 8;

                setCardPosition({ x, y });
                isToolOpenRef.current = true;
            };

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === "Escape" && selectedEl) {
                    selectedEl.style.outline = "";
                    selectedEl.removeAttribute("contenteditable");
                    // Save final text edits on Escape
                    const currentCode = iframe.contentDocument?.body?.innerHTML;
                    if (currentCode) setUpdateSlider(currentCode);
                    selectedEl = null;
                    selectedElRef.current = null;
                    isToolOpenRef.current = false;
                    setCardPosition(null);
                }
            };

            iframeDoc.body.addEventListener("mouseover", handleMouseOver);
            iframeDoc.body.addEventListener("mouseout", handleMouseOut);
            iframeDoc.body.addEventListener("click", handleClick);
            iframeDoc.body.addEventListener("keydown", handleKeyDown);

            (iframe as any)._cleanup = () => {
                iframeDoc.body?.removeEventListener("mouseover", handleMouseOver);
                iframeDoc.body?.removeEventListener("mouseout", handleMouseOut);
                iframeDoc.body?.removeEventListener("click", handleClick);
                iframeDoc.body?.removeEventListener("keydown", handleKeyDown);
            };
        };

        iframe.addEventListener("load", handleLoad);

        const iframeDoc = iframe.contentDocument;
        if (iframeDoc) {
            iframeDoc.open();
            iframeDoc.write(FINAL_CODE);
            iframeDoc.close();
        }

        return () => {
            iframe.removeEventListener("load", handleLoad);
            if ((iframe as any)._cleanup) {
                (iframe as any)._cleanup();
            }
        };
    }, [slide?.code]);

    const handleAiSectionChange = async (userAiPrompt: string) => {
        setLoading(true);

        // Read the ref at the moment of the AI call — must still be valid since we
        // don't call setUpdateSlider on blur (which would re-render and reset the iframe)
        const selectedEl = selectedElRef.current;
        const iframe = iframeRef.current;

        if (!selectedEl || !iframe) {
            console.warn("No element selected for AI edit");
            setLoading(false);
            setCardPosition(null);
            return;
        }

        const oldHTML = selectedEl.outerHTML;

        const prompt = `
Regenerate or rewrite the following HTML element based on this user instruction.
If user asked to change or regenerate an image, use ImageKit:
'https://ik.imagekit.io/ikmedia/ik-genimg-prompt-{imagePrompt}/{altImageName}.jpg'
Replace {imagePrompt} with a relevant image prompt and {altImageName} with a descriptive filename.
If user wants image transformations (crop, remove background, scale), add: ?tr=fo-auto,<transformation>

User Instruction: "${userAiPrompt}"

Original HTML element:
${oldHTML}

Return ONLY the raw HTML element with no markdown code fences (no \`\`\`html or \`\`\`).
`;

        try {
            const result = await GeminiModel.generateContent(prompt);
            const raw = (await result.response.text()).trim();
            const newHTML = raw
                .replace(/```html/gi, "")
                .replace(/```/g, "")
                .trim();

            const tempDiv = iframe.contentDocument?.createElement("div");
            if (tempDiv) {
                tempDiv.innerHTML = newHTML;
                const newNode = tempDiv.firstElementChild;

                if (newNode && selectedEl.parentNode) {
                    selectedEl.parentNode.replaceChild(newNode, selectedEl);
                    selectedElRef.current = newNode as HTMLElement;
                    console.log("✅ Element replaced successfully");

                    const updatedCode = iframe.contentDocument?.body?.innerHTML || newHTML;
                    setUpdateSlider(updatedCode);
                }
            }
        } catch (err) {
            console.error("AI generation failed:", err);
        }

        setLoading(false);
        setCardPosition(null);
        isToolOpenRef.current = false;
    }

    return (
        <div className='mb-5 relative'>
            <iframe
                ref={iframeRef}
                className="w-[800px] h-[500px] border-0 rounded-2xl shadow-sm"
                sandbox="allow-scripts allow-same-origin allow-modals allow-forms allow-popups"
            />

            <FloatingActionTool
                position={cardPosition}
                onClose={() => {
                    setCardPosition(null);
                    isToolOpenRef.current = false;
                }}
                loading={loading}
                handleAiChange={(value: string) => handleAiSectionChange(value)}
            />
        </div>
    );
}

export default SlidesFrame