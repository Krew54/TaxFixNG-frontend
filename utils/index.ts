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
export const formatWithCommas = (value?: string | number) => {
  if (value === null || value === undefined || value === "") return "";

  const stringValue = String(value).replace(/,/g, "");
  return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export * from "./checkAuth";
export * from "./fonts";
export * from "./globalStyles";
