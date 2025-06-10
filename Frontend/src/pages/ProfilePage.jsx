import React from 'react'
import { useState } from 'react';
import { userAuthStore } from '../store/useAuthStore'
import { CameraIcon, Mail, User } from 'lucide-react';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = userAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 1024 * 1024 * 2) { // 2MB
      toast.error("Please upload an image smaller than 2MB");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    }
  }

  return (
    <div className='h-screen pt-10 space-y-5 bg-base-100 text-base-content p-4'>
      <div className="max-w-xl bg-base-300 flex flex-col mx-auto justify-center items-center space-y-5 p-5 px-8 rounded-xl shadow">
        <div className="text-center space-y-2">
          <h1 className='text-2xl'>Profile</h1>
          <p className="">Your profile information</p>
        </div>
        <div className="avatar w-40 border-4  rounded-full">
          <img className='rounded-full p-1 relative' src={selectedImage || authUser.profilePic || "./avatar.png"} alt="" />
          <label htmlFor="avatar-upload" className={`absolute bottom-0 right-0 bg-base-200 p-2 rounded-full ${isUpdatingProfile ? 'animate-pulse pointer-events-none' : ''}`}>
            <CameraIcon className='size-5 text-black' />
            <input
              type="file"
              accept='image/*'
              className='hidden'
              id='avatar-upload'
              onChange={handleImageUpload}
              disabled={isUpdatingProfile}
            />
          </label>
        </div>
        <p className="">
          {isUpdatingProfile ? "Updating..." : "Click the camera button to update your photo"}
        </p>

        <div className="user-info w-full space-y-4">
          <div className="fullname space-y-1.5">
            <div className="label">
              <User className='size-5' />
              <span className=''>Full Name</span>
            </div>
            <p className="name-field border-2   rounded-lg p-2 px-4">
              {authUser?.fullName}
            </p>
          </div>
          <div className="email space-y-1.5">
            <div className="label">
              <Mail className='size-5' />
              <span className=''>Email Address</span>
            </div>
            <p className="name-field border-2   rounded-lg p-2 px-4">
              {authUser?.email}
            </p>
          </div>
        </div>
      </div>

      <div className="account-info max-w-xl bg-base-300 flex flex-col mx-auto p-8 space-y-5 rounded-xl shadow">
        <h1 className='text-2xl '>Account Information</h1>
        <div className="flex justify-between items-center ">
          <span className=''>Member Since</span>
          <span>{authUser?.createdAt.split("T")[0]}</span>
        </div>
        <div className="flex justify-between items-center ">
          <span className=''>Account Status</span>
          <span className='text-green-400'>Active</span>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
