import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { mockNotifications } from '@/data/mockData';
import { Avatar } from '@/components/Avatar';
import { colors } from '@/constants/colors';
import { Heart, MessageCircle, UserPlus, Users } from 'lucide-react-native';
import { Notification } from '@/types';

export default function Notifications() {
  const router = useRouter();
  const { colors: themeColors } = useTheme();
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleNotificationPress = (notification: Notification) => {
    setNotifications(prev =>
      prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
    );

    if (notification.postId) {
      router.push(`/post/${notification.postId}`);
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return <Heart size={20} color="#ef4444" fill="#ef4444" />;
      case 'comment':
        return <MessageCircle size={20} color={colors.primary} />;
      case 'follow':
        return <UserPlus size={20} color={colors.success} />;
      case 'collaboration':
        return <Users size={20} color="#8b5cf6" />;
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.surface }]}>
      <View style={[styles.header, { backgroundColor: themeColors.background, borderBottomColor: themeColors.border }]}>
        <View>
          <Text style={[styles.title, { color: themeColors.text }]}>Notifications</Text>
          {unreadCount > 0 && (
            <Text style={[styles.unreadText, { color: themeColors.textSecondary }]}>{unreadCount} unread</Text>
          )}
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllAsRead}>
            <Text style={[styles.markReadText, { color: themeColors.primary }]}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.notificationCard, !item.read && styles.notificationCardUnread, { backgroundColor: !item.read ? undefined : themeColors.cardBackground }]}
            onPress={() => handleNotificationPress(item)}
          >
            <View style={styles.notificationIcon}>
              <Avatar uri={item.fromUserAvatar} size={48} />
              <View style={[styles.iconBadge, { backgroundColor: themeColors.background }]}>
                {getNotificationIcon(item.type)}
              </View>
            </View>

            <View style={styles.notificationContent}>
              <Text style={[styles.notificationText, { color: themeColors.text }]}>
                <Text style={[styles.notificationUserName, { color: themeColors.text }]}>{item.fromUserName}</Text>
                {' '}
                <Text style={[styles.notificationMessage, { color: themeColors.textSecondary }]}>{item.message}</Text>
              </Text>
              <Text style={[styles.notificationTime, { color: themeColors.textSecondary }]}>{formatTime(item.createdAt)}</Text>
            </View>

            {!item.read && <View style={[styles.unreadDot, { backgroundColor: themeColors.primary }]} />}
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={[styles.emptyStateText, { color: themeColors.text }]}>No notifications yet</Text>
            <Text style={[styles.emptyStateSubtext, { color: themeColors.textSecondary }]}>
              When someone likes or comments on your posts, you'll see it here
            </Text>
          </View>
        }
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  unreadText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  markReadText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  list: {
    padding: 16,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationCardUnread: {
    backgroundColor: '#fffbf5',
    borderWidth: 1,
    borderColor: '#ffe6cc',
  },
  notificationIcon: {
    position: 'relative',
    marginRight: 12,
  },
  iconBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.text,
    marginBottom: 4,
  },
  notificationUserName: {
    fontWeight: '600',
    color: colors.text,
  },
  notificationMessage: {
    color: colors.textSecondary,
  },
  notificationTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginLeft: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
