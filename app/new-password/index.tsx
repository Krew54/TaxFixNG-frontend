import {
  Button,
  Input,
  ScreenHeader,
  ScreenWrapper,
} from "@/components/common";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme-color";
import { globalStyles } from "@/utils";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";

export default function Index() {
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePassword2, setHidePassword2] = useState(true);
  const [passwordStrengthPass, setPasswordStrengthPass] = useState(false);
  const { colors, isDark } = useTheme();
  const { control, watch, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  const password = watch("password");

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

  const onSubmit = () => {};
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
          label="password"
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
          label="password_confirmation"
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
