import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Avatar } from '@/components/Avatar';
import { colors } from '@/constants/colors';
import { ArrowLeft, Camera, X } from 'lucide-react-native';
import { UserRole } from '@/types';

export default function EditProfile() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const { colors: themeColors } = useTheme();

  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [role, setRole] = useState<UserRole>(user?.role || 'both');
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>(user?.skills || []);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Name is required');
      return;
    }

    updateUser({
      name,
      bio,
      role,
      skills,
    });

    Alert.alert('Success', 'Profile updated successfully!', [
      {
        text: 'OK',
        onPress: () => router.back(),
      },
    ]);
  };

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={themeColors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={[styles.saveText, { color: themeColors.primary }]}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarSection}>
          <Avatar uri={user?.avatar || ''} size={100} />
          <TouchableOpacity style={[styles.changeAvatarButton, { backgroundColor: themeColors.surface }]}>
            <Camera size={20} color={themeColors.primary} />
            <Text style={[styles.changeAvatarText, { color: themeColors.primary }]}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.label, { color: themeColors.text }]}>Name</Text>
          <TextInput
            style={[styles.input, { backgroundColor: themeColors.surface, color: themeColors.text, borderColor: themeColors.border }]}
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor={themeColors.textSecondary}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.label, { color: themeColors.text }]}>Bio</Text>
          <TextInput
            style={[styles.textArea, { backgroundColor: themeColors.surface, color: themeColors.text, borderColor: themeColors.border }]}
            value={bio}
            onChangeText={setBio}
            placeholder="Tell us about yourself..."
            placeholderTextColor={themeColors.textSecondary}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.label, { color: themeColors.text }]}>Role</Text>
          <View style={styles.roleButtons}>
            {(['designer', 'developer', 'both'] as UserRole[]).map((r) => (
              <TouchableOpacity
                key={r}
                style={[styles.roleButton, role === r && styles.roleButtonActive, { backgroundColor: role === r ? themeColors.primary : themeColors.surface, borderColor: themeColors.border }]}
                onPress={() => setRole(r)}
              >
                <Text style={[styles.roleButtonText, role === r && styles.roleButtonTextActive, { color: role === r ? themeColors.text : themeColors.textSecondary }]}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.label, { color: themeColors.text }]}>Skills</Text>
          <View style={styles.skillInputContainer}>
            <TextInput
              style={[styles.skillInput, { backgroundColor: themeColors.surface, color: themeColors.text, borderColor: themeColors.border }]}
              value={skillInput}
              onChangeText={setSkillInput}
              placeholder="Add a skill"
              placeholderTextColor={themeColors.textSecondary}
              onSubmitEditing={addSkill}
            />
            <TouchableOpacity style={[styles.addButton, { backgroundColor: themeColors.primary }]} onPress={addSkill}>
              <Text style={[styles.addButtonText, { color: themeColors.text }]}>Add</Text>
            </TouchableOpacity>
          </View>
          {skills.length > 0 && (
            <View style={styles.skillsList}>
              {skills.map((skill, index) => (
                <View key={index} style={[styles.skillTag, { backgroundColor: themeColors.primary }]}>
                  <Text style={[styles.skillTagText, { color: themeColors.text }]}>{skill}</Text>
                  <TouchableOpacity onPress={() => removeSkill(skill)}>
                    <X size={16} color={themeColors.text} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
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
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  saveText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  changeAvatarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.surface,
  },
  changeAvatarText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
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
  roleButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  roleButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  roleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  roleButtonTextActive: {
    color: colors.text,
  },
  skillInputContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  skillInput: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  skillTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  skillTagText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
});
