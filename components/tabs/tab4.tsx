import { getData } from "@/helpers";
import { useTheme } from "@/hooks/use-theme-color";
import { TabProps } from "@/types";
import { checkAuth, globalStyles } from "@/utils";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Button } from "../common";
import { ThemedText } from "../themed-text";

export const Tab4 = ({ goToPrev }: TabProps) => {
  const { colors, isDark } = useTheme();

  const [forecastPayload, setForecastPayload] = useState<any>(null);
  const [forecastSummary, setForecastSummary] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const payload = await getData("forecast_payload");
      const summary = await getData("forecast_summary");

      if (payload) {
        const grossIncome =
          Number(payload.employment_income || 0) +
          Number(payload.other_income || 0);

        const totalDeductions =
          Number(payload.pension_contribution || 0) +
          Number(payload.voluntary_pension_contribution || 0) +
          Number(payload.national_housing_fund || 0) +
          Number(payload.house_rent || 0) +
          Number(payload.National_health_insurance_scheme || 0) +
          Number(payload.life_insurance_premium || 0);

        setForecastPayload({
          ...payload,
          grossIncome,
          totalDeductions,
        });
      }

      if (summary) {
        setForecastSummary(summary);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    const isLoggedIn = await checkAuth();
    if (!isLoggedIn) return;
  };

  const numberFormat = (value: number | string | undefined) => {
    if (!value && value !== 0) return "₦0";
    const num = typeof value === "string" ? parseFloat(value) : value;
    return `₦${num.toLocaleString("en-NG")}`;
  };
  return (
    <View>
      {/* First container - Summary */}
      <ThemedText
        type="subtitle"
        style={{ color: colors.primary, marginBottom: globalStyles.margin.sm }}
      >
        Summary
      </ThemedText>
      <View
        style={[
          styles.cardWrapper,
          { backgroundColor: isDark ? colors.inputBox : "#f4f6f7" },
        ]}
      >
        <View style={styles.cardRow}>
          <ThemedText style={{ flex: 1 }}>Gross Tax Liability:</ThemedText>
          <ThemedText>
            {numberFormat(forecastSummary?.gross_tax_liability || 0)}
          </ThemedText>
        </View>
        <View style={styles.cardRow}>
          <ThemedText style={{ flex: 1 }}>Total Deductions:</ThemedText>
          <ThemedText>
            {numberFormat(forecastSummary?.total_deductions || 0)}
          </ThemedText>
        </View>
        <View style={styles.cardRow}>
          <ThemedText style={{ flex: 1 }}>Total Withholdings:</ThemedText>
          <ThemedText>
            {numberFormat(forecastSummary?.total_withholdings || 0)}
          </ThemedText>
        </View>
        <View style={styles.cardRow}>
          <ThemedText type="defaultSemiBold" style={{ flex: 1 }}>
            Estimated Tax Due:
          </ThemedText>
          <ThemedText>
            {numberFormat(forecastSummary?.estimated_tax_due || 0)}
          </ThemedText>
        </View>
      </View>

      {/* Buttons: Save and Create New */}
      <View
        style={[
          styles.btnWrapper,
          { backgroundColor: isDark ? colors.inputBox : "#f4f6f7" },
        ]}
      >
        <Button label="Save" onPress={handleSave} active />
        <Pressable
          style={[styles.btnStyle, { borderColor: colors.primary }]}
          onPress={() => goToPrev?.(0)}
        >
          <ThemedText type="defaultSemiBold" style={{ color: colors.primary }}>
            Create New
          </ThemedText>
        </Pressable>
      </View>

      {/* Second container - Income Breakdown */}
      <View
        style={[
          styles.cardWrapper,
          { backgroundColor: isDark ? colors.inputBox : "#f4f6f7" },
        ]}
      >
        <View style={styles.cardRow}>
          <ThemedText type="defaultSemiBold">Income Summary</ThemedText>
        </View>
        <View style={styles.cardRow}>
          <ThemedText style={{ flex: 1 }}>Gross Annual Income:</ThemedText>
          <ThemedText>
            {numberFormat(forecastPayload?.employment_income || 0)}
          </ThemedText>
        </View>
        <View style={styles.cardRow}>
          <ThemedText style={{ flex: 1 }}>Other Taxable income:</ThemedText>
          <ThemedText>
            {numberFormat(forecastPayload?.other_income || 0)}
          </ThemedText>
        </View>

        <View style={styles.cardRow}>
          <ThemedText type="defaultSemiBold" style={{ flex: 1 }}>
            Subtotal:
          </ThemedText>
          <ThemedText>
            {numberFormat(forecastPayload?.grossIncome || 0)}
          </ThemedText>
        </View>
      </View>

      {/* Third container - Deductions */}
      <View
        style={[
          styles.cardWrapper,
          { backgroundColor: isDark ? colors.inputBox : "#f4f6f7" },
        ]}
      >
        <View style={styles.cardRow}>
          <ThemedText type="defaultSemiBold">
            Deductions & Relief Summary
          </ThemedText>
        </View>
        <View style={styles.cardRow}>
          <ThemedText style={{ flex: 1 }}>Pension contributions:</ThemedText>
          <ThemedText>
            {numberFormat(forecastPayload?.pension_contribution || 0)}
          </ThemedText>
        </View>
        <View style={styles.cardRow}>
          <ThemedText style={{ flex: 1 }}>NHF contributions:</ThemedText>
          <ThemedText>
            {numberFormat(forecastPayload?.national_housing_fund || 0)}
          </ThemedText>
        </View>
        <View style={styles.cardRow}>
          <ThemedText style={{ flex: 1 }}>House rent:</ThemedText>
          <ThemedText>
            {numberFormat(forecastPayload?.house_rent || 0)}
          </ThemedText>
        </View>
        <View style={styles.cardRow}>
          <ThemedText style={{ flex: 1 }}>NHIS contributions:</ThemedText>
          <ThemedText>
            {numberFormat(
              forecastPayload?.National_health_insurance_scheme || 0
            )}
          </ThemedText>
        </View>
        <View style={styles.cardRow}>
          <ThemedText style={{ flex: 1 }}>Life Assurance premium:</ThemedText>
          <ThemedText>
            {numberFormat(forecastPayload?.life_insurance_premium || 0)}
          </ThemedText>
        </View>
        <View style={styles.cardRow}>
          <ThemedText style={{ flex: 1 }}>
            Voluntary Pension Contribution:
          </ThemedText>
          <ThemedText>
            {numberFormat(forecastPayload?.voluntary_pension_contribution || 0)}
          </ThemedText>
        </View>
        <View style={styles.cardRow}>
          <ThemedText type="defaultSemiBold" style={{ flex: 1 }}>
            Subtotal:
          </ThemedText>
          <ThemedText>
            {numberFormat(forecastPayload?.totalDeductions || 0)}
          </ThemedText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 10,
    padding: globalStyles.padding.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: globalStyles.margin.lg + 2,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: globalStyles.padding.xs - 2,
  },
  btnWrapper: {
    padding: globalStyles.padding.sm + 3,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: globalStyles.margin.lg + 2,
  },
  btnStyle: {
    alignItems: "center",
    height: 56,
    justifyContent: "center",
    borderRadius: globalStyles.radius.xs - 4,
    backgroundColor: "transparent",
    borderWidth: 2,
    marginTop: globalStyles.margin.sm,
  },
});
