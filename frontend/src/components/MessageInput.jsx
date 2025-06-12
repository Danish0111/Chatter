import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import { Image, Loader, Loader2, Send, X } from 'lucide-react';

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { isMessageSending, sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("PLease select and image")
      return
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      })

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.log("Failed to send Message: ", error);
    }

  }
  return (
    <div className='w-full p-4'>
      {imagePreview && (
        <div className="flex items-center mb-2">
          <div className="relative">
            <img className='size-20 rounded-xl border border-zinc-700' src={imagePreview} alt="preview" />
            <button onClick={removeImage} className='bg-base-300 rounded-full absolute -top-2 -right-2.5 border-2 border-zinc-700'>
              <X className='size-5' />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
        <div className="flex-1 flex items-center gap-2">
          <input
            className='w-full input input-bordered rounded-lg'
            type="text"
            placeholder='Type a message'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <input
            type="file"
            className='hidden'
            accept='image/*'
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button type='button' className={`btn btn-circle ${imagePreview ? 'text-green-400' : 'text-zinc-400'}`} onClick={() => fileInputRef.current?.click()}>
            <Image className='size-5' />
          </button>
        </div>
        <button type="submit" className='btn btn-circle' disabled={!text.trim() && !imagePreview}>
          {isMessageSending ? (
            <Loader2 className='animate-spin' size={22}/>
          ) : (
            <Send size={22} />
          )}
        </button>
      </form>
    </div>
  )
}

export default MessageInput
