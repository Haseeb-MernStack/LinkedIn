import React from 'react';
import PostInput from './PostInput';
import Posts from './Posts';

type User = {
    id: string;
    name: string;
    imageUrl?: string;
};

const Feed = ({ user }: { user?: User }) => {
    const userData = user || { id: '', name: 'Guest', imageUrl: '/default-profile-photo.png' };

    return (
        <div className='flex-1'>
            <PostInput user={userData} />
            <Posts />
        </div>
    );
};

export default Feed;
