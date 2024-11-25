import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ChatArea from '../components/ChatArea';
import { Chat, User, Message } from '../types';
import { LogOut } from 'lucide-react';

// Mock data
const currentUser: User = {
  id: '1',
  name: 'Kwame Mensah',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  bio: 'Computer Science Student | ALU Class of 2024',
  status: 'online'
};

const initialChats: Chat[] = [
  {
    id: '1',
    type: 'direct',
    participants: [
      {
        id: '2',
        name: 'Amara Diallo',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        bio: 'Global Challenges Student | Student Government',
        status: 'online'
      }
    ],
    messages: [
      {
        id: '1',
        content: 'Hi Kwame, do you have the notes from today\'s Leadership seminar?',
        senderId: '2',
        timestamp: new Date('2024-03-10T10:00:00'),
        isRead: true
      }
    ],
    lastMessage: {
      id: '1',
      content: 'Hi Kwame, do you have the notes from today\'s Leadership seminar?',
      senderId: '2',
      timestamp: new Date('2024-03-10T10:00:00'),
      isRead: true
    }
  },
  {
    id: '2',
    type: 'group',
    name: 'CS Study Group',
    participants: [
      currentUser,
      {
        id: '2',
        name: 'Amara Diallo',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        bio: 'Global Challenges Student',
        status: 'online'
      },
      {
        id: '3',
        name: 'Chioma Okonkwo',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        bio: 'Computer Science Student',
        status: 'offline'
      }
    ],
    messages: [
      {
        id: '2',
        content: 'Anyone free to work on the Data Structures assignment?',
        senderId: '3',
        timestamp: new Date('2024-03-10T09:30:00'),
        isRead: true
      }
    ],
    lastMessage: {
      id: '2',
      content: 'Anyone free to work on the Data Structures assignment?',
      senderId: '3',
      timestamp: new Date('2024-03-10T09:30:00'),
      isRead: true
    }
  },
  {
    id: '3',
    type: 'group',
    name: 'ALU Student Council',
    participants: [
      currentUser,
      {
        id: '4',
        name: 'Zainab Ahmed',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        bio: 'Student Council President',
        status: 'online'
      },
      {
        id: '5',
        name: 'David Mutua',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        bio: 'Events Coordinator',
        status: 'offline'
      }
    ],
    messages: [
      {
        id: '3',
        content: 'Next week\'s leadership summit agenda is ready for review',
        senderId: '4',
        timestamp: new Date('2024-03-10T11:00:00'),
        isRead: false
      }
    ],
    lastMessage: {
      id: '3',
      content: 'Next week\'s leadership summit agenda is ready for review',
      senderId: '4',
      timestamp: new Date('2024-03-10T11:00:00'),
      isRead: false
    }
  }
];

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [selectedChat, setSelectedChat] = useState<Chat | undefined>(chats[0]);
  const navigate = useNavigate();

  const handleSendMessage = (content: string) => {
    if (!selectedChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      senderId: currentUser.id,
      timestamp: new Date(),
      isRead: false
    };

    const updatedChat = {
      ...selectedChat,
      messages: [...selectedChat.messages, newMessage],
      lastMessage: newMessage
    };

    setChats(chats.map(chat => 
      chat.id === selectedChat.id ? updatedChat : chat
    ));
    setSelectedChat(updatedChat);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col w-80">
        <div className="p-4 bg-white border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-gray-800">{currentUser.name}</h2>
              <p className="text-sm text-gray-500">{currentUser.bio}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Logout"
          >
            <LogOut className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        <Sidebar
          currentUser={currentUser}
          chats={chats}
          onChatSelect={setSelectedChat}
          selectedChat={selectedChat}
        />
      </div>
      {selectedChat ? (
        <ChatArea
          chat={selectedChat}
          currentUser={currentUser}
          onSendMessage={handleSendMessage}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <p className="text-gray-500">Select a chat to start messaging</p>
        </div>
      )}
    </div>
  );
}