import {
  Button,
  Input,
  ScreenHeader,
  ScreenWrapper,
} from "@/components/common";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme-color";
import { EMAIL_REGEX, globalStyles } from "@/utils";
import { Link, router } from "expo-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";

type inputFields = {
  email: string;
};
export default function Index() {
  const { colors } = useTheme();
  const { control, handleSubmit, formState } = useForm<inputFields>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<inputFields> = (value) => {
    router.push(`/otp/${value.email}`);
  };
  return (
    <ScreenWrapper>
      <ScreenHeader title="Forgot Password" />
      <ThemedView style={styles.mainWrapper}>
        <ThemedText
          style={{
            marginBottom: globalStyles.margin.sm + 1,
          }}
        >
          Please enter your
          <ThemedText type="defaultSemiBold"> email address </ThemedText>
          to reset your password
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

        <Button
          label="Send OTP"
          onPress={handleSubmit(onSubmit)}
          active={formState.isValid}
          style={styles.btnStyle}
        />
        <ThemedView style={styles.flexRow}>
          <ThemedText>Remember now? </ThemedText>
          <Link replace href={"/"} asChild suppressHighlighting={false}>
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
    paddingHorizontal: globalStyles.wrapper,
    paddingTop: globalStyles.padding.xxl,
  },
  btnStyle: {
    marginTop: globalStyles.margin.lg - 2,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: globalStyles.margin.xs,
  },
});
