import React from 'react';
import { Search, Users, MessageSquare, Settings } from 'lucide-react';
import { Chat, User } from '../types';

interface SidebarProps {
  currentUser: User;
  chats: Chat[];
  onChatSelect: (chat: Chat) => void;
  selectedChat?: Chat;
}

export default function Sidebar({ currentUser, chats, onChatSelect, selectedChat }: SidebarProps) {
  return (
    <div className="w-80 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* User Profile Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold text-gray-800">{currentUser.name}</h2>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search chats..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat)}
            className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedChat?.id === chat.id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              {chat.type === 'direct' ? (
                <img
                  src={chat.participants[0].avatar}
                  alt={chat.participants[0].name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">
                  {chat.type === 'direct'
                    ? chat.participants[0].name
                    : chat.name}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                  {chat.lastMessage?.content}
                </p>
              </div>
              {chat.lastMessage && (
                <span className="text-xs text-gray-400">
                  {new Date(chat.lastMessage.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex justify-around">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <MessageSquare className="h-6 w-6 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Users className="h-6 w-6 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Settings className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}