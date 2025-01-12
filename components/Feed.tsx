import React from 'react';
import PostInput from './PostInput';
import Posts from './Posts';
import { getAllPosts } from '@/lib/serveractions';

type User = {
    id: string;
    name: string;
    imageUrl?: string;
};

const Feed = async ({ user }: { user?: User }) => {
    const userData = user || { id: '', name: 'Guest', imageUrl: '/default-profile-photo.png' };

    const posts = await getAllPosts();
    return (
        <div className='flex-1'>
            <PostInput user={userData} />
            <Posts posts={posts} />
        </div>
    );
};

export default Feed;
