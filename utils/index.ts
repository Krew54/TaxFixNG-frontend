import Toast from "react-native-toast-message";

export const showToast = ({
  label,
  message,
  type,
}: {
  type: "error" | "info" | "success";
  label: string;
  message: string;
}) => {
  Toast.show({
    type: type,
    text1: label,
    text2: message,
    text1Style: {
      fontFamily: "Inter-Bold",
      fontSize: 16,
    },
    text2Style: {
      fontFamily: "Inter-Regular",
      fontSize: 16,
    },
    visibilityTime: 5000,
    topOffset: 60,
  });
};
export * from "./fonts";
export * from "./globalStyles";
