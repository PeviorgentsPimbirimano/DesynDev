import { View, Image, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

export function LogoHeader() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
      <Image
        source={require('@/assets/images/image copy copy.png')}
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 50,
    resizeMode: 'contain',
    marginTop: 20,
  },
});
