import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowUpRight, Loader2, Sparkles, X } from 'lucide-react';
import { useState } from 'react'

type Props = {
    position: { x: number; y: number } | null;
    onClose: () => void;
    loading: boolean;
    handleAiChange: (value: string) => void;
}

function FloatingActionTool({ position, onClose, loading, handleAiChange }: Props) {
    const [userAiPrompt, setUserAiPrompt] = useState<string>("")

    if (!position) return null;

    return (
        <div className="fixed z-50 bg-white p-2 rounded-lg shadow-lg text-black border border-gray-200 flex items-center gap-2"
            style={{ top: position.y, left: position.x, transform: "translate(-50%, 8px)" }}>
            <div className="flex items-center gap-2">
                <Sparkles className="text-blue-500 h-4 w-4" />
                <input
                    type="text"
                    className="border border-gray-200 rounded-lg p-2 text-sm outline-none"
                    placeholder="Edit with AI..."
                    value={userAiPrompt}
                    onChange={(e) => setUserAiPrompt(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && userAiPrompt) {
                            handleAiChange(userAiPrompt);
                            setUserAiPrompt("");
                        }
                    }}
                    disabled={loading}
                    autoFocus
                />
                {userAiPrompt && (
                    <Button variant={"ghost"} size={"icon-sm"} onClick={() => { handleAiChange(userAiPrompt); setUserAiPrompt("") }}>
                        <ArrowUpRight className="text-blue-500 h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator orientation="vertical" className='h-4' />
            {loading && <Loader2 className="text-blue-500 h-4 w-4 animate-spin" />}
            {!loading && (
                <Button variant={"ghost"} size={"icon-sm"} onClick={onClose}>
                    <X />
                </Button>
            )}
        </div>
    )
}

export default FloatingActionTool
