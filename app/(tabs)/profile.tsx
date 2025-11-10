import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Avatar } from '@/components/Avatar';
import { colors } from '@/constants/colors';
import { Settings, Grid, LayoutGrid, Sun, Moon } from 'lucide-react-native';
import { mockPosts } from '@/data/mockData';

const { width } = Dimensions.get('window');
const ITEM_SIZE = (width - 48) / 3;

export default function Profile() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { isDark, colors: themeColors, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'designs' | 'builds'>('designs');

  if (!user) {
    return null;
  }

  const userPosts = mockPosts.slice(0, 6);
  const designs = userPosts.filter(p => p.type === 'design');
  const builds = userPosts.filter(p => p.type === 'build');
  const displayPosts = activeTab === 'designs' ? designs : builds;

  const handleLogout = () => {
    logout();
    router.replace('/auth/login');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>Profile</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={toggleTheme}>
            {isDark ? (
              <Sun size={24} color={themeColors.text} />
            ) : (
              <Moon size={24} color={themeColors.text} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/settings')}>
            <Settings size={24} color={themeColors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <Avatar uri={user.avatar} size={80} />
          <Text style={[styles.name, { color: themeColors.text }]}>{user.name}</Text>
          <View style={[styles.roleBadge, { backgroundColor: themeColors.primary }]}>
            <Text style={[styles.roleBadgeText, { color: themeColors.text }]}>
              {user.role === 'both' ? 'Designer & Developer' : user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </Text>
          </View>
          <Text style={[styles.bio, { color: themeColors.textSecondary }]}>{user.bio}</Text>

          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={[styles.statValue, { color: themeColors.text }]}>{userPosts.length}</Text>
              <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>Posts</Text>
            </View>
            <View style={styles.stat}>
              <Text style={[styles.statValue, { color: themeColors.text }]}>{user.followers}</Text>
              <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>Followers</Text>
            </View>
            <View style={styles.stat}>
              <Text style={[styles.statValue, { color: themeColors.text }]}>{user.following}</Text>
              <Text style={[styles.statLabel, { color: themeColors.textSecondary }]}>Following</Text>
            </View>
          </View>

          <TouchableOpacity style={[styles.editButton, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]} onPress={() => router.push('/edit-profile')}>
            <Text style={[styles.editButtonText, { color: themeColors.text }]}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {user.skills.length > 0 && (
          <View style={styles.skillsSection}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Skills</Text>
            <View style={styles.skills}>
              {user.skills.map((skill, index) => (
                <View key={index} style={[styles.skill, { backgroundColor: themeColors.primary }]}>
                  <Text style={[styles.skillText, { color: themeColors.text }]}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.portfolioSection}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Portfolio</Text>

          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'designs' && styles.tabActive, { backgroundColor: activeTab === 'designs' ? themeColors.primary : themeColors.surface, borderColor: themeColors.border }]}
              onPress={() => setActiveTab('designs')}
            >
              <LayoutGrid size={20} color={activeTab === 'designs' ? themeColors.text : themeColors.textSecondary} />
              <Text style={[styles.tabText, activeTab === 'designs' && styles.tabTextActive, { color: activeTab === 'designs' ? themeColors.text : themeColors.textSecondary }]}>
                Designs ({designs.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'builds' && styles.tabActive, { backgroundColor: activeTab === 'builds' ? themeColors.primary : themeColors.surface, borderColor: themeColors.border }]}
              onPress={() => setActiveTab('builds')}
            >
              <Grid size={20} color={activeTab === 'builds' ? themeColors.text : themeColors.textSecondary} />
              <Text style={[styles.tabText, activeTab === 'builds' && styles.tabTextActive, { color: activeTab === 'builds' ? themeColors.text : themeColors.textSecondary }]}>
                Builds ({builds.length})
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.grid}>
            {displayPosts.map((post) => (
              <TouchableOpacity
                key={post.id}
                style={styles.gridItem}
                onPress={() => router.push(`/post/${post.id}`)}
              >
                <Image source={{ uri: post.images[0] }} style={[styles.gridImage, { backgroundColor: themeColors.surface }]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={[styles.logoutButton, { backgroundColor: themeColors.surface, borderColor: themeColors.error }]} onPress={handleLogout}>
          <Text style={[styles.logoutButtonText, { color: themeColors.error }]}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
  },
  roleBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  bio: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
  },
  stats: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 32,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  editButton: {
    marginTop: 24,
    backgroundColor: colors.surface,
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  editButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  skillsSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skill: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  skillText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  portfolioSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  tabs: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.text,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  gridItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: 8,
    overflow: 'hidden',
  },
  gridImage: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.surface,
  },
  logoutButton: {
    marginHorizontal: 16,
    marginBottom: 32,
    backgroundColor: colors.surface,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.error,
  },
  logoutButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.error,
  },
});
