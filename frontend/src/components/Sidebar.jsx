import React from 'react'
import { useState, useEffect } from 'react';
import { useChatStore } from '../store/useChatStore'
import { ArrowLeftCircleIcon, ArrowRightCircle, ArrowRightCircleIcon, User, Users } from 'lucide-react';
import SidebarSkeleton from './skeletons/SidebarSkeleton';
import { userAuthStore } from '../store/useAuthStore';

const Sidebar = () => {
  const { users, getUsers, selectedUser, isUsersLoading, setSelectedUser } = useChatStore();
  const { onlineUsers } = userAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    getUsers();
  }, [getUsers])

  const filteredUsers = showOnlineOnly ? users.filter((user) => onlineUsers.includes(user._id)) : users;

  if (isUsersLoading) return <SidebarSkeleton />

  return (
    <>
      {/* <div className=" h-full absolute flex justify-center items-center right-0">
        {isSidebarOpen ? (
          <ArrowRightCircleIcon className='size-10 text-primary bg-primary/40 rounded-full p-1' onClick={() => setIsSidebarOpen(false)} />
        ) : (
          <ArrowLeftCircleIcon className='size-10 text-primary bg-primary/40 rounded-full p-1' onClick={() => setIsSidebarOpen(true)} />
        )}
      </div> */}
      <aside className={` w-16 lg:w-72 border-r border-base-300 overflow-y-auto scrollbar-hidden relative`}>
        <div className="w-full sticky top-0 bg-base-100 z-10">
          <div className="flex items-center justify-center lg:justify-normal gap-2 border-b border-base-300 p-5">
            <Users className='size-6' />
            <span className='hidden lg:block text-lg'>Contact</span>
          </div>

          <div className="flex-1 flex flex-col md:flex-row justify-between items-center py-2 px-1 md:px-4">
            <label className='flex items-center gap-2'>
              <input
                type="checkbox"
                checked={showOnlineOnly} onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className='checkbox checkbox-xs md:checkbox-sm'
              />
              <span className="hidden lg:block text-sm">Show online only</span>
            </label>
            <span className="text-xs text-zinc-500">({onlineUsers.length - 1} Online)</span>
          </div>
        </div>

        <div className="overflow-y-auto h-full">
          <div className="flex flex-col justify-center items-start">
            {filteredUsers.map((user) => {
              return (
                <button
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className={`w-full flex justify-start items-center p-2 transition-colors ${selectedUser?._id === user._id ? 'bg-base-300 ring-1 ring-base-300' : 'hover:bg-base-200'}`}
                >
                  <div className="flex justify-center items-center gap-3">
                    <div className="relative">
                      <img className='size-10 md:size-12 rounded-full' src={user.profilePic || "./avatar.png"} alt="" />
                      {onlineUsers.includes(user._id) && (
                        <span className="absolute bottom-0 right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full ring-2 ring-zinc-900"></span>
                      )}
                    </div>
                    <div className="hidden lg:flex flex-col justify-center items-start min-w-0">
                      <p className="font-medium truncate">{user.fullName}</p>
                      <p className="text-sm text-zinc-400">{onlineUsers.includes(user._id) ? 'Online' : 'Offline'}</p>
                    </div>
                  </div>
                </button>
              )
            })}
            {filteredUsers.length === 0 && (
              <div className="text-zinc-500 py-4">No online users</div>
            )}
          </div>
        </div>
      </aside >
    </>
  )
}

export default Sidebar
