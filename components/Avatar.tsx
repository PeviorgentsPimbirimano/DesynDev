import React from 'react';
import { View, Image, StyleSheet, ViewStyle, ImageSourcePropType } from 'react-native';
import { colors } from '@/constants/colors';

interface AvatarProps {
  source?: ImageSourcePropType;
  uri?: string;
  size?: number;
  style?: ViewStyle;
}

export function Avatar({ source, uri, size = 40, style }: AvatarProps) {
  const imageSource = source || (uri ? { uri } : undefined);
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }, style]}>
      <Image source={imageSource} style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
