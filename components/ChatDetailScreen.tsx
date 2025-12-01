import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ArrowLeft, Send } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { ChatConversation, ChatMessage } from '@/types/chat';
import { addMessage, getConversation } from '@/utils/chatStorage';
import { Avatar } from './Avatar';

interface ChatDetailScreenProps {
  conversation: ChatConversation;
  onBack: () => void;
  onUpdate: () => void;
}

export default function ChatDetailScreen({ conversation, onBack, onUpdate }: ChatDetailScreenProps) {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>(conversation.messages);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const updated = getConversation(conversation.id);
    if (updated) {
      setMessages(updated.messages);
    }
  }, [conversation.id]);

  const handleSendMessage = () => {
    if (!inputText.trim() || !user) return;

    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: user.id,
      senderName: user.name,
      senderAvatar: user.avatar,
      content: inputText.trim(),
      timestamp: new Date().toISOString(),
    };

    addMessage(conversation.id, newMessage);
    setMessages([...messages, newMessage]);
    setInputText('');
    onUpdate();

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isOwn = item.senderId === user?.id;
    const timestamp = new Date(item.timestamp);
    const timeString = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
      <View
        style={[
          styles.messageRow,
          {
            justifyContent: isOwn ? 'flex-end' : 'flex-start',
          },
        ]}
      >
        {!isOwn && <Avatar source={{ uri: item.senderAvatar }} size={32} />}
        <View
          style={[
            styles.messageBubble,
            {
              backgroundColor: isOwn ? colors.primary : colors.messageBackground,
              marginLeft: isOwn ? 0 : 8,
              marginRight: isOwn ? 8 : 0,
            },
          ]}
        >
          {!isOwn && (
            <Text style={[styles.senderName, { color: colors.textSecondary }]}>
              {item.senderName}
            </Text>
          )}
          <Text style={[styles.messageText, { color: isOwn ? '#fff' : colors.text }]}>
            {item.content}
          </Text>
          <Text
            style={[
              styles.messageTime,
              { color: isOwn ? 'rgba(255,255,255,0.7)' : colors.textSecondary },
            ]}
          >
            {timeString}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={onBack}>
            <ArrowLeft color={colors.text} size={24} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Avatar source={{ uri: conversation.userAvatar }} size={40} />
            <View style={styles.headerText}>
              <Text style={[styles.headerTitle, { color: colors.text }]}>
                {conversation.userName}
              </Text>
              <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
                Active now
              </Text>
            </View>
          </View>
          <View style={{ width: 24 }} />
        </View>

        {messages.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              Start a conversation
            </Text>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messagesList}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />
        )}

        <View style={[styles.inputContainer, { borderTopColor: colors.border }]}>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: colors.inputBackground, color: colors.text, borderColor: colors.border },
            ]}
            placeholder="Message..."
            placeholderTextColor={colors.textSecondary}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            onPress={handleSendMessage}
            disabled={!inputText.trim()}
            style={[
              styles.sendButton,
              {
                backgroundColor: colors.primary,
                opacity: inputText.trim() ? 1 : 0.5,
              },
            ]}
          >
            <Send color="#fff" size={20} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  messagesList: {
    padding: 16,
  },
  messageRow: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'flex-end',
  },
  messageBubble: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxWidth: '75%',
  },
  senderName: {
    fontSize: 11,
    marginBottom: 4,
    fontWeight: '500',
  },
  messageText: {
    fontSize: 14,
  },
  messageTime: {
    fontSize: 10,
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    maxHeight: 100,
    borderWidth: 1,
    fontSize: 14,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
