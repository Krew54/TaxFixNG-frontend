import { Button, Input, ScreenWrapper } from "@/components/common";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { storeData } from "@/helpers";
import { useLogin } from "@/hooks/auth";
import { useTheme } from "@/hooks/use-theme-color";
import { EMAIL_REGEX, globalStyles, showToast } from "@/utils";
import { Link, router } from "expo-router";
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
        username: data.email,
        password: data.password,
      },
    });
    // router.replace("/(tabs)");
  };
  return (
    <ScreenWrapper>
      <ThemedView style={styles.mainWrapper}>
        <ThemedText
          type="title"
          style={{
            marginBottom: globalStyles.margin.sm + 1,
          }}
        >
          Log in
        </ThemedText>
        <Input
          control={control}
          inputName="email"
          autoCapitalize="none"
          rules={{
            required: "Email is required",
            pattern: {
              value: EMAIL_REGEX,
              message: "Email must be a valid email address",
            },
          }}
          placeholder="Enter Email Address"
          keyboardType="email-address"
        />
        <Input
          control={control}
          inputName="password"
          placeholder="Password"
          rules={{
            required: "Password is required",
          }}
          secureTextEntry={hidePassword}
          rightIcon={
            hidePassword
              ? require("../assets/icons/eye.png")
              : require("../assets/icons/eye-slash.png")
          }
          iconPress={() => setHidePassword(!hidePassword)}
        />
        <Link
          href={"/forgot-password"}
          style={{
            alignSelf: "flex-end",
            marginTop: globalStyles.margin.xs + 4,
            textDecorationLine: "underline",
          }}
          suppressHighlighting={false}
        >
          <ThemedText
            style={{
              color: colors.primary,
            }}
          >
            Forgot Password?
          </ThemedText>
        </Link>
        <Button
          label="Login"
          onPress={handleSubmit(onSubmit)}
          active={formState.isValid}
          style={styles.btnStyle}
          loading={isPending}
        />
        <ThemedView style={styles.flexRow}>
          <ThemedText>No account yet? </ThemedText>
          <Link href={"/signup"} suppressHighlighting={false}>
            <ThemedText
              type="defaultSemiBold"
              style={{
                color: colors.primary,
              }}
            >
              Sign up
            </ThemedText>
          </Link>
        </ThemedView>
      </ThemedView>
    </ScreenWrapper>
  );
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
