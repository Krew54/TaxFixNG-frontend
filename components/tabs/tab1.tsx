import { getData } from "@/helpers";
import { useTheme } from "@/hooks/use-theme-color";
import { globalStyles } from "@/utils";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Input } from "../common";
import { CustomSwitch } from "../switch";
import { ThemedText } from "../themed-text";

export const Tab1 = () => {
  const [switchOn, setSwitchOn] = useState(false);
  const { colors } = useTheme();
  const { control } = useForm();

  const incomeTypes = ["Salaried", "Self employed", "Unemployed"];
  const employmentIncomeTypes = ["Monthly", "Annual"];
  const [selectedIncome, setSelectedIncome] = useState<string | null>(null);
  const [selectedEmploymentIncome, setSelectedEmploymentIncome] = useState<
    string | null
  >(null);

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

      <ThemedText
        style={{
          marginTop: globalStyles.margin.sm,
          color: colors.body,
        }}
      >
        Employment Type
      </ThemedText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row", marginTop: 10, gap: 12 }}>
          {incomeTypes.map((type) => {
            const isSelected = selectedIncome === type;

            return (
              <View
                key={type}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderRadius: 8,
                  borderColor: isSelected ? colors.primary : colors.border,
                  backgroundColor: isSelected
                    ? colors.primary + "22"
                    : "transparent",
                }}
                onTouchEnd={() => setSelectedIncome(type)}
              >
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 4,
                    borderWidth: 2,
                    borderColor: colors.primary,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 6,
                    backgroundColor: isSelected
                      ? colors.primary
                      : "transparent",
                  }}
                />

                <ThemedText
                  style={{
                    color: colors.text,
                    fontSize: 14,
                  }}
                >
                  {type}
                </ThemedText>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <ThemedText
        style={{
          marginTop: globalStyles.margin.sm,
          color: colors.body,
        }}
      >
        Employment Income
      </ThemedText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row", marginTop: 10, gap: 12 }}>
          {employmentIncomeTypes.map((type) => {
            const isSelected = selectedEmploymentIncome === type;

            return (
              <View
                key={type}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderRadius: 8,
                  borderColor: isSelected ? colors.primary : colors.border,
                  backgroundColor: isSelected
                    ? colors.primary + "22"
                    : "transparent",
                }}
                onTouchEnd={() => setSelectedEmploymentIncome(type)}
              >
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 4,
                    borderWidth: 2,
                    borderColor: colors.primary,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 6,
                    backgroundColor: isSelected
                      ? colors.primary
                      : "transparent",
                  }}
                />

                <ThemedText
                  style={{
                    color: colors.text,
                    fontSize: 14,
                  }}
                >
                  {type}
                </ThemedText>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {selectedEmploymentIncome && (
        <Input
          inputName="annual_income"
          control={control}
          label={`Gross ${selectedEmploymentIncome} Income (N)`}
          placeholder="e.g 2,500,780"
          showLabel
          keyboardType="numeric"
        />
      )}

      <View style={styles.switchWrapper}>
        <ThemedText
          style={{
            flex: 1,
          }}
        >
          Do you have other income?{" "}
        </ThemedText>
        <CustomSwitch
          value={switchOn}
          onValueChange={() => {
            setSwitchOn(!switchOn);
          }}
        />
      </View>
      <View
        style={[
          styles.switchWrapper,
          {
            marginTop: 0,
          },
        ]}
      >
        <ThemedText
          style={{
            flex: 1,
          }}
        >
          Did you make profits from selling your assest like land, shares,
          properties ?
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
