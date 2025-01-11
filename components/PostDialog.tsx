import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import ProfilePhoto from "./shared/ProfilePhoto";
import { Textarea } from "./ui/textarea";
import { Images } from "lucide-react";
import { readFileAsDataUrl } from "@/lib/utils"; // Ensure this utility function exists
import Image from "next/image";

export function PostDialog({
    setOpen,
    open,
    src,
}: {
    setOpen: (value: boolean) => void;
    open: boolean;
    src: string;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<string>("");

    const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const dataUrl = await readFileAsDataUrl(file);
                setSelectedFile(dataUrl);
            } catch (error) {
                console.error("Error reading file:", error);
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                onInteractOutside={() => setOpen(false)}
                className="sm:max-w-[425px]"
            >
                <DialogHeader>
                    <DialogTitle className="flex gap-2">
                        <ProfilePhoto src={src} />
                        <div>
                            <h1>Haseeb MernStack</h1>
                            <p className="text-xs">Post to anyone</p>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <form>
                    <div className="flex flex-col">
                        <Textarea
                            id="name"
                            name="inputText"
                            className="border-none text-lg focus-visible:ring-0"
                            placeholder="Type your message here."
                        />
                        <div className="my-4">
                            {selectedFile && (
                                <Image
                                    src={selectedFile}
                                    alt="preview image"
                                    width={400}
                                    height={400}
                                    className="rounded-lg"
                                />
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <div className="flex items-center gap-4">
                            <input
                                ref={inputRef}
                                onChange={fileChangeHandler}
                                type="file"
                                name="image"
                                className="hidden"
                                accept="image/*"
                            />
                            <Button type="submit">Post</Button>
                            <Button
                                className="gap-2"
                                onClick={() => inputRef?.current?.click()}
                                variant="ghost"
                            >
                                <Images className="text-blue-500" />
                                <p>Media</p>
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
