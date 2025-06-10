import React from 'react'

const MessageSkeleton = () => {
    const skeletonMessages = Array(6).fill(null)
    return (
        <div className='flex-1 flex flex-col space-y-5 h-[80%] overflow-y-auto p-4'>
            {skeletonMessages.map((_, i) => {
                return (
                    <div key={i} className={`chat ${i % 2 === 0 ? 'chat-start' : 'chat-end'}`}>
                        <div className="chat-image avatar">
                            <div className="size-10 bg-base-300 rounded-full skeleton"></div>
                        </div>
                        <div className="chat-header skeleton w-24 h-4 bg-base-300 rounded mb-1"></div>
                        <div className="chat-bubble bg-base-300 skeleton h-16 w-[200px]"></div>
                    </div>
                )
            })}
        </div>
    )
}

export default MessageSkeleton
