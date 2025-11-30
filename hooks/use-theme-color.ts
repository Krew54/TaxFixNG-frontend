/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

// Set this however you want (Context, Zustand, global config, env, etc.)
const FORCE_LIGHT_MODE = false; // <--- your boolean override

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const systemTheme = useColorScheme() ?? "light";
  const theme = FORCE_LIGHT_MODE ? "light" : systemTheme;

  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function useTheme() {
  const systemTheme = useColorScheme() ?? "light";
  const theme = FORCE_LIGHT_MODE ? "light" : systemTheme;

  return {
    colors: Colors[theme],
    isDark: theme === "dark",
  };
}
