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
import { readFileAsDataUrl } from "@/lib/utils"; // Ensure this utility exists and handles file errors
import Image from "next/image";
import { createPostAction } from "@/lib/serveractions";

interface PostDialogProps {
    setOpen: (value: boolean) => void;
    open: boolean;
    src: string;
}

export function PostDialog({ setOpen, open, src }: PostDialogProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [inputText, setInputText] = useState<string>("");

    // Handle text input changes
    const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(e.target.value);
    };

    // Handle file input changes
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

    // Handle form submission
    const postActionHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            await createPostAction(inputText, selectedFile || "");
            console.log("Post created successfully");
            setInputText("");
            setSelectedFile(null);
            setOpen(false);
        } catch (error) {
            console.error("Error occurred while creating post:", error);
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
                <form onSubmit={postActionHandler}>
                    <div className="flex flex-col">
                        <Textarea
                            id="name"
                            name="inputText"
                            onChange={changeHandler}
                            value={inputText}
                            className="border-none text-lg focus-visible:ring-0"
                            placeholder="Type your message here."
                            required
                        />
                        <div className="my-4">
                            {selectedFile && (
                                <Image
                                    src={selectedFile}
                                    alt="Preview"
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
                                type="button"
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
