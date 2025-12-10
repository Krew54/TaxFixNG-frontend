import { getData } from "@/helpers";
import { useTheme } from "@/hooks/use-theme-color";
import { globalStyles } from "@/utils";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, Input } from "../common";
import { CustomSwitch } from "../switch";
import { ThemedText } from "../themed-text";

export const Tab1 = () => {
  const [switchOn, setSwitchOn] = useState(false);
  const { colors } = useTheme();
  const { control } = useForm();

  const handleContinue = async () => {
    const data = await getData("isLoggedIn");
    if (!data) {
      router.push("/signup");
    }
  };
  return (
    <View>
      <ThemedText
        type="subtitle"
        style={{
          color: colors.primary,
        }}
      >
        Income Details
      </ThemedText>
      <Input
        inputName="annual_income"
        control={control}
        label="Gross Annual Income (N)"
        placeholder="e.g 2,500,780"
        showLabel
        keyboardType="numeric"
      />
      <Input
        inputName="pension"
        control={control}
        label="Pension Contribution (%)"
        placeholder="e.g 10.5"
        showLabel
        keyboardType="numeric"
      />
      <ThemedText
        style={{
          fontSize: 12,
          color: colors.primary,
          marginTop: globalStyles.margin.xs - 4,
        }}
      >
        Estimated: N250,078
      </ThemedText>
      <Input
        inputName="annual_income"
        control={control}
        label="NHF Contribution (%)"
        placeholder="e.g 2,500,780"
        showLabel
        keyboardType="numeric"
      />
      <ThemedText
        style={{
          fontSize: 12,
          color: colors.primary,
          marginTop: globalStyles.margin.xs - 4,
        }}
      >
        Estimated: N250,078
      </ThemedText>

      <View style={styles.switchWrapper}>
        <ThemedText
          style={{
            flex: 1,
          }}
        >
          Do you have other taxable income?{" "}
        </ThemedText>
        <CustomSwitch
          value={switchOn}
          onValueChange={() => {
            setSwitchOn(!switchOn);
          }}
        />
      </View>
      <Button label="Continue" onPress={handleContinue} active />
    </View>
  );
};

const styles = StyleSheet.create({
  switchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: globalStyles.margin.sm,
    marginBottom: globalStyles.margin.lg,
  },
});
