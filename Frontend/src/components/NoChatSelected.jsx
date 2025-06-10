import { MessageSquare } from 'lucide-react'
import React from 'react'

const NoChatSelected = () => {
  return (
    <div className='flex items-center justify-center flex-1'>
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-bounce">
            <MessageSquare className='size-12 bg-primary/40 p-2 rounded-xl text-primary'/>
        </div>
        <div className="flex flex-col items-center space-y-4">
            <p className="text-2xl font-bold">Welcome to Chatter</p>
            <p className="text-base-content/60">Select a conversation from the sidebar to start chatting</p>
        </div>
      </div>
    </div>
  )
}

export default NoChatSelected
