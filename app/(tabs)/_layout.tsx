import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useTheme } from "@/hooks/use-theme-color";
import { Image } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require("./../../assets/icons/bottom-tabs/home.png")}
              style={{
                width: 22,
                height: 22,
                tintColor: focused ? color : colors.icon,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tax-center"
        options={{
          title: "Tax Center",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require("./../../assets/icons/bottom-tabs/tex-center.png")}
              style={{
                width: 22,
                height: 22,
                tintColor: focused ? color : colors.icon,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: "Learn",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require("./../../assets/icons/bottom-tabs/blog.png")}
              style={{
                width: 22,
                height: 22,
                tintColor: focused ? color : colors.icon,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require("./../../assets/icons/bottom-tabs/profile.png")}
              style={{
                width: 22,
                height: 22,
                tintColor: focused ? color : colors.icon,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
}
