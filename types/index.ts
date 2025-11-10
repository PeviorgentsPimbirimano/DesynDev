export type UserRole = 'designer' | 'developer' | 'both';

export interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
  role: UserRole;
  avatar: string;
  skills: string[];
  posts: string[];
  followers: number;
  following: number;
}

export type PostType = 'design' | 'build';

export interface Post {
  id: string;
  type: PostType;
  userId: string;
  userName: string;
  userAvatar: string;
  userRole: UserRole;
  caption: string;
  tags: string[];
  images: string[];
  figmaUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  likes: number;
  comments: Comment[];
  likedBy: string[];
  collaborationWith?: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  createdAt: string;
}

export interface CollaborationRequest {
  id: string;
  postId: string;
  fromUserId: string;
  fromUserName: string;
  fromUserAvatar: string;
  message?: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'collaboration';
  fromUserId: string;
  fromUserName: string;
  fromUserAvatar: string;
  postId?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  createdAt: string;
}

export interface Chat {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userRole: UserRole;
  lastMessage: string;
  lastMessageTime: string;
  messages: ChatMessage[];
  unreadCount: number;
}
