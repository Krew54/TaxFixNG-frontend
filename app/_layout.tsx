import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import "react-native-reanimated";

import { useTheme } from "@/hooks/use-theme-color";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { StatusBar, View } from "react-native";

import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "green" }}
      text1Style={{
        fontSize: 16,
        fontFamily: "Inter-Bold",
      }}
      text2Style={{
        fontSize: 14,
        fontFamily: "Inter-Regular",
      }}
      text2NumberOfLines={10} // 👈 long messages supported
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 16,
        fontFamily: "Inter-Bold",
      }}
      text2Style={{
        fontSize: 14,
        fontFamily: "Inter-Regular",
      }}
      text2NumberOfLines={10}
    />
  ),
};

export const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
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
            initialRouteName="(tabs)"
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="index" />
          </Stack>
          <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
        </View>
      </QueryClientProvider>
      <Toast config={toastConfig} visibilityTime={6000} />
    </ThemeProvider>
  );
}
