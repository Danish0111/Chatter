import React from 'react'
import { useState } from 'react';
import { userAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, MessagesSquare, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthImagePattern from '../components/AuthImagePattern';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  })
  const { signup, isSigningUp } = userAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email) return toast.error("Email is required");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      signup(formData);
    }
  };
  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* left side */}
      <div className="left flex flex-col justify-center space-y-8 items-center p-4 sm:p-16">
        <div className="w-full max-w-md space-y-8">
          {/* logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col justify-center items-center">
              <div className="logo bg-base-300 p-2 rounded-xl">
                <MessageSquare className='size-6' />
              </div>
              <h1 className='text-xl font-bold'>Create Account</h1>
              <h2 className=''>Get started with your free account</h2>
            </div>
          </div>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className="fullName flex flex-col justify-center gap-2">
              <label className='' htmlFor="fullName">
                <span>Full Name</span>
              </label>
              <div className="flex items-center gap-2 border-2  p-2 rounded-lg">
                <User className='size-5' />
                <input
                  className='focus:outline-none w-full'
                  type="text"
                  id='fullName'
                  placeholder='John Doe'
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>
            <div className="email flex flex-col justify-center gap-2">
              <label className='' htmlFor="email">
                <span>Email</span>
              </label>
              <div className="flex items-center gap-2 border-2  p-2 rounded-lg">
                <Mail className='size-5' />
                <input
                  className='focus:outline-none w-full'
                  type="email"
                  id='email'
                  placeholder='you@example.com'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="password flex flex-col justify-center gap-2">
              <label className='' htmlFor="password">
                <span>Password</span>
              </label>
              <div className="flex items-center gap-2 border-2 p-2 rounded-lg">
                <Lock className='size-5' />
                <input
                  className='focus:outline-none w-full'
                  type={showPassword ? "text" : "password"}
                  id='password'
                  placeholder='••••••••'
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button type='button' className='hover:cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                  {!showPassword ? (
                    <EyeOff className='size-4' />
                  ) : (
                    <Eye className='size-4' />
                  )}
                </button>
              </div>
            </div>
            <button className='btn btn-primary w-full rounded-lg' type="submit" disabled={isSigningUp}>
              {isSigningUp ? (
                <Loader2 className='size-6 animate-spin' />
              ) : (
                <div className="">Create Account</div>
              )}
            </button>
          </form>
          <div className="text-center">
            <p className=''>Already have an account?{" "}
              <Link to="/login" className='link link-primary'>Sign in</Link>
            </p>
          </div>
        </div>
      </div>
      {/* Right side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />

    </div>
  )
}

export default SignupPage
