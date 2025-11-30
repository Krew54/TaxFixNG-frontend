import { useTheme } from "@/hooks/use-theme-color";
import { globalStyles } from "@/utils";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";

export const Tab4 = () => {
  const { colors, isDark } = useTheme();
  return (
    <View>
      <ThemedText
        type="subtitle"
        style={{
          color: colors.primary,
          marginBottom: globalStyles.margin.sm,
        }}
      >
        Summary
      </ThemedText>
      <View
        style={[
          styles.cardWrapper,
          {
            backgroundColor: isDark ? colors.inputBox : "#f4f6f7",
          },
        ]}
      >
        <View style={styles.cardRow}>
          <ThemedText
            style={{
              flex: 1,
            }}
          >
            Your withholdings:
          </ThemedText>
          <ThemedText>N2,500,780</ThemedText>
        </View>
        <View style={styles.cardRow}>
          <ThemedText
            style={{
              flex: 1,
            }}
          >
            Your withholdings:
          </ThemedText>
          <ThemedText>N2,500,780</ThemedText>
        </View>
        <View style={styles.cardRow}>
          <ThemedText
            style={{
              flex: 1,
            }}
            type="defaultSemiBold"
          >
            Your estimated tax due:
          </ThemedText>
          <ThemedText>N2,500,780</ThemedText>
        </View>
      </View>

      <View
        style={[
          styles.cardWrapper,
          {
            backgroundColor: isDark ? colors.inputBox : "#f4f6f7",
          },
        ]}
      >
        <View style={styles.cardRow}>
          <ThemedText type="defaultSemiBold">Income Breakdown</ThemedText>
        </View>
        <View style={styles.cardRow}>
          <ThemedText
            style={{
              flex: 1,
            }}
          >
            Gross Annual Income:
          </ThemedText>
          <ThemedText>N2,500,780</ThemedText>
        </View>
        <View style={styles.cardRow}>
          <ThemedText
            style={{
              flex: 1,
            }}
          >
            Taxable income (before pension/NHF):
          </ThemedText>
          <ThemedText>N2,500,780</ThemedText>
        </View>
        <View style={styles.cardRow}>
          <ThemedText
            style={{
              flex: 1,
            }}
          >
            Pension contributions:
          </ThemedText>
          <ThemedText>N2,500,780</ThemedText>
        </View>
        <View style={styles.cardRow}>
          <ThemedText
            style={{
              flex: 1,
            }}
          >
            NHS contributions:
          </ThemedText>
          <ThemedText>N2,500,780</ThemedText>
        </View>
        <View style={styles.cardRow}>
          <ThemedText
            style={{
              flex: 1,
            }}
          >
            Other income:
          </ThemedText>
          <ThemedText>N2,500,780</ThemedText>
        </View>
        <View style={styles.cardRow}>
          <ThemedText
            type="defaultSemiBold"
            style={{
              flex: 1,
            }}
          >
            Subtotal:
          </ThemedText>
          <ThemedText>N2,500,780</ThemedText>
        </View>
      </View>

      <View
        style={[
          styles.cardWrapper,
          {
            backgroundColor: isDark ? colors.inputBox : "#f4f6f7",
          },
        ]}
      >
        <View style={styles.cardRow}>
          <ThemedText type="defaultSemiBold">Deductions</ThemedText>
        </View>
        <View style={styles.cardRow}>
          <ThemedText
            style={{
              flex: 1,
            }}
          >
            Consolidated Relief Allowance (CRA):
          </ThemedText>
          <ThemedText>N2,500,780</ThemedText>
        </View>
        <View style={styles.cardRow}>
          <ThemedText
            style={{
              flex: 1,
            }}
          >
            Pension contributions:
          </ThemedText>
          <ThemedText>N2,500,780</ThemedText>
        </View>
        <View style={styles.cardRow}>
          <ThemedText
            style={{
              flex: 1,
            }}
          >
            NHF contributions:
          </ThemedText>
          <ThemedText>N2,500,780</ThemedText>
        </View>
        <View style={styles.cardRow}>
          <ThemedText
            style={{
              flex: 1,
            }}
          >
            NHIS contributions:
          </ThemedText>
          <ThemedText>N2,500,780</ThemedText>
        </View>
        <View style={styles.cardRow}>
          <ThemedText
            style={{
              flex: 1,
            }}
          >
            Life Assurance premium:
          </ThemedText>
          <ThemedText>N2,500,780</ThemedText>
        </View>
        <View style={styles.cardRow}>
          <ThemedText
            style={{
              flex: 1,
            }}
          >
            Housing Relief:
          </ThemedText>
          <ThemedText>N2,500,780</ThemedText>
        </View>
        <View style={styles.cardRow}>
          <ThemedText
            style={{
              flex: 1,
            }}
          >
            Voluntary Pension Contribution:
          </ThemedText>
          <ThemedText>N2,500,780</ThemedText>
        </View>
        <View style={styles.cardRow}>
          <ThemedText
            type="defaultSemiBold"
            style={{
              flex: 1,
            }}
          >
            Subtotal:
          </ThemedText>
          <ThemedText>N2,500,780</ThemedText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 10,
    padding: globalStyles.padding.sm,
    // --- Shadow (iOS) ---
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    // --- Shadow (Android) ---
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
