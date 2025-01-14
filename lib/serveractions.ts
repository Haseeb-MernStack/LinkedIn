"use server";

import { Post } from "@/models/post.model";
import { IUser } from "@/models/user.model";
import { currentUser } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "./db";
import { revalidatePath } from "next/cache";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// creating post using server actions.
export const createPostAction = async (inputText: string, selectedFile: string) => {

    try {
        await connectDB();
        const user = await currentUser();
        if (!user) {
            throw new Error("User not authenticated");
        }
        if (!inputText) {
            throw new Error("Input field is required");
        }

        const userDatabase: IUser = {
            firstName: user.firstName || "first name",
            lastName: user.lastName || "last name",
            userId: user.id,
            profilePhoto: user.imageUrl,
        };

        if (selectedFile) {
            const uploadResponse = await cloudinary.uploader.upload(selectedFile);

            if (!uploadResponse?.secure_url) {

                throw new Error("Failed to upload image");
            }

            await Post.create({
                description: inputText,
                user: userDatabase,
                imageUrl: uploadResponse.secure_url,
            });

        } else {
            await Post.create({
                description: inputText,
                user: userDatabase,
            });
        }
        revalidatePath("/");
    } catch (error: any) {
        console.error("Error in createPostAction:", error.message, error.stack);
        throw new Error(error.message || "An error occurred while creating the post");
    }
};

// get all posts using server actions.
export const getAllPosts = async () => {
    await connectDB();
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(posts));
    } catch (error) {
        console.log(error);
    }
}

// delete post by author id.
export const deletePostAction = async (postId:string)=>{
    await connectDB();
    const user = await currentUser();
    if(!user) throw new Error('User not authenticated');
    
    const post = await Post.findById(postId);
    if(!post) throw new Error('Post not found');

    // delete only author own post.
    if(post.user.userId !== user.id){
        throw new Error("You are not an owner of this Post.");
    }

    try {
        await Post.deleteOne({_id:postId});
        revalidatePath("/");
    } catch (error:any) {
        throw new Error("An error occurred", error);
    }
}
