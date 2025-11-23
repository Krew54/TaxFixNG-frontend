import { Dimensions, StatusBar } from "react-native";

const { width, height } = Dimensions.get("window");
export const wp = (p: number) => (width * p) / 100;
export const hp = (p: number) => (height * p) / 100;
export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const PASSWORD_REGEX = /[A-Z][a-z][0-9][#?!@$%^&*-]/;

const variant = {
  xxl4: 120,
  xxl3: 96,
  xxl2: 80,
  xxl1: 72,
  xxl: 56,
  xl: 40,
  lg: 32,
  md: 24,
  sm: 16,
  xs: 8,
};
export const globalStyles = {
  wrapper: 24,
  statusbarHeight: StatusBar.currentHeight,
  radius: {
    md: 24,
    sm: 16,
    xs: 8,
  },
  margin: variant,
  padding: variant,
  borderWidth: 0.4,
  buttonWrapper: {
    paddingBottom: variant.lg,
    // backgroundColor: colors.white,
  },
};
