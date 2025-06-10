import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { userAuthStore } from '../store/useAuthStore';
import { X } from 'lucide-react';

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = userAuthStore();

    return (
        <div className=" w-full border-b border-base-300 p-2.5 ">
            <div className='flex justify-between items-center'>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <img className='size-12 rounded-full' src={selectedUser.profilePic || "./avatar.png"} alt="" />
                        {onlineUsers.includes(selectedUser._id) && (
                            <span className="absolute bottom-0 right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full ring-2 ring-zinc-900"></span>
                        )}
                    </div>
                    <div className="flex flex-col justify-center items-start">
                        <p className="font-medium">{selectedUser.fullName}</p>
                        <p className="text-sm text-zinc-400">{onlineUsers.includes(selectedUser._id) ? 'Online' : 'Offline'}</p>
                    </div>
                </div>
                <button className="" onClick={() => setSelectedUser(null)}>
                    <X className='size-5' />
                </button>
            </div>
        </div>
    )
}

export default ChatHeader
