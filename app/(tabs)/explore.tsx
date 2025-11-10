import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { mockPosts } from '@/data/mockData';
import { Avatar } from '@/components/Avatar';
import { colors } from '@/constants/colors';
import { Search, TrendingUp } from 'lucide-react-native';

export default function Explore() {
  const router = useRouter();
  const { colors: themeColors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'designs' | 'builds' | 'users'>('all');

  const featuredPost = mockPosts[0];
  const trendingTags = ['banking', 'fintech', 'fitness', 'mobile', 'dashboard', 'ecommerce'];

  const filteredResults = mockPosts.filter(post => {
    const matchesSearch = post.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.userName.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'designs') return matchesSearch && post.type === 'design';
    if (activeFilter === 'builds') return matchesSearch && post.type === 'build';
    return matchesSearch;
  });

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'designs', label: 'Designs' },
    { id: 'builds', label: 'Builds' },
    { id: 'users', label: 'Users' },
  ] as const;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.surface }]}>
      <View style={[styles.header, { backgroundColor: themeColors.background, borderBottomColor: themeColors.border }]}>
        <Text style={[styles.title, { color: themeColors.text }]}>Explore</Text>
        <View style={[styles.searchContainer, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
          <Search size={20} color={themeColors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: themeColors.text }]}
            placeholder="Search posts, tags, or users..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={themeColors.textSecondary}
          />
        </View>

        <View style={styles.filters}>
          {filters.map((f) => (
            <TouchableOpacity
              key={f.id}
              style={[styles.filterButton, activeFilter === f.id && styles.filterButtonActive, { backgroundColor: activeFilter === f.id ? themeColors.primary : themeColors.surface, borderColor: themeColors.border }]}
              onPress={() => setActiveFilter(f.id)}
            >
              <Text style={[styles.filterText, activeFilter === f.id && styles.filterTextActive, { color: activeFilter === f.id ? themeColors.text : themeColors.textSecondary }]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={filteredResults}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          !searchQuery ? (
            <View>
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <TrendingUp size={20} color={themeColors.primary} />
                  <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Featured Project</Text>
                </View>
                <TouchableOpacity
                  style={[styles.featuredCard, { backgroundColor: themeColors.cardBackground }]}
                  onPress={() => router.push(`/post/${featuredPost.id}`)}
                >
                  <Image source={{ uri: featuredPost.images[0] }} style={[styles.featuredImage, { backgroundColor: themeColors.surface }]} />
                  <View style={styles.featuredContent}>
                    <View style={styles.featuredUser}>
                      <Avatar uri={featuredPost.userAvatar} size={32} />
                      <Text style={[styles.featuredUserName, { color: themeColors.text }]}>{featuredPost.userName}</Text>
                    </View>
                    <Text style={[styles.featuredCaption, { color: themeColors.textSecondary }]} numberOfLines={2}>
                      {featuredPost.caption}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Trending Tags</Text>
                <View style={styles.tags}>
                  {trendingTags.map((tag, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[styles.tag, { backgroundColor: themeColors.primary }]}
                      onPress={() => setSearchQuery(tag)}
                    >
                      <Text style={[styles.tagText, { color: themeColors.text }]}>#{tag}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Discover</Text>
              </View>
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.resultCard, { backgroundColor: themeColors.cardBackground }]}
            onPress={() => router.push(`/post/${item.id}`)}
          >
            <Image source={{ uri: item.images[0] }} style={[styles.resultImage, { backgroundColor: themeColors.surface }]} />
            <View style={styles.resultContent}>
              <View style={styles.resultHeader}>
                <Avatar uri={item.userAvatar} size={32} />
                <View style={styles.resultInfo}>
                  <Text style={[styles.resultUserName, { color: themeColors.text }]}>{item.userName}</Text>
                  <View style={styles.resultBadges}>
                    <View style={[styles.badge, item.type === 'design' ? styles.designBadge : styles.buildBadge]}>
                      <Text style={[styles.badgeText, { color: themeColors.text }]}>{item.type}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <Text style={[styles.resultCaption, { color: themeColors.textSecondary }]} numberOfLines={2}>
                {item.caption}
              </Text>
            </View>
          </TouchableOpacity>
        )}
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: colors.text,
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
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  featuredCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featuredImage: {
    width: '100%',
    height: 200,
    backgroundColor: colors.surface,
  },
  featuredContent: {
    padding: 16,
  },
  featuredUser: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  featuredUserName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  featuredCaption: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  resultCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  resultImage: {
    width: '100%',
    height: 150,
    backgroundColor: colors.surface,
  },
  resultContent: {
    padding: 12,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultInfo: {
    marginLeft: 8,
    flex: 1,
  },
  resultUserName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  resultBadges: {
    flexDirection: 'row',
    gap: 4,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  designBadge: {
    backgroundColor: '#fff5e6',
  },
  buildBadge: {
    backgroundColor: '#e6ffe6',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.text,
  },
  resultCaption: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.textSecondary,
  },
});
