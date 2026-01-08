import { ScreenHeader, ScreenWrapper } from "@/components/common";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme-color";
import { globalStyles } from "@/utils";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Index() {
  const { colors, isDark } = useTheme();

  const { profile }: any = useLocalSearchParams();
  const parsedProfile = profile
    ? JSON.parse(decodeURIComponent(profile as string))
    : null;

  console.log(parsedProfile);

  const incomeSubtotal =
    Number(parsedProfile?.employment_income || 0) +
    Number(parsedProfile?.business_income || 0) +
    Number(parsedProfile?.other_income || 0) +
    Number(parsedProfile?.chargeable_gains || 0);

  const deductionsSubtotal =
    Number(parsedProfile?.pension_contribution || 0) +
    Number(parsedProfile?.national_housing_fund || 0) +
    Number(parsedProfile?.house_rent || 0) +
    Number(parsedProfile?.National_health_insurance_scheme || 0) +
    Number(parsedProfile?.life_insurance_premium || 0) +
    Number(parsedProfile?.voluntary_pension_contribution || 0);

  const numberFormat = (value: number | string | undefined) => {
    if (!value && value !== 0) return "₦0";
    const num = typeof value === "string" ? parseFloat(value) : value;
    return `₦${num.toLocaleString("en-NG")}`;
  };

  return (
    <ScreenWrapper>
      <ScreenHeader title="Summary" />
      <ScrollView>
        <ThemedView style={styles.mainWrapper}>
          <ThemedText
            style={{
              marginBottom: globalStyles.margin.lg,
            }}
          >
            Review and compare your past tax estimates.
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
                {numberFormat(parsedProfile?.gross_tax_liability || 0)}
              </ThemedText>
            </View>
            <View style={styles.cardRow}>
              <ThemedText
                style={{ flex: 1, marginLeft: globalStyles.margin.sm }}
              >
                Total Deductible:
              </ThemedText>
              <ThemedText>
                {numberFormat(parsedProfile?.total_deductions || 0)}
              </ThemedText>
            </View>

            <View
              style={[
                styles.cardRow,
                {
                  borderTopWidth: 1,
                },
              ]}
            >
              <ThemedText type="defaultSemiBold" style={{ flex: 1 }}>
                Estimated Tax Due:
              </ThemedText>
              <ThemedText>
                {numberFormat(parsedProfile?.estimated_tax || 0)}
              </ThemedText>
            </View>
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
                {numberFormat(parsedProfile?.employment_income || 0)}
              </ThemedText>
            </View>
            <View style={styles.cardRow}>
              <ThemedText style={{ flex: 1 }}>Other Taxable income:</ThemedText>
              <ThemedText>
                {numberFormat(parsedProfile?.other_income || 0)}
              </ThemedText>
            </View>

            <View
              style={[
                styles.cardRow,
                {
                  borderTopWidth: 1,
                },
              ]}
            >
              <ThemedText type="defaultSemiBold" style={{ flex: 1 }}>
                Total Taxable income:
              </ThemedText>
              <ThemedText>{numberFormat(incomeSubtotal)}</ThemedText>
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
              <ThemedText style={{ flex: 1 }}>
                Pension contributions:
              </ThemedText>
              <ThemedText>
                {numberFormat(parsedProfile?.pension_contribution || 0)}
              </ThemedText>
            </View>
            <View style={styles.cardRow}>
              <ThemedText style={{ flex: 1 }}>NHF contributions:</ThemedText>
              <ThemedText>
                {numberFormat(parsedProfile?.national_housing_fund || 0)}
              </ThemedText>
            </View>
            <View style={styles.cardRow}>
              <ThemedText style={{ flex: 1 }}>House rent:</ThemedText>
              <ThemedText>
                {numberFormat(parsedProfile?.house_rent || 0)}
              </ThemedText>
            </View>
            <View style={styles.cardRow}>
              <ThemedText style={{ flex: 1 }}>NHIS contributions:</ThemedText>
              <ThemedText>
                {numberFormat(
                  parsedProfile?.National_health_insurance_scheme || 0
                )}
              </ThemedText>
            </View>
            <View style={styles.cardRow}>
              <ThemedText style={{ flex: 1 }}>
                Life Assurance premium:
              </ThemedText>
              <ThemedText>
                {numberFormat(parsedProfile?.life_insurance_premium || 0)}
              </ThemedText>
            </View>
            <View style={styles.cardRow}>
              <ThemedText style={{ flex: 1 }}>
                Voluntary Pension Contribution:
              </ThemedText>
              <ThemedText>
                {numberFormat(
                  parsedProfile?.voluntary_pension_contribution || 0
                )}
              </ThemedText>
            </View>
            <View
              style={[
                styles.cardRow,
                {
                  borderTopWidth: 1,
                },
              ]}
            >
              <ThemedText type="defaultSemiBold" style={{ flex: 1 }}>
                Total Deductions:
              </ThemedText>
              <ThemedText>{numberFormat(deductionsSubtotal)}</ThemedText>
            </View>
          </View>
        </ThemedView>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    paddingTop: globalStyles.margin.lg,
    paddingHorizontal: globalStyles.wrapper,
  },
  btnWrapper: {
    backgroundColor: "#F4F6F7",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: globalStyles.padding.sm,
    borderRadius: 10,
    // --- Shadow (iOS) ---
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,

    // --- Shadow (Android) ---
    elevation: 4,
    marginBottom: globalStyles.margin.lg + 2,
  },
  emptyStateWrapper: {
    backgroundColor: "#F4F6F7",

    padding: globalStyles.padding.md,
    borderRadius: 10,
    // --- Shadow (iOS) ---
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,

    // --- Shadow (Android) ---
    elevation: 4,
  },
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
});
