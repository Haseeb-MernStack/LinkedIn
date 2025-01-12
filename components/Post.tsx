'use client';

import React from 'react';
import ProfilePhoto from './shared/ProfilePhoto';
import { useUser } from '@clerk/nextjs';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import { Badge } from './ui/badge';
import PostContent from './PostContent';
import SocialOptions from './SocialOptions';
import { IPostDocument } from '@/models/post.model';

const Post = ({ post }: { post: IPostDocument }) => {
    const { user } = useUser();
    const fullName = post?.user?.firstName + "" + post?.user?.lastName;

    return (
        <div className="bg-white my-2 rounded-lg border border-gray-300">
            <div className="flex gap-2 p-4">
                <ProfilePhoto src={post?.user?.profilePhoto || ''} />
                <div className="flex items-center justify-between w-full">
                    <div>
                        <h1 className="text-sm font-bold">
                            {fullName} <Badge variant="secondary" className="ml-2">You</Badge>
                        </h1>
                        <p className="text-xs text-gray-500">@{user ? user?.username : "username"}</p>
                        <p className="text-xs text-gray-500">
                            {new Date(post?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                </div>
                <div>
                    <Button size="icon" className="rounded-full" variant="outline">
                        <Trash2 />
                    </Button>
                </div>
            </div>
            <PostContent post={post}/>
            <SocialOptions />
        </div>
    );
};

export default Post;
