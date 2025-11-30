import { useTheme } from "@/hooks/use-theme-color";
import { globalStyles } from "@/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, Input } from "../common";
import { CustomSwitch } from "../switch";
import { ThemedText } from "../themed-text";

export const Tab3 = () => {
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
        Housing
      </ThemedText>
      <Input
        inputName="annual_rent"
        control={control}
        label="Annual Rent Amount (N)"
        placeholder="e.g 2,500,780"
        showLabel
        keyboardType="numeric"
      />

      <View style={styles.switchWrapper}>
        <ThemedText
          style={{
            flex: 1,
          }}
        >
          Do you have employee-provided accomodation?{" "}
        </ThemedText>
        <CustomSwitch
          value={switchOn}
          onValueChange={() => {
            setSwitchOn(!switchOn);
          }}
        />
      </View>
      <Button label="Continue" onPress={() => {}} active />
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
