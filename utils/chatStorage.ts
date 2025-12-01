import { ChatConversation, ChatMessage } from '@/types/chat';

const CHATS_KEY = 'desyndev_chats';
const INITIALIZED_KEY = 'desyndev_chats_initialized';

const mockChatsData: ChatConversation[] = [
  {
    id: 'chat_001',
    userId: '2',
    userName: 'Sarah Chen',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    lastMessage: 'Thanks for the collaboration suggestion!',
    lastMessageTime: '2025-11-05T15:30:00Z',
    messages: [
      {
        id: 'msg_001',
        senderId: '2',
        senderName: 'Sarah Chen',
        senderAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
        content: 'Hey! Love your recent posts!',
        timestamp: '2025-11-04T10:15:00Z',
      },
      {
        id: 'msg_002',
        senderId: '1',
        senderName: 'Alex Johnson',
        senderAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
        content: 'Thanks Sarah! Your design work is amazing too.',
        timestamp: '2025-11-04T10:45:00Z',
      },
      {
        id: 'msg_003',
        senderId: '2',
        senderName: 'Sarah Chen',
        senderAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
        content: 'Would you be interested in collaborating on a project?',
        timestamp: '2025-11-04T14:20:00Z',
      },
      {
        id: 'msg_004',
        senderId: '1',
        senderName: 'Alex Johnson',
        senderAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
        content: 'That sounds great! What did you have in mind?',
        timestamp: '2025-11-04T16:30:00Z',
      },
      {
        id: 'msg_005',
        senderId: '2',
        senderName: 'Sarah Chen',
        senderAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
        content: 'I have a fintech app design I need a developer for',
        timestamp: '2025-11-05T09:00:00Z',
      },
      {
        id: 'msg_006',
        senderId: '1',
        senderName: 'Alex Johnson',
        senderAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
        content: 'Perfect! I specialize in fintech. Can we schedule a call?',
        timestamp: '2025-11-05T12:00:00Z',
      },
      {
        id: 'msg_007',
        senderId: '2',
        senderName: 'Sarah Chen',
        senderAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
        content: 'Thanks for the collaboration suggestion!',
        timestamp: '2025-11-05T15:30:00Z',
      },
    ],
  },
  {
    id: 'chat_002',
    userId: '3',
    userName: 'Mike Ross',
    userAvatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=200',
    lastMessage: 'Let me check the repository and get back to you',
    lastMessageTime: '2025-11-05T11:45:00Z',
    messages: [
      {
        id: 'msg_101',
        senderId: '3',
        senderName: 'Mike Ross',
        senderAvatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=200',
        content: 'Did you see the e-commerce dashboard I built?',
        timestamp: '2025-11-04T08:00:00Z',
      },
      {
        id: 'msg_102',
        senderId: '1',
        senderName: 'Alex Johnson',
        senderAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
        content: 'Yes! It looks incredible. The UX is so smooth.',
        timestamp: '2025-11-04T09:30:00Z',
      },
      {
        id: 'msg_103',
        senderId: '3',
        senderName: 'Mike Ross',
        senderAvatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=200',
        content: 'Thanks! Built it with React and TypeScript',
        timestamp: '2025-11-04T11:00:00Z',
      },
      {
        id: 'msg_104',
        senderId: '1',
        senderName: 'Alex Johnson',
        senderAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
        content: 'Can I check out the code on GitHub?',
        timestamp: '2025-11-05T10:15:00Z',
      },
      {
        id: 'msg_105',
        senderId: '3',
        senderName: 'Mike Ross',
        senderAvatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=200',
        content: 'Let me check the repository and get back to you',
        timestamp: '2025-11-05T11:45:00Z',
      },
    ],
  },
  {
    id: 'chat_003',
    userId: '4',
    userName: 'Emma Wilson',
    userAvatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200',
    lastMessage: 'Great! Looking forward to seeing the results',
    lastMessageTime: '2025-11-05T14:00:00Z',
    messages: [
      {
        id: 'msg_201',
        senderId: '4',
        senderName: 'Emma Wilson',
        senderAvatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200',
        content: 'Hi Alex! I saw your profile and your work is amazing',
        timestamp: '2025-11-03T14:00:00Z',
      },
      {
        id: 'msg_202',
        senderId: '1',
        senderName: 'Alex Johnson',
        senderAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
        content: 'Thanks Emma! Your fitness app design is really cool',
        timestamp: '2025-11-03T15:30:00Z',
      },
      {
        id: 'msg_203',
        senderId: '4',
        senderName: 'Emma Wilson',
        senderAvatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200',
        content: 'I have a fitness app concept with gamification. Are you interested?',
        timestamp: '2025-11-04T10:00:00Z',
      },
      {
        id: 'msg_204',
        senderId: '1',
        senderName: 'Alex Johnson',
        senderAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
        content: 'Definitely! I love fitness and wellness projects',
        timestamp: '2025-11-04T11:45:00Z',
      },
      {
        id: 'msg_205',
        senderId: '4',
        senderName: 'Emma Wilson',
        senderAvatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200',
        content: 'I can send you the Figma files. Can we work on this together?',
        timestamp: '2025-11-05T09:20:00Z',
      },
      {
        id: 'msg_206',
        senderId: '1',
        senderName: 'Alex Johnson',
        senderAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
        content: 'Absolutely! Send them over and let us sync up this week',
        timestamp: '2025-11-05T13:00:00Z',
      },
      {
        id: 'msg_207',
        senderId: '4',
        senderName: 'Emma Wilson',
        senderAvatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200',
        content: 'Great! Looking forward to seeing the results',
        timestamp: '2025-11-05T14:00:00Z',
      },
    ],
  },
];

export const initializeDummyChats = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const isInitialized = window.localStorage.getItem(INITIALIZED_KEY);
      if (!isInitialized) {
        window.localStorage.setItem(CHATS_KEY, JSON.stringify(mockChatsData));
        window.localStorage.setItem(INITIALIZED_KEY, 'true');
      }
    }
  } catch (error) {
    console.error('Error initializing dummy chats:', error);
  }
};

export const saveChats = (chats: ChatConversation[]) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(CHATS_KEY, JSON.stringify(chats));
    }
  } catch (error) {
    console.error('Error saving chats:', error);
  }
};

export const getChats = (): ChatConversation[] => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = window.localStorage.getItem(CHATS_KEY);
      return data ? JSON.parse(data) : [];
    }
  } catch (error) {
    console.error('Error retrieving chats:', error);
  }
  return [];
};

export const addMessage = (conversationId: string, message: ChatMessage) => {
  const chats = getChats();
  const chat = chats.find(c => c.id === conversationId);
  if (chat) {
    chat.messages.push(message);
    chat.lastMessage = message.content;
    chat.lastMessageTime = message.timestamp;
    saveChats(chats);
  }
};

export const createOrGetConversation = (userId: string, userName: string, userAvatar: string): string => {
  const chats = getChats();
  const existingChat = chats.find(c => c.userId === userId);

  if (existingChat) {
    return existingChat.id;
  }

  const newChat: ChatConversation = {
    id: Math.random().toString(36).substr(2, 9),
    userId,
    userName,
    userAvatar,
    messages: [],
  };

  chats.push(newChat);
  saveChats(chats);
  return newChat.id;
};

export const getConversation = (conversationId: string): ChatConversation | undefined => {
  const chats = getChats();
  return chats.find(c => c.id === conversationId);
};
