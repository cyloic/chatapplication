export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  status: 'online' | 'offline';
  lastSeen?: Date;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: Date;
  isRead: boolean;
}

export interface Chat {
  id: string;
  type: 'direct' | 'group';
  name?: string;
  participants: User[];
  messages: Message[];
  lastMessage?: Message;
}