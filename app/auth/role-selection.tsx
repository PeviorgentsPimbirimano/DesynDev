import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { UserRole } from '@/types';
import { colors } from '@/constants/colors';
import { UserCircle, Code, PaintBucket } from 'lucide-react-native';

export default function RoleSelection() {
  const router = useRouter();
  const params = useLocalSearchParams<{ email: string; password: string; name: string }>();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const roles = [
    {
      id: 'designer' as UserRole,
      title: 'Designer',
      description: 'I create beautiful UI/UX designs',
      icon: PaintBucket,
    },
    {
      id: 'developer' as UserRole,
      title: 'Developer',
      description: 'I build functional applications',
      icon: Code,
    },
    {
      id: 'both' as UserRole,
      title: 'Both',
      description: 'I design and develop',
      icon: UserCircle,
    },
  ];

  const handleContinue = () => {
    if (selectedRole) {
      router.replace('/auth/login');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose Your Role</Text>
        <Text style={styles.subtitle}>Select how you want to contribute</Text>
      </View>

      <View style={styles.rolesContainer}>
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.id;

          return (
            <TouchableOpacity
              key={role.id}
              style={[styles.roleCard, isSelected && styles.roleCardSelected]}
              onPress={() => setSelectedRole(role.id)}
            >
              <View style={[styles.iconContainer, isSelected && styles.iconContainerSelected]}>
                <Icon size={32} color={isSelected ? colors.primary : colors.textSecondary} />
              </View>
              <Text style={[styles.roleTitle, isSelected && styles.roleTitleSelected]}>
                {role.title}
              </Text>
              <Text style={styles.roleDescription}>{role.description}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={[styles.continueButton, !selectedRole && styles.continueButtonDisabled]}
        onPress={handleContinue}
        disabled={!selectedRole}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 24,
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  rolesContainer: {
    gap: 16,
    marginBottom: 32,
  },
  roleCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: colors.border,
  },
  roleCardSelected: {
    borderColor: colors.primary,
    backgroundColor: '#fffbf5',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconContainerSelected: {
    backgroundColor: '#fff5e6',
  },
  roleTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  roleTitleSelected: {
    color: colors.primary,
  },
  roleDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  continueButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: colors.border,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
});
