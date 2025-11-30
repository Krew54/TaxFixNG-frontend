import { useTheme } from "@/hooks/use-theme-color";
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, ViewStyle } from "react-native";

type Props = {
  value: boolean;
  onValueChange: (val: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
};

export const CustomSwitch = ({
  value,
  onValueChange,
  disabled = false,
  style,
}: Props) => {
  const { colors, isDark } = useTheme();

  // Theme-based colors
  const activeColor = colors.primary; // green
  const inactiveColor = isDark ? "#3f3f46" : "#e5e7eb"; // gray
  const thumbColor = "#ffffff";

  const translateX = useRef(new Animated.Value(value ? 18 : 2)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: value ? 18 : 2,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [value]);

  return (
    <Pressable
      style={[
        styles.container,
        style,
        {
          backgroundColor: value ? activeColor : inactiveColor,
          opacity: disabled ? 0.5 : 1,
        },
      ]}
      onPress={() => !disabled && onValueChange(!value)}
    >
      <Animated.View
        style={[
          styles.thumb,
          { backgroundColor: thumbColor, transform: [{ translateX }] },
        ]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 22,
    borderRadius: 20,
    padding: 2,
    justifyContent: "center",
  },
  thumb: {
    width: 18,
    height: 18,
    borderRadius: 20,
  },
});
