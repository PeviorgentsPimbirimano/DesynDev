import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { colors } from '@/constants/colors';
import { Mail, Lock, User, X } from 'lucide-react-native';
import { UserRole } from '@/types';
import { saveUserProfile } from '@/utils/localStorage';

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();
  const { colors: themeColors } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('both');
  const [biography, setBiography] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleRegister = async () => {
    if (!name || !email || !password || !biography || skills.length === 0) return;

    setIsLoading(true);
    try {
      await register(email, password, name, selectedRole);

      saveUserProfile({
        name,
        email,
        role: selectedRole,
        skills,
        portfolio: portfolio.trim() || undefined,
        biography,
        createdAt: new Date().toISOString(),
      });

      router.replace('/(tabs)');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: themeColors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/image.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.header}>
          <Text style={[styles.title, { color: themeColors.text }]}>Create Account</Text>
          <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>Join the creative community</Text>
        </View>

        <View style={styles.form}>
          <View style={[styles.inputContainer, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
            <View style={styles.inputIcon}>
              <User size={20} color={themeColors.textSecondary} />
            </View>
            <TextInput
              style={[styles.input, { color: themeColors.text }]}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              placeholderTextColor={themeColors.textSecondary}
            />
          </View>

          <View style={[styles.inputContainer, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
            <View style={styles.inputIcon}>
              <Mail size={20} color={themeColors.textSecondary} />
            </View>
            <TextInput
              style={[styles.input, { color: themeColors.text }]}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor={themeColors.textSecondary}
            />
          </View>

          <View style={[styles.inputContainer, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
            <View style={styles.inputIcon}>
              <Lock size={20} color={themeColors.textSecondary} />
            </View>
            <TextInput
              style={[styles.input, { color: themeColors.text }]}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor={themeColors.textSecondary}
            />
          </View>

          <View style={styles.roleSection}>
            <Text style={[styles.roleLabel, { color: themeColors.text }]}>I am a:</Text>
            <View style={styles.roleButtons}>
              {(['designer', 'developer', 'both'] as UserRole[]).map((role) => (
                <TouchableOpacity
                  key={role}
                  style={[
                    styles.roleButton,
                    selectedRole === role && styles.roleButtonSelected,
                    { backgroundColor: selectedRole === role ? themeColors.primary : themeColors.surface, borderColor: themeColors.border },
                  ]}
                  onPress={() => setSelectedRole(role)}
                >
                  <Text
                    style={[
                      styles.roleButtonText,
                      selectedRole === role && styles.roleButtonTextSelected,
                      { color: selectedRole === role ? themeColors.text : themeColors.textSecondary },
                    ]}
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={[styles.inputContainer, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
            <TextInput
              style={[styles.textArea, { color: themeColors.text }]}
              placeholder="Biography (Required)"
              value={biography}
              onChangeText={setBiography}
              placeholderTextColor={themeColors.textSecondary}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={[styles.inputContainer, { backgroundColor: themeColors.surface, borderColor: themeColors.border }]}>
            <TextInput
              style={[styles.input, { color: themeColors.text }]}
              placeholder="Portfolio URL (Optional)"
              value={portfolio}
              onChangeText={setPortfolio}
              placeholderTextColor={themeColors.textSecondary}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.skillsSection}>
            <Text style={[styles.roleLabel, { color: themeColors.text }]}>Add Skills (Required):</Text>
            <View style={styles.skillInputContainer}>
              <View style={[styles.inputContainer, { backgroundColor: themeColors.surface, borderColor: themeColors.border, flex: 1 }]}>
                <TextInput
                  style={[styles.input, { color: themeColors.text }]}
                  placeholder="Enter a skill"
                  value={skillInput}
                  onChangeText={setSkillInput}
                  placeholderTextColor={themeColors.textSecondary}
                  onSubmitEditing={addSkill}
                />
              </View>
              <TouchableOpacity
                style={[styles.addSkillButton, { backgroundColor: themeColors.primary }]}
                onPress={addSkill}
              >
                <Text style={[styles.addSkillButtonText, { color: themeColors.text }]}>Add</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.skillsList}>
              {skills.map((skill) => (
                <View
                  key={skill}
                  style={[styles.skillTag, { backgroundColor: themeColors.primary }]}
                >
                  <Text style={[styles.skillTagText, { color: themeColors.text }]}>{skill}</Text>
                  <TouchableOpacity onPress={() => removeSkill(skill)}>
                    <X size={16} color={themeColors.text} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={[styles.registerButton, { backgroundColor: themeColors.primary }]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={themeColors.text} />
            ) : (
              <Text style={[styles.registerButtonText, { color: themeColors.text }]}>Create Account</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => router.back()}
          >
            <Text style={[styles.loginLinkText, { color: themeColors.textSecondary }]}>
              Already have an account? <Text style={[styles.loginLinkBold, { color: themeColors.text }]}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 200,
    height: 200,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputIcon: {
    paddingLeft: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    fontSize: 16,
    color: colors.text,
  },
  textArea: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 16,
    color: colors.text,
    textAlignVertical: 'top',
  },
  roleSection: {
    marginTop: 8,
  },
  skillsSection: {
    marginTop: 8,
  },
  skillInputContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  addSkillButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addSkillButtonText: {
    fontSize: 14,
    fontWeight: '600',
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
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: colors.primary,
  },
  skillTagText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  roleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  roleButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  roleButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  roleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  roleButtonTextSelected: {
    color: colors.text,
  },
  registerButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  loginLink: {
    alignItems: 'center',
    marginTop: 8,
  },
  loginLinkText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  loginLinkBold: {
    fontWeight: '600',
    color: colors.text,
  },
});
