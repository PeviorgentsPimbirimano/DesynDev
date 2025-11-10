import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Post } from '@/types';
import { Avatar } from './Avatar';
import { useTheme } from '@/context/ThemeContext';
import { colors } from '@/constants/colors';
import { Heart, MessageCircle, ExternalLink, Code, Handshake } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';

interface PostCardProps {
  post: Post;
}

const { width } = Dimensions.get('window');

export function PostCard({ post }: PostCardProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { colors: themeColors } = useTheme();
  const [hasRequested, setHasRequested] = useState(false);

  const handlePress = () => {
    router.push(`/post/${post.id}`);
  };

  const handleCollaborationRequest = () => {
    if (user?.role === 'developer' || user?.role === 'both') {
      Alert.alert(
        'Request Collaboration',
        `Send collaboration request to ${post.userName}?`,
        [
          { text: 'Cancel', onPress: () => {}, style: 'cancel' },
          {
            text: 'Send Request',
            onPress: () => {
              setHasRequested(true);
              Alert.alert('Success', `Collaboration request sent to ${post.userName}!`);
              setTimeout(() => setHasRequested(false), 3000);
            },
          },
        ]
      );
    } else {
      Alert.alert('Only for Developers', 'Only developers can request collaboration on designs.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.cardBackground }]}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
        <View style={styles.header}>
          <Avatar uri={post.userAvatar} size={40} />
          <View style={styles.headerInfo}>
            <Text style={[styles.userName, { color: themeColors.text }]}>{post.userName}</Text>
            <View style={styles.roleContainer}>
              <View style={[styles.roleBadge, styles[`${post.userRole}Badge`]]}>
                <Text style={[styles.roleText, { color: themeColors.text }]}>
                  {post.userRole === 'both' ? 'Designer & Developer' : post.userRole.charAt(0).toUpperCase() + post.userRole.slice(1)}
                </Text>
              </View>
              <View style={[styles.typeBadge, post.type === 'design' ? styles.designBadge : styles.buildBadge]}>
                <Text style={[styles.typeText, { color: themeColors.text }]}>{post.type === 'design' ? 'Design' : 'Build'}</Text>
              </View>
            </View>
          </View>
        </View>

        {post.images.length > 0 && (
          <Image source={{ uri: post.images[0] }} style={[styles.image, { backgroundColor: themeColors.surface }]} />
        )}

        <View style={styles.content}>
          <Text style={[styles.caption, { color: themeColors.text }]} numberOfLines={3}>
            {post.caption}
          </Text>

          {post.tags.length > 0 && (
            <View style={styles.tags}>
              {post.tags.slice(0, 3).map((tag, index) => (
                <View key={index} style={[styles.tag, { backgroundColor: themeColors.surface }]}>
                  <Text style={[styles.tagText, { color: themeColors.textSecondary }]}>#{tag}</Text>
                </View>
              ))}
              {post.tags.length > 3 && (
                <Text style={[styles.moreTagsText, { color: themeColors.textSecondary }]}>+{post.tags.length - 3}</Text>
              )}
            </View>
          )}

          {(post.figmaUrl || post.liveUrl || post.githubUrl) && (
            <View style={styles.links}>
              {post.figmaUrl && (
                <View style={[styles.linkBadge, { backgroundColor: themeColors.primary }]}>
                  <ExternalLink size={14} color={themeColors.text} />
                  <Text style={[styles.linkText, { color: themeColors.text }]}>Figma</Text>
                </View>
              )}
              {post.liveUrl && (
                <View style={[styles.linkBadge, { backgroundColor: themeColors.primary }]}>
                  <ExternalLink size={14} color={themeColors.text} />
                  <Text style={[styles.linkText, { color: themeColors.text }]}>Live Demo</Text>
                </View>
              )}
              {post.githubUrl && (
                <View style={[styles.linkBadge, { backgroundColor: themeColors.primary }]}>
                  <Code size={14} color={themeColors.text} />
                  <Text style={[styles.linkText, { color: themeColors.text }]}>GitHub</Text>
                </View>
              )}
            </View>
          )}
        </View>

        <View style={[styles.footer, { borderTopColor: themeColors.border }]}>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Heart size={20} color={themeColors.textSecondary} />
              <Text style={[styles.statText, { color: themeColors.text }]}>{post.likes}</Text>
            </View>
            <View style={styles.stat}>
              <MessageCircle size={20} color={themeColors.textSecondary} />
              <Text style={[styles.statText, { color: themeColors.text }]}>{post.comments.length}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {post.type === 'design' && (
        <TouchableOpacity
          style={[styles.collaborationButton, hasRequested && styles.collaborationButtonRequested, { backgroundColor: hasRequested ? '#e6ffe6' : themeColors.primary, borderColor: hasRequested ? colors.success : themeColors.primary }]}
          onPress={handleCollaborationRequest}
        >
          <Handshake size={18} color={hasRequested ? colors.success : themeColors.text} />
          <Text style={[styles.collaborationButtonText, hasRequested && styles.collaborationButtonTextRequested, { color: hasRequested ? colors.success : themeColors.text }]}>
            {hasRequested ? 'Request Sent' : 'Request Collaboration'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerInfo: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  roleContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  designerBadge: {
    backgroundColor: '#ffe6f0',
  },
  developerBadge: {
    backgroundColor: '#e6f0ff',
  },
  bothBadge: {
    backgroundColor: '#f0e6ff',
  },
  roleText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.text,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  designBadge: {
    backgroundColor: '#fff5e6',
  },
  buildBadge: {
    backgroundColor: '#e6ffe6',
  },
  typeText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.text,
  },
  image: {
    width: '100%',
    height: width - 32,
    backgroundColor: colors.surface,
  },
  content: {
    padding: 16,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.text,
    marginBottom: 12,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  moreTagsText: {
    fontSize: 12,
    color: colors.textSecondary,
    alignSelf: 'center',
  },
  links: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  linkBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#fff5e6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  linkText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  stats: {
    flexDirection: 'row',
    gap: 20,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    fontFamily: 'Barlow-SemiBold',
  },
  collaborationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 12,
    backgroundColor: '#fff5e6',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  collaborationButtonRequested: {
    backgroundColor: '#e6ffe6',
    borderColor: colors.success,
  },
  collaborationButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
    fontFamily: 'Barlow-SemiBold',
  },
  collaborationButtonTextRequested: {
    color: colors.success,
  },
});
