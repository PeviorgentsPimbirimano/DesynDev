import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { getChats } from '@/utils/chatStorage';
import { ChatConversation } from '@/types/chat';
import { Avatar } from './Avatar';

interface ChatListScreenProps {
  onSelectChat: (conversation: ChatConversation) => void;
  onClose: () => void;
}

export default function ChatListScreen({ onSelectChat, onClose }: ChatListScreenProps) {
  const { colors } = useTheme();
  const [chats, setChats] = useState<ChatConversation[]>([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
      const loadChats = () => {
        const allChats = getChats();
        setChats(allChats.sort((a, b) => {
          if (!a.lastMessageTime || !b.lastMessageTime) return 0;
          return new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime();
        }));
      };
      loadChats();
    }, []);

  const filteredChats = chats.filter(chat =>
    chat.userName.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderChatItem = ({ item }: { item: ChatConversation }) => {
    const lastMessagePreview = item.lastMessage ? item.lastMessage.substring(0, 50) : 'No messages yet';
    const timestamp = item.lastMessageTime ? new Date(item.lastMessageTime) : null;
    const timeString = timestamp ? formatTime(timestamp) : '';

    return (
      <TouchableOpacity
        style={[styles.chatItem, { borderBottomColor: colors.border }]}
        onPress={() => onSelectChat(item)}
      >
        <Avatar source={{ uri: item.userAvatar }} size={50} />
        <View style={styles.chatContent}>
          <Text style={[styles.chatName, { color: colors.text }]}>{item.userName}</Text>
          <Text style={[styles.lastMessage, { color: colors.textSecondary }]}>
            {lastMessagePreview}
          </Text>
        </View>
        {timeString && (
          <Text style={[styles.timestamp, { color: colors.textSecondary }]}>{timeString}</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={onClose}>
          <ArrowLeft color={colors.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Messages</Text>
        <View style={{ width: 24 }} />
      </View>

      <TextInput
        style={[styles.searchInput, { backgroundColor: colors.inputBackground, color: colors.text, borderColor: colors.border }]}
        placeholder="Search conversations..."
        placeholderTextColor={colors.textSecondary}
        value={searchText}
        onChangeText={setSearchText}
      />

      {filteredChats.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            {searchText ? 'No conversations found' : 'No conversations yet'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredChats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          scrollEnabled
        />
      )}
    </SafeAreaView>
  );
}

function formatTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'now';
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;

  return date.toLocaleDateString();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  searchInput: {
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    fontSize: 14,
  },
  chatItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  chatContent: {
    flex: 1,
    marginHorizontal: 12,
  },
  chatName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 13,
  },
  timestamp: {
    fontSize: 12,
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
});
