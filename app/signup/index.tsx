import { Button, Input, ScreenWrapper } from "@/components/common";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useSignup } from "@/hooks/auth";
import { useTheme } from "@/hooks/use-theme-color";
import { EMAIL_REGEX, globalStyles, showToast } from "@/utils";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";

type InputTypes = {
  email: string;
  password: string;
  password_confirmation: string;
};

export default function Index() {
  const [hidePassword, setHidePassword] = useState(true);

  const [hidePassword2, setHidePassword2] = useState(true);
  const [passwordStrengthPass, setPasswordStrengthPass] = useState(false);
  const { colors } = useTheme();
  const { control, watch, handleSubmit, formState } = useForm<InputTypes>({
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

  const { isPending, mutate } = useSignup((res) => {
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
      showToast({
        label: "Error",
        message,
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
        email: data.email,
        password: data.password,
      },
    });
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
          Sign up
        </ThemedText>
        <Input
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: EMAIL_REGEX,
              message: "Email must be a valid email address",
            },
          }}
          inputName="email"
          placeholder="Enter Email Address"
          keyboardType="email-address"
        />
        <Input
          control={control}
          inputName="password"
          placeholder="Passsword"
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
          inputName="password_confirmation"
          placeholder="Confirm Password"
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
          label="Signup"
          onPress={handleSubmit(onSubmit)}
          active={formState.isValid}
          style={styles.btnStyle}
          loading={isPending}
        />
        <ThemedView style={styles.flexRow}>
          <ThemedText>Already have an account? </ThemedText>
          <Link href={"/"} suppressHighlighting={false}>
            <ThemedText
              type="defaultSemiBold"
              style={{
                color: colors.primary,
              }}
            >
              Login
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
