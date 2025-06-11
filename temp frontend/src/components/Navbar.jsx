import React from 'react'
import { userAuthStore } from '../store/useAuthStore'
import { LogOut, MessageSquare, Settings, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { logout, authUser } = userAuthStore();

  return (
    <div className='flex justify-between items-center p-2 md:px-10 border-b-2 border-base-300'>
      <Link to="/" className="logo flex items-center gap-2">
        <MessageSquare className='size-8 bg-primary/40 p-2 rounded-xl text-primary' />
        <span>Chatter</span>
      </Link>
      <div className="flex justify-center items-center gap-4">
        <Link to="/settings" className="settings btn btn-sm  transition-colors flex items-center gap-2">
          <Settings className='size-5' />
          <span className='hidden md:flex text-sm'>Settings</span>
        </Link>
        {authUser && (
          <>
            <Link to="/profile" className="profile btn btn-sm flex items-center gap-2">
              <User className='size-5' />
              <span className='hidden md:flex text-sm'>Profile</span>
            </Link>
            <button className="logout flex items-center gap-2" onClick={logout}>
              <LogOut className='size-5' />
              <span className='hidden md:flex text-sm'>Logout</span>
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
