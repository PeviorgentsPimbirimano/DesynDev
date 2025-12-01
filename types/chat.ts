export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
}

export interface ChatConversation {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  lastMessage?: string;
  lastMessageTime?: string;
  messages: ChatMessage[];
}
