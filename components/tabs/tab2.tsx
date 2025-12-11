import { useTheme } from "@/hooks/use-theme-color";
import { TabProps } from "@/types";
import { globalStyles } from "@/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, Input } from "../common";
import { CustomSwitch } from "../switch";
import { ThemedText } from "../themed-text";

export const Tab2 = ({ goToNext }: TabProps) => {
  const [switchOn, setSwitchOn] = useState(false);
  const { colors } = useTheme();
  const { control } = useForm();
  return (
    <View>
      <ThemedText
        type="subtitle"
        style={{
          color: colors.primary,
        }}
      >
        Deductions
      </ThemedText>
      <Input
        inputName="life_issurance"
        control={control}
        label="Life Insurance Premium (₦)"
        placeholder="e.g 2,500,780"
        showLabel
        keyboardType="numeric"
      />
      <Input
        inputName="contribution"
        control={control}
        label="NHIS Contribution (₦)"
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
        Usually 5% of basic salary
      </ThemedText>
      <Input
        inputName="voluntary_pension"
        control={control}
        label="Voluntary Pension Contribution (₦)"
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
        Optional additional pension saving
      </ThemedText>

      <View style={styles.switchWrapper}>
        <ThemedText
          style={{
            flex: 1,
          }}
        >
          Do you have other allowable deductions?{" "}
        </ThemedText>
        <CustomSwitch
          value={switchOn}
          onValueChange={() => {
            setSwitchOn(!switchOn);
          }}
        />
      </View>
      <Button label="Continue" onPress={() => goToNext?.()} active />
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
