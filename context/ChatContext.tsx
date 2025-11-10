import React, { createContext, useContext, useState, useEffect } from 'react';
import { Chat, ChatMessage } from '@/types';
import { getChats, saveChats, addMessageToChat as addMessageToLocalStorage } from '@/utils/localStorage';
import { mockChats } from '@/data/mockData';

interface ChatContextType {
  chats: Chat[];
  sendMessage: (chatId: string, text: string) => void;
  getChat: (chatId: string) => Chat | undefined;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeChats = () => {
      const savedChats = getChats();
      if (savedChats) {
        setChats(savedChats);
      } else {
        setChats(mockChats);
        saveChats(mockChats);
      }
      setIsInitialized(true);
    };

    initializeChats();
  }, []);

  const sendMessage = (chatId: string, text: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: '1',
      senderName: 'You',
      text,
      createdAt: new Date().toISOString(),
    };

    const updatedChats = chats.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMessage: text,
          lastMessageTime: newMessage.createdAt,
        };
      }
      return chat;
    });

    setChats(updatedChats);
    saveChats(updatedChats);
  };

  const getChat = (chatId: string) => {
    return chats.find(c => c.id === chatId);
  };

  if (!isInitialized) {
    return <>{children}</>;
  }

  return (
    <ChatContext.Provider value={{ chats, sendMessage, getChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
