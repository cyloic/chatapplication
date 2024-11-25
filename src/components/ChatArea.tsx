import React, { useState } from 'react';
import { Send, Phone, Video, MoreVertical } from 'lucide-react';
import { Chat, Message, User } from '../types';
import { format } from 'date-fns';

interface ChatAreaProps {
  chat: Chat;
  currentUser: User;
  onSendMessage: (content: string) => void;
}

export default function ChatArea({ chat, currentUser, onSendMessage }: ChatAreaProps) {
  const [message, setMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-gray-50">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {chat.type === 'direct' ? (
              <img
                src={chat.participants[0].avatar}
                alt={chat.participants[0].name}
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
              />
            ) : (
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {chat.name?.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <span className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></span>
              </div>
            )}
            <div>
              <h2 className="font-semibold text-gray-800">
                {chat.type === 'direct' ? chat.participants[0].name : chat.name}
              </h2>
              <p className="text-sm text-gray-500">
                {chat.type === 'direct' ? chat.participants[0].bio : `${chat.participants.length} members`}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Phone className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Video className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <MoreVertical className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.messages.map((msg) => {
          const isOwnMessage = msg.senderId === currentUser.id;
          const sender = chat.participants.find((p) => p.id === msg.senderId);

          return (
            <div
              key={msg.id}
              className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
                {!isOwnMessage && (
                  <img
                    src={sender?.avatar}
                    alt={sender?.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <div
                  className={`max-w-[70%] ${
                    isOwnMessage
                      ? 'bg-blue-600 text-white rounded-l-2xl rounded-tr-2xl'
                      : 'bg-white text-gray-800 rounded-r-2xl rounded-tl-2xl'
                  } p-3 shadow-sm`}
                >
                  {chat.type === 'group' && !isOwnMessage && (
                    <p className="text-xs font-medium text-gray-500 mb-1">{sender?.name}</p>
                  )}
                  <p className="text-sm">{msg.content}</p>
                  <span className="text-xs opacity-75 mt-1 block">
                    {format(msg.timestamp, 'HH:mm')}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-3 bg-gray-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}