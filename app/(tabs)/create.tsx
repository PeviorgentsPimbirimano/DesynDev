import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { colors } from '@/constants/colors';
import { ImagePlus, Link2, X } from 'lucide-react-native';

export default function Create() {
  const router = useRouter();
  const { user } = useAuth();
  const { colors: themeColors } = useTheme();
  const [postType, setPostType] = useState<'design' | 'build'>('design');
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState('');
  const [figmaUrl, setFigmaUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const canShowDesign = user?.role === 'designer' || user?.role === 'both';
  const canShowBuild = user?.role === 'developer' || user?.role === 'both';

  const handleImagePick = () => {
    const mockImage = 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800';
    setSelectedImage(mockImage);
  };

  const handlePost = () => {
    if (!caption.trim()) {
      Alert.alert('Error', 'Please add a caption');
      return;
    }

    Alert.alert('Success', 'Post created successfully!', [
      {
        text: 'OK',
        onPress: () => {
          setCaption('');
          setTags('');
          setFigmaUrl('');
          setLiveUrl('');
          setGithubUrl('');
          setSelectedImage(null);
          router.push('/(tabs)');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.cancelText, { color: themeColors.textSecondary }]}>Cancel</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>Create Post</Text>
        <TouchableOpacity onPress={handlePost}>
          <Text style={[styles.postText, { color: themeColors.primary }]}>Post</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {(canShowDesign && canShowBuild) && (
          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[styles.typeButton, postType === 'design' && styles.typeButtonActive, { backgroundColor: postType === 'design' ? themeColors.primary : themeColors.surface, borderColor: themeColors.border }]}
              onPress={() => setPostType('design')}
            >
              <Text style={[styles.typeButtonText, postType === 'design' && styles.typeButtonTextActive, { color: postType === 'design' ? themeColors.text : themeColors.textSecondary }]}>
                Design
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.typeButton, postType === 'build' && styles.typeButtonActive, { backgroundColor: postType === 'build' ? themeColors.primary : themeColors.surface, borderColor: themeColors.border }]}
              onPress={() => setPostType('build')}
            >
              <Text style={[styles.typeButtonText, postType === 'build' && styles.typeButtonTextActive, { color: postType === 'build' ? themeColors.text : themeColors.textSecondary }]}>
                Build
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.section}>
          <TouchableOpacity style={[styles.imagePicker, { borderColor: themeColors.border }]} onPress={handleImagePick}>
            {selectedImage ? (
              <View style={styles.imageContainer}>
                <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => setSelectedImage(null)}
                >
                  <X size={20} color={themeColors.background} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={[styles.imagePickerContent, { backgroundColor: themeColors.surface }]}>
                <ImagePlus size={40} color={themeColors.textSecondary} />
                <Text style={[styles.imagePickerText, { color: themeColors.textSecondary }]}>Add Image</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.label, { color: themeColors.text }]}>Caption</Text>
          <TextInput
            style={[styles.textArea, { backgroundColor: themeColors.surface, borderColor: themeColors.border, color: themeColors.text }]}
            placeholder="Tell us about your work..."
            value={caption}
            onChangeText={setCaption}
            multiline
            numberOfLines={4}
            placeholderTextColor={themeColors.textSecondary}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.label, { color: themeColors.text }]}>Tags</Text>
          <TextInput
            style={[styles.input, { backgroundColor: themeColors.surface, borderColor: themeColors.border, color: themeColors.text }]}
            placeholder="design, mobile, ui (comma separated)"
            value={tags}
            onChangeText={setTags}
            placeholderTextColor={themeColors.textSecondary}
          />
        </View>

        {postType === 'design' && (
          <View style={styles.section}>
            <Text style={[styles.label, { color: themeColors.text }]}>Figma Link (Optional)</Text>
            <View style={[styles.inputWithIcon, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
              <Link2 size={20} color={themeColors.textSecondary} />
              <TextInput
                style={[styles.inputFlex, { color: themeColors.text }]}
                placeholder="https://figma.com/..."
                value={figmaUrl}
                onChangeText={setFigmaUrl}
                autoCapitalize="none"
                placeholderTextColor={themeColors.textSecondary}
              />
            </View>
          </View>
        )}

        {postType === 'build' && (
          <>
            <View style={styles.section}>
              <Text style={[styles.label, { color: themeColors.text }]}>Live Demo URL (Optional)</Text>
              <View style={[styles.inputWithIcon, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
                <Link2 size={20} color={themeColors.textSecondary} />
                <TextInput
                  style={[styles.inputFlex, { color: themeColors.text }]}
                  placeholder="https://example.com"
                  value={liveUrl}
                  onChangeText={setLiveUrl}
                  autoCapitalize="none"
                  placeholderTextColor={themeColors.textSecondary}
                />
              </View>
            </View>

            <View style={styles.section}>
              <Text style={[styles.label, { color: themeColors.text }]}>GitHub URL (Optional)</Text>
              <View style={[styles.inputWithIcon, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
                <Link2 size={20} color={themeColors.textSecondary} />
                <TextInput
                  style={[styles.inputFlex, { color: themeColors.text }]}
                  placeholder="https://github.com/..."
                  value={githubUrl}
                  onChangeText={setGithubUrl}
                  autoCapitalize="none"
                  placeholderTextColor={themeColors.textSecondary}
                />
              </View>
            </View>
          </>
        )}
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  cancelText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  postText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  typeSelector: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  typeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  typeButtonTextActive: {
    color: colors.text,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  imagePicker: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  imagePickerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  imagePickerText: {
    marginTop: 8,
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    padding: 8,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textArea: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  inputFlex: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
});
