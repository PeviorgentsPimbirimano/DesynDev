import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { Avatar } from '@/components/Avatar';
import { createOrGetConversation, getChats } from '@/utils/chatStorage';
import { mockFollowers } from '@/data/mockData';

export default function FollowersChatPage() {
  const { colors } = useTheme();
  const router = useRouter();
  const { user } = useAuth();
  const [searchText, setSearchText] = useState('');
  const [existingChats, setExistingChats] = useState(getChats());

  const filteredFollowers = mockFollowers.filter(follower =>
    follower.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleStartChat = (follower: any) => {
    if (!user) return;
    const conversationId = createOrGetConversation(
      follower.id,
      follower.name,
      follower.avatar
    );
    setExistingChats(getChats());
    router.back();
  };

  const renderFollower = ({ item }: any) => {
    const hasChat = existingChats.some(chat => chat.userId === item.id);

    return (
      <View style={[styles.followerCard, { borderBottomColor: colors.border }]}>
        <Avatar source={{ uri: item.avatar }} size={50} />
        <View style={styles.followerInfo}>
          <Text style={[styles.followerName, { color: colors.text }]}>{item.name}</Text>
          <Text style={[styles.followerRole, { color: colors.textSecondary }]}>{item.role}</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.chatButton,
            {
              backgroundColor: hasChat ? colors.primaryLight : colors.primary,
              borderColor: colors.primary,
            },
          ]}
          onPress={() => handleStartChat(item)}
        >
          <Text
            style={[
              styles.chatButtonText,
              { color: hasChat ? colors.text : '#fff' },
            ]}
          >
            {hasChat ? 'Open' : 'Chat'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft color={colors.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Start Chat</Text>
        <View style={{ width: 24 }} />
      </View>

      <TextInput
        style={[
          styles.searchInput,
          {
            backgroundColor: colors.inputBackground,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
        placeholder="Search followers..."
        placeholderTextColor={colors.textSecondary}
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredFollowers}
        renderItem={renderFollower}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
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
  listContent: {
    paddingHorizontal: 16,
  },
  followerCard: {
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  followerInfo: {
    flex: 1,
    marginHorizontal: 12,
  },
  followerName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  followerRole: {
    fontSize: 13,
  },
  chatButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  chatButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
