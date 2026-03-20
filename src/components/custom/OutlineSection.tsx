import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Edit, Sparkle } from "lucide-react";
import { Button } from "../ui/button";
import EditOutlineDialog from "./EditOutlineDialog";

type Outline = {
    slideNo: string;
    slidePoint: string;
    outline: string;
}

function OutlineSection({ loading, outline, handleUpdate }: { loading: boolean, outline: Outline[], handleUpdate: (slideNo: string, slidePoint: string, outline: string) => void }) {
    return (
        <div className="flex flex-col items-center justify-center w-full px-6 py-3 bg-white mt-8 space-y-4">
            <h2 className="text-2xl font-semibold">Slide Outline</h2>
            <p className="text-lg text-gray-500">Based on your topic, here's the outline for your presentation:</p>
            {loading &&
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((item, index) => (
                        <Skeleton key={index} className="w-[1000px] h-[100px] rounded-lg" />
                    ))}
                </div>
            }
            <div className="flex flex-col items-center justify-center w-full px-6 py-3 bg-white mt-8 space-y-4 mb-20">
                {outline?.map((item, index) => (
                    <div key={index} className="flex flex-col items-center justify-center w-full px-6 py-3 bg-white mt-8 space-y-4 border-2 border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between w-full">
                            <h3 className="text-2xl font-semibold p-4">{item.slideNo}</h3>
                            <div>
                                <h2 className="text-xl font-semibold">{item.slidePoint}</h2>
                                <p className="text-md text-gray-500">{item.outline}</p>
                            </div>
                            <EditOutlineDialog outline={item} onUpdate={(slideNo: string, slidePoint: string, outlineText: string) => {
                                handleUpdate(slideNo, slidePoint, outlineText);
                            }}>
                                <Button variant={"ghost"} size={"icon"}>
                                    <Edit />
                                </Button>
                            </EditOutlineDialog>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default OutlineSection;
