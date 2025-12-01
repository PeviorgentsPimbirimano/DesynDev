import { useState } from 'react';
import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { Home, Search, PlusSquare, Bell, User } from 'lucide-react-native';
import ChatButton from '@/components/ChatButton';
import ChatOverlay from '@/components/ChatOverlay';
import { getChats } from '@/utils/chatStorage';

function TabsWithChat() {
  const { colors } = useTheme();
  const [chatVisible, setChatVisible] = useState(false);
  const [chats, setChats] = useState(getChats());

  const handleOpenChat = () => {
    setChats(getChats());
    setChatVisible(true);
  };

  const unreadCount = 0;

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopColor: colors.border,
            borderTopWidth: 1,
            paddingTop: 8,
            paddingBottom: 8,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ size, color }) => <Home size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ size, color }) => <Search size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: 'Create',
            tabBarIcon: ({ size, color }) => <PlusSquare size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            title: 'Notifications',
            tabBarIcon: ({ size, color }) => <Bell size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ size, color }) => <User size={size} color={color} />,
          }}
        />
      </Tabs>
      <ChatButton onPress={handleOpenChat} unreadCount={unreadCount} />
      <ChatOverlay visible={chatVisible} onClose={() => setChatVisible(false)} />
    </View>
  );
}

export default function TabLayout() {
  return <TabsWithChat />;
}
