import React from 'react'
import { useThemeStore } from '../store/useThemeStore'
import { THEMES } from "../constants"
import { Send } from 'lucide-react'

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
]

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  return (
    <div className='h-screen max-w-5xl mx-auto md:pt-20 p-4'>
      <div className="space-y-6">
        <div className="flex flex-col">
          <h2 className='text-2xl font-bold'>Theme</h2>
          <p className="">Choose a theme for your chat interface.</p>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {THEMES.map((t) => (
            <button key={t} className={`flex flex-col items-center ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"} rounded-lg transition-colors p-2`} onClick={() => setTheme(t)}>
              <div data-theme={t} className="relative w-full h-8 overflow-hidden rounded">
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1" >
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className='font-[11px] truncate'>{t.charAt(0).toUpperCase() + t.slice(1)}</span>
            </button>
          ))}
        </div>
        {/* preview */}
        <h3 className="text-2xl font-bold">Preview</h3>
        <div className="bg-base-100">
          <div className="bg-base-200 p-5 rounded-xl border border-base-300">
            <div className="bg-base-100 mx-auto max-w-lg rounded-xl shadow">
              <div className="flex items-center gap-2 p-2 px-3 border-b border-base-300">
                <div className="logo bg-primary w-8 h-8 flex justify-center items-center font-medium text-lg text-center rounded-full text-primary-content">J</div>
                <div className="flex flex-col justify-center">
                  <h3 className='font-medium'>John Doe</h3>
                  <p className=''>Online</p>
                </div>
              </div>
              <div className="p-4 space-y-4 border-b border-base-300">
                {PREVIEW_MESSAGES.map((message) => (
                  <div key={message.id} className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}>
                    <div className={`${message.isSent ? 'bg-primary' : 'bg-base-200'} rounded-lg p-2`}>
                      <p className={`${message.isSent ? 'text-primary-content' : 'text-base-content'}`}>{message.content}</p>
                      <div className={`${message.isSent ? 'text-primary-content/70' : 'text-base-content/70'}`}>12:00 PM</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4">
                <div className='flex justify-stretch items-center gap-2 '>
                  <input className='input input-borderd w-full bg-base-200 ' type="text" value="This is a preview" placeholder='Type a message...' readOnly/>
                  <button className='btn btn-primary'><Send className='size-5'/></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
