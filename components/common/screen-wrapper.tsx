import React from "react";

import { useTheme } from "@/hooks/use-theme-color";
import { StatusBar, StyleSheet, View } from "react-native";

type ScreenProps = {
  backgroundColor?: string;
  statusBarColor?: string;
  barStyle?: "dark-content" | "light-content" | "default";
  children: any;
  preventScreenShot?: boolean;
};

export const ScreenWrapper = ({
  children,
  backgroundColor,
  statusBarColor,
  barStyle,
}: ScreenProps) => {
  const { colors, isDark } = useTheme();

  return (
    <View
      style={[
        styles.mainwrapper,
        {
          backgroundColor: backgroundColor
            ? backgroundColor
            : colors.background,
        },
      ]}
    >
      <StatusBar
        backgroundColor={statusBarColor ? statusBarColor : "transparent"}
        barStyle={isDark ? "light-content" : barStyle || "dark-content"}
        translucent
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  mainwrapper: {
    flex: 1,
  },
});
