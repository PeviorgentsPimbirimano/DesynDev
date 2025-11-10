import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { MessageCircle } from 'lucide-react-native';
import { PostCard } from '@/components/PostCard';
import { useTheme } from '@/context/ThemeContext';
import { useChat } from '@/context/ChatContext';
import { mockPosts } from '@/data/mockData';
import { colors } from '@/constants/colors';
import { PostType } from '@/types';

export default function Home() {
  const router = useRouter();
  const { colors: themeColors } = useTheme();
  const { chats } = useChat();
  const [filter, setFilter] = useState<'all' | PostType>('all');

  const unreadCount = chats.reduce((sum, chat) => sum + chat.unreadCount, 0);

  const filteredPosts = filter === 'all'
    ? mockPosts
    : mockPosts.filter(post => post.type === filter);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'design', label: 'Designs' },
    { id: 'build', label: 'Builds' },
  ] as const;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.surface }]}>
      <View style={[styles.header, { backgroundColor: themeColors.background, borderBottomColor: themeColors.border }]}>
        <Text style={[styles.title, { color: themeColors.text }]}>Feed</Text>
        <View style={styles.filters}>
          {filters.map((f) => (
            <TouchableOpacity
              key={f.id}
              style={[styles.filterButton, filter === f.id && styles.filterButtonActive, { backgroundColor: filter === f.id ? themeColors.primary : themeColors.surface, borderColor: themeColors.border }]}
              onPress={() => setFilter(f.id)}
            >
              <Text style={[styles.filterText, filter === f.id && styles.filterTextActive, { color: filter === f.id ? themeColors.text : themeColors.textSecondary }]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={[styles.chatButton, { backgroundColor: themeColors.primary }]}
        onPress={() => router.push('/chat')}
      >
        <MessageCircle size={24} color={themeColors.text} />
        {unreadCount > 0 && (
          <View style={[styles.badge, { backgroundColor: themeColors.primary }]}>
            <Text style={[styles.badgeText, { color: themeColors.text }]}>{unreadCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  filters: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: colors.text,
  },
  list: {
    padding: 16,
  },
  chatButton: {
    position: 'absolute',
    bottom: 80,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
