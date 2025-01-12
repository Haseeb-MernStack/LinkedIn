import React from 'react'
import { Button } from './ui/button'
import { MessageCircleMore, Repeat, Send, ThumbsUp } from 'lucide-react'

const SocialOptions = () => {
    return (
        <div >
            <div className='flex items-center m-1 justify-between'>
                <Button variant={'ghost'} className='flex items-center gap-1 rounded-lg text-gray-600 hover:text-black'>
                    <ThumbsUp />
                    <p>Like</p>
                </Button>
                <Button variant={'ghost'} className='flex items-center gap-1 rounded-lg text-gray-600 hover:text-black'>
                    <MessageCircleMore />
                    <p>Message</p>
                </Button>
                <Button variant={'ghost'} className='flex items-center gap-1 rounded-lg text-gray-600 hover:text-black'>
                    <Repeat />
                    <p>Repost</p>
                </Button>
                <Button variant={'ghost'} className='flex items-center gap-1 rounded-lg text-gray-600 hover:text-black'>
                    <Send />
                    <p>Send</p>
                </Button>
            </div>
        </div>
    )
}

export default SocialOptions
