import React from 'react'
import { useChatStore } from '../store/useChatStore'
import Sidebar from '../components/Sidebar';
import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from '../components/ChatContainer';

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className='h-screen bg-base-200 mx-auto'>
      <div className="flex justify-center items-center pt-4">
        <div className="w-full max-w-6xl bg-base-100 shadow-xl h-[calc(100vh-2rem)]">
          <div className="h-full flex overflow-hidden ">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
