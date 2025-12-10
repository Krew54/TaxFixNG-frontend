import { storeData } from "@/helpers";
import { useLogin } from "@/hooks/auth";
import { useTheme } from "@/hooks/use-theme-color";
import { globalStyles, showToast } from "@/utils";
import { Redirect, router } from "expo-router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";

type InputTypes = {
  email: string;
  password: string;
};
export default function Index() {
  const [hidePassword, setHidePassword] = useState(true);
  const { colors, isDark } = useTheme();
  const { control, formState, handleSubmit, watch } = useForm<InputTypes>({
    mode: "onChange",
  });

  const email = watch("email");
  const { isPending, mutate } = useLogin((res) => {
    if (res.status >= 400) {
      let message = "";
      if (Array.isArray(res.data.detail)) {
        const msgs = res.data.detail.map((err: any) => err.msg);

        // Remove duplicates
        const uniqueMsgs = [...new Set(msgs)];

        message = uniqueMsgs.join(", ");
      } else {
        message = res.data.detail;
      }
      if (message.includes("not verified")) {
        router.push(`/otp/${email}`);
      }
      showToast({
        label: "Error",
        message,
        type: "error",
      });
    } else {
      storeData("token", res.data.access_token);
      router.replace("/(tabs)");
    }
  });

  const onSubmit: SubmitHandler<InputTypes> = (data) => {
    mutate({
      payload: {
        username: data.email?.toLowerCase(),
        password: data.password,
      },
    });
    // router.replace("/(tabs)");
  };
  return <Redirect href={"/(tabs)"} />;
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    marginTop: globalStyles.margin.xxl4,
    paddingHorizontal: globalStyles.wrapper,
  },
  btnStyle: {
    marginTop: globalStyles.margin.xl,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: globalStyles.margin.xs,
  },
});
