import {
  Button,
  Input,
  ScreenHeader,
  ScreenWrapper,
} from "@/components/common";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useChangePassword } from "@/hooks/auth";
import { useTheme } from "@/hooks/use-theme-color";
import { globalStyles, showToast } from "@/utils";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";

type InputTypes = {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
};

export default function Index() {
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePassword2, setHidePassword2] = useState(true);
  const [passwordStrengthPass, setPasswordStrengthPass] = useState(false);
  const { colors } = useTheme();
  const { control, watch, handleSubmit, formState } = useForm<InputTypes>({
    mode: "onChange",
  });
  const password = watch("new_password");

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

  const { isPending, mutate } = useChangePassword((response) => {
    if (response.status >= 400) {
      showToast({
        label: "Error",
        message: response.data.detail,
        type: "error",
      });
    } else {
      showToast({
        label: "Sucess",
        message: response.data.message,
        type: "success",
      });
      router.back();
    }
  });

  const onSubmit: SubmitHandler<InputTypes> = (data) => {
    mutate({
      payload: {
        new_password: data.new_password,
        old_password: data.old_password,
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
          inputName="old_password"
          placeholder="Enter Old Password"
          rules={{
            required: "Old password is required",
          }}
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
          label="Change Password"
          onPress={handleSubmit(onSubmit)}
          active={formState.isValid}
          style={styles.btnStyle}
          loading={isPending}
        />
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
});
