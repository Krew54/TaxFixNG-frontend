import {
  Button,
  Input,
  ScreenHeader,
  ScreenWrapper,
} from "@/components/common";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useResetPassword } from "@/hooks/auth";
import { useTheme } from "@/hooks/use-theme-color";
import { globalStyles, showToast } from "@/utils";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";

type InputTypes = {
  otp: string;
  new_password: string;
  confirm_new_password: string;
};
export default function Index() {
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePassword2, setHidePassword2] = useState(true);
  const [passwordStrengthPass, setPasswordStrengthPass] = useState(false);
  const { colors, isDark } = useTheme();
  const { control, watch, handleSubmit, formState } = useForm<InputTypes>({
    mode: "onChange",
  });
  const password = watch("new_password");
  const { email } = useLocalSearchParams();
  // console.log(email);

  useEffect(() => {
    if (password) {
      var uppercaseRe = /[A-Z]/;
      var lowercaseRe = /[a-z]/;
      var specialCharRe = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      var numberRe = /[0-9]/;

      if (
        uppercaseRe.test(password) &&
        lowercaseRe.test(password) &&
        specialCharRe.test(password) &&
        numberRe.test(password)
      ) {
        setPasswordStrengthPass(true);
      } else {
        setPasswordStrengthPass(false);
      }
    }
  }, [password]);

  const { isPending, mutate } = useResetPassword((res) => {
    if (res.status >= 400) {
      showToast({
        label: "Error",
        message: res.data.detail,
        type: "error",
      });
    } else {
      showToast({
        label: "Sucess",
        message: res.data.message,
        type: "success",
      });
      router.push("/");
    }
  });
  const onSubmit: SubmitHandler<InputTypes> = (data) => {
    mutate({
      payload: {
        email,
        new_password: data.new_password,
        otp: data.otp,
      },
    });
  };

  return (
    <ScreenWrapper>
      <ScreenHeader title="Reset Password" />
      <ThemedView style={styles.mainWrapper}>
        <ThemedText
          style={{
            marginBottom: globalStyles.margin.lg,
          }}
        >
          Please enter a new password
        </ThemedText>
        <Input
          control={control}
          inputName="otp"
          placeholder="Six digit code"
          rules={{
            required: "Code is required",
          }}
          keyboardType="numeric"
          maxLength={6}
        />
        <Input
          control={control}
          inputName="new_password"
          placeholder="New Password"
          secureTextEntry={hidePassword}
          rules={{
            required: "Password is required",
          }}
          rightIcon={
            hidePassword
              ? require("../../assets/icons/eye.png")
              : require("../../assets/icons/eye-slash.png")
          }
          iconPress={() => setHidePassword(!hidePassword)}
        />
        {password && !passwordStrengthPass && (
          <ThemedText
            style={{
              color: colors.secondary,
            }}
          >
            {password &&
              password.length > 0 &&
              !passwordStrengthPass &&
              "Password must contain uppercase, special character and numbers"}
          </ThemedText>
        )}
        <Input
          control={control}
          inputName="confirm_new_password"
          placeholder="Confirm New Password"
          secureTextEntry={hidePassword2}
          rules={{
            required: "Password is required",
            validate: (value: any) =>
              value === password || "Password doesn't match",
          }}
          rightIcon={
            hidePassword2
              ? require("../../assets/icons/eye.png")
              : require("../../assets/icons/eye-slash.png")
          }
          iconPress={() => setHidePassword2(!hidePassword2)}
        />

        <Button
          label="Reset Password"
          onPress={handleSubmit(onSubmit)}
          active={formState.isValid}
          style={styles.btnStyle}
          loading={isPending}
        />
        <ThemedView style={styles.flexRow}>
          <ThemedText>Remember now? </ThemedText>
          <Link href={"/"} suppressHighlighting={false}>
            <ThemedText
              type="defaultSemiBold"
              style={{
                color: colors.primary,
              }}
            >
              Sign in
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
    paddingTop: globalStyles.margin.lg,
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
