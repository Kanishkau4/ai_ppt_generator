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
        <div className="fixed z-50 bg-white dark:bg-zinc-900 p-2 rounded-xl shadow-2xl text-black dark:text-white border border-gray-200 dark:border-zinc-700 flex items-center gap-2"
            style={{ top: position.y, left: position.x, transform: "translate(-50%, 8px)" }}>
            <div className="flex items-center gap-2">
                <Sparkles className="text-purple-500 h-4 w-4 shrink-0" />
                <input
                    type="text"
                    className="border border-gray-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white rounded-lg p-2 text-sm outline-none w-56"
                    placeholder={loading ? "Generating..." : "Describe your edit..."}
                    value={userAiPrompt}
                    onChange={(e) => setUserAiPrompt(e.target.value)}
                    onKeyDown={(e) => {
                        e.stopPropagation();
                        if (e.key === 'Enter' && userAiPrompt && !loading) {
                            handleAiChange(userAiPrompt);
                            setUserAiPrompt("");
                        }
                    }}
                    disabled={loading}
                    autoFocus
                />
                {userAiPrompt && !loading && (
                    <Button variant={"ghost"} size={"icon-sm"} onClick={() => { handleAiChange(userAiPrompt); setUserAiPrompt("") }}>
                        <ArrowUpRight className="text-purple-500 h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator orientation="vertical" className='h-4' />
            {loading && <Loader2 className="text-purple-500 h-4 w-4 animate-spin" />}
            {!loading && (
                <Button variant={"ghost"} size={"icon-sm"} onClick={onClose}>
                    <X />
                </Button>
            )}
        </div>
    )
}

export default FloatingActionTool
