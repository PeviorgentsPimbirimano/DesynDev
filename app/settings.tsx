import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { colors } from '@/constants/colors';
import { ArrowLeft, ChevronRight, User, Bell, Shield, HelpCircle, Info, LucideIcon } from 'lucide-react-native';
import { useState } from 'react';

type SettingItem = {
  icon: LucideIcon;
  label: string;
  onPress?: () => void;
  value?: boolean;
  onToggle?: (value: boolean) => void;
};

type SettingSection = {
  title: string;
  items: SettingItem[];
};

export default function Settings() {
  const router = useRouter();
  const { colors: themeColors } = useTheme();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);

  const handleAbout = () => {
    Alert.alert('About', 'Designer-Developer Community Platform v1.0.0');
  };

  const handleHelp = () => {
    Alert.alert('Help', 'For support, contact us at support@example.com');
  };

  const settingsSections: SettingSection[] = [
    {
      title: 'Account',
      items: [
        {
          icon: User,
          label: 'Edit Profile',
          onPress: () => router.push('/edit-profile'),
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: Bell,
          label: 'Push Notifications',
          value: pushEnabled,
          onToggle: setPushEnabled,
        },
        {
          icon: Bell,
          label: 'Email Notifications',
          value: emailEnabled,
          onToggle: setEmailEnabled,
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          label: 'Help & Support',
          onPress: handleHelp,
        },
        {
          icon: Info,
          label: 'About',
          onPress: handleAbout,
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.surface }]}>
      <View style={[styles.header, { backgroundColor: themeColors.background, borderBottomColor: themeColors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={themeColors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: themeColors.textSecondary }]}>{section.title}</Text>
            <View style={[styles.sectionContent, { backgroundColor: themeColors.cardBackground }]}>
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <TouchableOpacity
                    key={itemIndex}
                    style={[
                      styles.settingItem,
                      itemIndex < section.items.length - 1 && styles.settingItemBorder,
                      { borderBottomColor: themeColors.border },
                    ]}
                    onPress={item.onPress}
                    disabled={item.onToggle !== undefined}
                  >
                    <View style={styles.settingItemLeft}>
                      <View style={[styles.iconContainer, { backgroundColor: themeColors.surface }]}>
                        <Icon size={20} color={themeColors.text} />
                      </View>
                      <Text style={[styles.settingItemLabel, { color: themeColors.text }]}>{item.label}</Text>
                    </View>
                    {item.onToggle ? (
                      <Switch
                        value={item.value}
                        onValueChange={item.onToggle}
                        trackColor={{ false: themeColors.border, true: themeColors.primary }}
                        thumbColor={themeColors.background}
                      />
                    ) : (
                      <ChevronRight size={20} color={themeColors.textSecondary} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, { color: themeColors.textSecondary }]}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
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
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  sectionContent: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingItemLabel: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  versionText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
