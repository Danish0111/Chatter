import React from 'react'
import { useEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skeletons/MessageSkeleton';
import { userAuthStore } from '../store/useAuthStore';
import { formateMessageTime } from '../lib/utils';

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
  const { authUser } = userAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return ()=> unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if(messageEndRef.current && messages){
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  

  if (isMessagesLoading) return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />
    </div>
  )

  return (
    <div className='flex-1 flex flex-col h-full'>
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          return (
            <div
              ref={messageEndRef}
              className={`chat ${message.senderId === authUser._id ? 'chat-end' : 'chat-start'}`}
              key={message._id}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={`${message.senderId === authUser._id
                      ? authUser.profilePic || './avatar.png'
                      : selectedUser.profilePic || './avatar.png'}`}
                    alt="profile pic"
                  />
                </div>
              </div>

              <div className="chat-header">
                <time className='text-xs opacity-50'>
                  {formateMessageTime(message.createdAt)}
                </time>
              </div>
              <div className={`chat-bubble break-words flex flex-col ${message.senderId === authUser._id ? 'bg-primary text-primary-content' : ''}`}>
                {message.image && (
                  <img className='max-w-[200px] rounded-md mb-2' src={message.image} alt="" />
                )}
                {message.text && (
                  <p className="">{message.text}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <MessageInput />
    </div>
  )
}

export default ChatContainer
