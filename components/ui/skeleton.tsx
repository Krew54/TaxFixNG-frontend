// Skeleton.tsx
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface SkeletonProps {
  width?: any | string;
  height?: any | string;
  radius?: number;
  style?: StyleProp<ViewStyle>;
}

export const Skeleton = ({
  width = "100%",
  height = 16,
  radius = 8,
  style,
}: SkeletonProps) => {
  return (
    <View
      style={[styles.skeleton, { width, height, borderRadius: radius }, style]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "#E1E1E1",
    overflow: "hidden",
  },
});
