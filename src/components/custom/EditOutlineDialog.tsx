import React, { useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function EditOutlineDialog({ children, outline, onUpdate }: any) {
    const [localOutline, setLocalOutline] = useState(outline);
    const [open, setOpen] = useState(false);
    const handleUpdate = () => {
        onUpdate(localOutline?.slideNo, localOutline?.slidePoint, localOutline?.outline);
        setOpen(false);
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Slide Outline</DialogTitle>
                    <DialogDescription>
                        <div className="space-y-2">
                            <label className="text-lg font-semibold">Slide Title</label>
                            <Input placeholder="Enter Slide Title" value={localOutline.slidePoint} onChange={(e) => setLocalOutline({ ...localOutline, slidePoint: e.target.value })} />
                        </div>
                        <div className="mt-4 space-y-2">
                            <label className="text-lg font-semibold">Slide Content</label>
                            <Textarea placeholder="Enter Slide Content" value={localOutline.outline} onChange={(e) => setLocalOutline({ ...localOutline, outline: e.target.value })} />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleUpdate}>Update</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default EditOutlineDialog;
