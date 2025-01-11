'use client';

import { useState } from 'react';
import ProfilePhoto from './shared/ProfilePhoto';
import { Input } from './ui/input';
import { PostDialog } from './PostDialog';

type User = {
    imageUrl?: string | null;
};

const PostInput = ({ user }: { user: User }) => {
    const [open, setOpen] = useState<boolean>(false);

    const inputHandler = () => {
        setOpen(true);
    };

    return (
        <div className='bg-white p-4 m-2 md:m-0 lg:m-0 border border-gray-300 rounded-lg'>
            <div className='flex items-center gap-3'>
                <ProfilePhoto src={user?.imageUrl || '/default-profile-photo.png'} />
                <button
                    onClick={inputHandler}
                    className='rounded-full hover:bg-gray-100 h-12 w-full text-left px-4 cursor-pointer placeholder-gray-500'
                >
                    Start a post
                </button>
                {open && <PostDialog setOpen={setOpen} open={open} src={user?.imageUrl || ''} />}
            </div>
        </div>
    );
};

export default PostInput;
