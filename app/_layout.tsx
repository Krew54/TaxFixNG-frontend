import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import "react-native-reanimated";

import { useTheme } from "@/hooks/use-theme-color";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { StatusBar, View } from "react-native";
export default function RootLayout() {
  const { isDark, colors } = useTheme();
  const navigationTheme = isDark ? DarkTheme : DefaultTheme;

  const [loaded, error] = useFonts({
    "Inter-Black": require("../assets/fonts/Inter/Inter-Black.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter/Inter-Bold.ttf"),
    "Inter-Light": require("../assets/fonts/Inter/Inter-Light.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter/Inter-Medium.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter/Inter-Regular.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter/Inter-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <ThemeProvider value={navigationTheme}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
        </Stack>
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      </View>
    </ThemeProvider>
  );
}
