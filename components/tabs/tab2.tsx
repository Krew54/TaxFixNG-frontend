import { getData, storeData } from "@/helpers";
import { useTheme } from "@/hooks/use-theme-color";
import { TabProps } from "@/types";
import { globalStyles } from "@/utils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, Input } from "../common";
import { CustomSwitch } from "../switch";
import { ThemedText } from "../themed-text";

export const Tab2 = ({ goToNext }: TabProps) => {
  const [switchOn, setSwitchOn] = useState(false);
  const [hasInsurance, setHasInsurance] = useState(false);
  const [hasVoluntaryPension, setHasVoluntaryPension] = useState(false);
  const { colors } = useTheme();
  const { control, handleSubmit, resetField, reset } = useForm();

  useEffect(() => {
    const hydrate = async () => {
      const stored = await getData("forecast_payload");

      if (!stored) return;

      const data = stored;

      // restore toggle
      if (data.losses_allowed && Number(data.losses_allowed) > 0) {
        setSwitchOn(true);
      }

      reset({
        pension_contribution: data.pension_contribution?.toString() || "",
        national_housing_fund: data.national_housing_fund?.toString() || "",
        life_insurance_premium: data.life_insurance_premium?.toString() || "",
        National_health_insurance_scheme:
          data.national_health_insurance_scheme?.toString() || "",
        voluntary_pension_contribution:
          data.voluntary_pension_contribution?.toString() || "",
        losses_allowed: data.losses_allowed?.toString() || "",
      });
    };

    hydrate();
  }, []);

  const handleContinue = async (formData: any) => {
    const existing = await getData("forecast_payload");

    const parsedExisting = existing ? existing : {};

    const payload = {
      ...parsedExisting,

      pension_contribution: formData.pension_contribution || 0,
      national_housing_fund: formData.national_housing_fund || 0,
      life_insurance_premium: hasInsurance
        ? formData.life_insurance_premium
        : 0,
      national_health_insurance_scheme:
        formData.National_health_insurance_scheme || 0,
      voluntary_pension_contribution: hasVoluntaryPension
        ? formData.voluntary_pension_contribution
        : 0,

      losses_allowed: switchOn ? formData.losses_allowed : 0,
    };

    await storeData("forecast_payload", payload);

    goToNext?.();
  };

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
        inputName="pension_contribution"
        control={control}
        label="Pension Contribution (optional)"
        placeholder="e.g 1000"
        showLabel
        keyboardType="numeric"
        formatNumber
      />
      <Input
        inputName="National_health_insurance_scheme"
        control={control}
        label="NHIS Contribution (optional)"
        placeholder="e.g 100"
        showLabel
        keyboardType="numeric"
        formatNumber
      />
      <Input
        inputName="national_housing_fund"
        control={control}
        label="NHF Contribution (optional)"
        placeholder="e.g 10000"
        showLabel
        keyboardType="numeric"
        formatNumber
      />

      {/* <ThemedText
        style={{
          fontSize: 12,
          color: colors.primary,
          marginTop: globalStyles.margin.xs - 4,
        }}
      >
        Optional additional pension saving
      </ThemedText> */}

      <View style={styles.switchWrapper}>
        <ThemedText
          style={{
            flex: 1,
          }}
        >
          Do you have life insurance?{" "}
        </ThemedText>
        <CustomSwitch
          value={hasInsurance}
          onValueChange={(val) => {
            setHasInsurance(val);

            if (!val) {
              resetField("life_insurance_premium");
            }
          }}
        />
      </View>
      {hasInsurance && (
        <Input
          inputName="life_insurance_premium"
          control={control}
          label="Life Insurance Premium (₦)"
          placeholder="e.g 2,500,780"
          showLabel
          keyboardType="numeric"
          formatNumber
        />
      )}

      <View style={styles.switchWrapper}>
        <ThemedText
          style={{
            flex: 1,
          }}
        >
          Do you have voluntary pension?{" "}
        </ThemedText>
        <CustomSwitch
          value={hasVoluntaryPension}
          onValueChange={(val) => {
            setHasVoluntaryPension(val);

            if (!val) {
              resetField("voluntary_pension_contribution");
            }
          }}
        />
      </View>
      {hasVoluntaryPension && (
        <Input
          inputName="voluntary_pension_contribution"
          control={control}
          label="Voluntary Pension Contribution (₦)"
          placeholder="e.g 2,500,780"
          showLabel
          keyboardType="numeric"
          formatNumber
        />
      )}

      {/* <View style={styles.switchWrapper}>
        <ThemedText
          style={{
            flex: 1,
          }}
        >
          Do you have other allowable deductions?{" "}
        </ThemedText>
        <CustomSwitch
          value={switchOn}
          onValueChange={(val) => {
            setSwitchOn(val);

            if (!val) {
              resetField("losses_allowed");
            }
          }}
        />
      </View>

      {switchOn && (
        <Input
          inputName="losses_allowed"
          control={control}
          label="Other Allowable Deductions (₦)"
          placeholder="e.g 2,500,780"
          showLabel
          keyboardType="numeric"
          formatNumber
        />
      )} */}
      <Button
        label="Continue"
        onPress={handleSubmit(handleContinue)}
        active
        style={{
          marginTop: globalStyles.margin.lg,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  switchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: globalStyles.margin.sm,
  },
});
