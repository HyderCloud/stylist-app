import { PlatformPressable } from '@react-navigation/elements';
import {
  DrawerActions,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import * as React from 'react';
import { Image, Platform, StyleSheet } from 'react-native';


import type { DrawerNavigationProp } from '../node_modules/@react-navigation/drawer/src/types';

type Props = {
  accessibilityLabel?: string;
  pressColor?: string;
  pressOpacity?: number;
  tintColor?: string;
};

export default function DrawerToggleButton({ tintColor, ...rest }: Props) {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  return (
    <PlatformPressable
      {...rest}
      accessible
      accessibilityRole="button"
      android_ripple={{ borderless: true }}
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      style={styles.touchable}
      hitSlop={Platform.select({
        ios: undefined,
        default: { top: 16, right: 16, bottom: 16, left: 16 },
      })}
    >
      <Image
        style={[styles.icon, tintColor ? { tintColor } : null]}
        source={require('../assets/icons/Menuicon.png')}
        fadeDuration={0}
      />
    </PlatformPressable>
  );
}

const styles = StyleSheet.create({
  icon: {
    height: 44,
    width: 44,
    margin: 10,
    resizeMode: 'contain',
  },
  touchable: {
    marginHorizontal: 11,
  },
});
