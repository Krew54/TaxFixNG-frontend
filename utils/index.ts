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
    visibilityTime: 5000,
    topOffset: 60,
  });
};
export * from "./fonts";
export * from "./globalStyles";
