import { Skeleton } from "../ui/skeleton";
import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import EditOutlineDialog from "./EditOutlineDialog";

type Outline = {
    slideNo: string;
    slidePoint: string;
    outline: string;
}

function OutlineSection({ loading, outline, handleUpdate }: { loading: boolean, outline: Outline[], handleUpdate: (slideNo: string, slidePoint: string, outline: string) => void }) {
    return (
        <div className="flex flex-col w-full space-y-4">
            {loading &&
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((_, index) => (
                        <Skeleton key={index} className="w-full h-[80px] rounded-xl" />
                    ))}
                </div>
            }
            <div className="flex flex-col w-full space-y-3 pb-20">
                {outline?.map((item, index) => (
                    <div key={index} className="group flex items-center gap-4 w-full px-5 py-4 bg-card border border-border rounded-2xl hover:border-purple-500/40 transition-all duration-200">
                        <div className="h-9 w-9 shrink-0 flex items-center justify-center rounded-lg bg-purple-500/10 text-purple-500 font-bold text-sm">
                            {item.slideNo}
                        </div>
                        <div className="flex-grow min-w-0">
                            <h3 className="font-semibold text-foreground truncate">{item.slidePoint}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">{item.outline}</p>
                        </div>
                        <EditOutlineDialog outline={item} onUpdate={(slideNo: string, slidePoint: string, outlineText: string) => {
                            handleUpdate(slideNo, slidePoint, outlineText);
                        }}>
                            <Button variant="ghost" size="icon" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Edit className="h-4 w-4" />
                            </Button>
                        </EditOutlineDialog>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OutlineSection;
