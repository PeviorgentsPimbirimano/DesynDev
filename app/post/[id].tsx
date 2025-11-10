import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { mockPosts } from '@/data/mockData';
import { Avatar } from '@/components/Avatar';
import { colors } from '@/constants/colors';
import { Heart, MessageCircle, ArrowLeft, Send, ExternalLink, Code, Handshake } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';

export default function PostDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const { colors: themeColors } = useTheme();
  const post = mockPosts.find((p) => p.id === id);

  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post?.likes || 0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post?.comments || []);
  const [hasRequested, setHasRequested] = useState(false);

  if (!post) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Post not found</Text>
      </SafeAreaView>
    );
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const handleComment = () => {
    if (!comment.trim() || !user) return;

    const newComment = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      text: comment,
      createdAt: new Date().toISOString(),
    };

    setComments([...comments, newComment]);
    setComment('');
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
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <View style={[styles.header, { borderBottomColor: themeColors.border, backgroundColor: themeColors.background }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color={themeColors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: themeColors.text }]}>Post</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.userInfo}>
            <Avatar uri={post.userAvatar} size={48} />
            <View style={styles.userDetails}>
              <Text style={[styles.userName, { color: themeColors.text }]}>{post.userName}</Text>
              <View style={styles.badges}>
                <View style={[styles.badge, styles[`${post.userRole}Badge`]]}>
                  <Text style={[styles.badgeText, { color: themeColors.text }]}>
                    {post.userRole === 'both' ? 'Designer & Developer' : post.userRole.charAt(0).toUpperCase() + post.userRole.slice(1)}
                  </Text>
                </View>
                <View style={[styles.badge, post.type === 'design' ? styles.designBadge : styles.buildBadge]}>
                  <Text style={[styles.badgeText, { color: themeColors.text }]}>{post.type === 'design' ? 'Design' : 'Build'}</Text>
                </View>
              </View>
            </View>
          </View>

          {post.images.length > 0 && (
            <Image source={{ uri: post.images[0] }} style={[styles.image, { backgroundColor: themeColors.surface }]} />
          )}

          <View style={styles.content}>
            <View style={styles.actions}>
              <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
                <Heart
                  size={28}
                  color={isLiked ? '#ef4444' : themeColors.text}
                  fill={isLiked ? '#ef4444' : 'none'}
                />
                <Text style={[styles.actionText, { color: themeColors.text }]}>{likesCount}</Text>
              </TouchableOpacity>
              <View style={styles.actionButton}>
                <MessageCircle size={28} color={themeColors.text} />
                <Text style={[styles.actionText, { color: themeColors.text }]}>{comments.length}</Text>
              </View>
            </View>

            <Text style={[styles.caption, { color: themeColors.text }]}>{post.caption}</Text>

            {post.tags.length > 0 && (
              <View style={styles.tags}>
                {post.tags.map((tag, index) => (
                  <View key={index} style={[styles.tag, { backgroundColor: themeColors.surface }]}>
                    <Text style={[styles.tagText, { color: themeColors.textSecondary }]}>#{tag}</Text>
                  </View>
                ))}
              </View>
            )}

            {(post.figmaUrl || post.liveUrl || post.githubUrl) && (
              <View style={styles.links}>
                {post.figmaUrl && (
                  <TouchableOpacity style={[styles.linkButton, { backgroundColor: themeColors.primary }]}>
                    <ExternalLink size={16} color={themeColors.text} />
                    <Text style={[styles.linkText, { color: themeColors.text }]}>View in Figma</Text>
                  </TouchableOpacity>
                )}
                {post.liveUrl && (
                  <TouchableOpacity style={[styles.linkButton, { backgroundColor: themeColors.primary }]}>
                    <ExternalLink size={16} color={themeColors.text} />
                    <Text style={[styles.linkText, { color: themeColors.text }]}>Live Demo</Text>
                  </TouchableOpacity>
                )}
                {post.githubUrl && (
                  <TouchableOpacity style={[styles.linkButton, { backgroundColor: themeColors.primary }]}>
                    <Code size={16} color={themeColors.text} />
                    <Text style={[styles.linkText, { color: themeColors.text }]}>GitHub Repository</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {post.type === 'design' && (
              <TouchableOpacity
                style={[styles.collaborationButton, hasRequested && styles.collaborationButtonRequested, { backgroundColor: hasRequested ? '#e6ffe6' : themeColors.primary, borderColor: hasRequested ? colors.success : themeColors.primary }]}
                onPress={handleCollaborationRequest}
              >
                <Handshake size={20} color={hasRequested ? colors.success : themeColors.text} />
                <Text style={[styles.collaborationButtonText, hasRequested && styles.collaborationButtonTextRequested, { color: hasRequested ? colors.success : themeColors.text }]}>
                  {hasRequested ? 'Request Sent' : 'Request Collaboration'}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.commentsSection}>
            <Text style={[styles.commentsTitle, { color: themeColors.text }]}>Comments ({comments.length})</Text>
            {comments.map((c) => (
              <View key={c.id} style={styles.commentItem}>
                <Avatar uri={c.userAvatar} size={32} />
                <View style={[styles.commentContent, { backgroundColor: themeColors.surface }]}>
                  <Text style={[styles.commentUserName, { color: themeColors.text }]}>{c.userName}</Text>
                  <Text style={[styles.commentText, { color: themeColors.text }]}>{c.text}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={[styles.commentInputContainer, { borderTopColor: themeColors.border, backgroundColor: themeColors.background }]}>
          <Avatar uri={user?.avatar || ''} size={32} />
          <TextInput
            style={[styles.commentInput, { backgroundColor: themeColors.surface, color: themeColors.text }]}
            placeholder="Add a comment..."
            value={comment}
            onChangeText={setComment}
            placeholderTextColor={themeColors.textSecondary}
          />
          <TouchableOpacity onPress={handleComment} disabled={!comment.trim()}>
            <Send size={24} color={comment.trim() ? themeColors.primary : themeColors.textSecondary} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  placeholder: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  userDetails: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  badges: {
    flexDirection: 'row',
    gap: 6,
  },
  badge: {
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
  designBadge: {
    backgroundColor: '#fff5e6',
  },
  buildBadge: {
    backgroundColor: '#e6ffe6',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.text,
  },
  image: {
    width: '100%',
    height: 400,
    backgroundColor: colors.surface,
  },
  content: {
    padding: 16,
  },
  actions: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  caption: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.text,
    marginBottom: 12,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  links: {
    gap: 12,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fff5e6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  commentsSection: {
    padding: 16,
    paddingTop: 0,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  commentContent: {
    marginLeft: 12,
    flex: 1,
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 12,
  },
  commentUserName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.text,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
    gap: 12,
  },
  commentInput: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.text,
  },
  collaborationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 16,
    paddingVertical: 14,
    backgroundColor: '#fff5e6',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  collaborationButtonRequested: {
    backgroundColor: '#e6ffe6',
    borderColor: colors.success,
  },
  collaborationButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    fontFamily: 'Barlow-SemiBold',
  },
  collaborationButtonTextRequested: {
    color: colors.success,
  },
});
