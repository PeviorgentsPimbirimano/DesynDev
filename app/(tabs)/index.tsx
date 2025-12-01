import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { User } from 'lucide-react-native';
import { PostCard } from '@/components/PostCard';
import { LogoHeader } from '@/components/LogoHeader';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { Avatar } from '@/components/Avatar';
import { mockPosts } from '@/data/mockData';
import { colors } from '@/constants/colors';
import { PostType } from '@/types';

export default function Home() {
  const router = useRouter();
  const { colors: themeColors } = useTheme();
  const { user } = useAuth();
  const [filter, setFilter] = useState<'all' | PostType>('all');

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
      <LogoHeader />
      <View style={[styles.header, { backgroundColor: themeColors.background, borderBottomColor: themeColors.border }]}>
        <View style={styles.titleSection}>
          <Text style={[styles.title, { color: themeColors.text }]}>Feed</Text>
          {user && (
            <TouchableOpacity onPress={() => router.push('/profile')} style={styles.profileButton}>
              <Avatar uri={user.avatar} size={36} />
            </TouchableOpacity>
          )}
        </View>
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
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
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
});
