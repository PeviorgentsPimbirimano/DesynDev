import { Chat, ChatMessage } from '@/types';

export interface UserProfile {
  name: string;
  email: string;
  role: 'designer' | 'developer' | 'both';
  skills: string[];
  portfolio?: string;
  biography: string;
  createdAt: string;
}

const USER_PROFILE_KEY = 'desyndev_user_profile';
const CHATS_KEY = 'desyndev_chats';

export const saveUserProfile = (profile: UserProfile) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
    }
  } catch (error) {
    console.error('Error saving user profile:', error);
  }
};

export const getUserProfile = (): UserProfile | null => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = window.localStorage.getItem(USER_PROFILE_KEY);
      return data ? JSON.parse(data) : null;
    }
  } catch (error) {
    console.error('Error retrieving user profile:', error);
  }
  return null;
};

export const clearUserProfile = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(USER_PROFILE_KEY);
    }
  } catch (error) {
    console.error('Error clearing user profile:', error);
  }
};

export const saveChats = (chats: Chat[]) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(CHATS_KEY, JSON.stringify(chats));
    }
  } catch (error) {
    console.error('Error saving chats:', error);
  }
};

export const getChats = (): Chat[] | null => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = window.localStorage.getItem(CHATS_KEY);
      return data ? JSON.parse(data) : null;
    }
  } catch (error) {
    console.error('Error retrieving chats:', error);
  }
  return null;
};

export const addMessageToChat = (chatId: string, message: ChatMessage): Chat | null => {
  try {
    const chats = getChats() || [];
    const chatIndex = chats.findIndex(c => c.id === chatId);
    if (chatIndex !== -1) {
      chats[chatIndex].messages.push(message);
      chats[chatIndex].lastMessage = message.text;
      chats[chatIndex].lastMessageTime = message.createdAt;
      saveChats(chats);
      return chats[chatIndex];
    }
  } catch (error) {
    console.error('Error adding message to chat:', error);
  }
  return null;
};

export const clearChats = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(CHATS_KEY);
    }
  } catch (error) {
    console.error('Error clearing chats:', error);
  }
};
