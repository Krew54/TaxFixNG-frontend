import { getData } from "@/helpers";
import { router } from "expo-router";
import { Alert } from "react-native";

export const checkAuth = async (): Promise<boolean> => {
  const token = await getData("token");

  if (!token) {
    Alert.alert(
      "Login Required",
      "You need to log in to create or view forecast.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log in",
          style: "default",
          onPress: () => router.push("/login"),
        },
      ],
      { cancelable: true }
    );

    return false; // 🚫 not authenticated
  }

  return true; // ✅ authenticated
};
