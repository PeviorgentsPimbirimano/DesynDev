import React, { useState } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ChatConversation } from '@/types/chat';
import ChatListScreen from './ChatListScreen';
import ChatDetailScreen from './ChatDetailScreen';

interface ChatOverlayProps {
  visible: boolean;
  onClose: () => void;
}

export default function ChatOverlay({ visible, onClose }: ChatOverlayProps) {
  const { colors } = useTheme();
  const [selectedChat, setSelectedChat] = useState<ChatConversation | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSelectChat = (conversation: ChatConversation) => {
    setSelectedChat(conversation);
  };

  const handleBackToList = () => {
    setSelectedChat(null);
    setRefreshKey(prev => prev + 1);
  };

  const handleUpdate = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {selectedChat === null ? (
          <ChatListScreen
            key={refreshKey}
            onSelectChat={handleSelectChat}
            onClose={onClose}
          />
        ) : (
          <ChatDetailScreen
            conversation={selectedChat}
            onBack={handleBackToList}
            onUpdate={handleUpdate}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
