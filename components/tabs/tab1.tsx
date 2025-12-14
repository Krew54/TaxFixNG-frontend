import { getData, storeData } from "@/helpers";
import { useTheme } from "@/hooks/use-theme-color";
import { TabProps } from "@/types";
import { globalStyles } from "@/utils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Input } from "../common";
import { CustomSwitch } from "../switch";
import { ThemedText } from "../themed-text";

const incomeTypes = [
  {
    name: "Salaried",
    value: "salaried",
  },
  {
    name: "Self Employed",
    value: "self_employed",
  },
];
const employmentIncomeTypes = [
  {
    name: "Monthly",
    value: "monthly",
  },
  {
    name: "Annually",
    value: "annually",
  },
];

export const Tab1 = ({ goToNext }: TabProps) => {
  const [makeProfitSelling, setMakeProfitSelling] = useState(false);
  const [haveOtherIncome, setHaveOtherIncome] = useState(false);
  const { colors } = useTheme();
  const {
    control,
    handleSubmit,
    resetField,
    reset,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
  });

  const [selectedIncome, setSelectedIncome] = useState<{
    name: string;
    value: string;
  }>({
    name: "Salaried",
    value: "salaried",
  });
  const [selectedEmploymentIncome, setSelectedEmploymentIncome] = useState<{
    name: string;
    value: string;
  }>({
    name: "Monthly",
    value: "monthly",
  });

  useEffect(() => {
    const hydrate = async () => {
      const stored = await getData("forecast_payload");

      if (!stored) return;

      const data = stored;

      reset({
        employment_income: data.employment_income?.toString() || "",
        other_income: data.other_income?.toString() || "",
        chargeable_gains: data.chargeable_gains?.toString() || "",
      });
    };

    hydrate();
  }, []);

  const handleContinue = async (formData: any) => {
    const payload = {
      employment_type: selectedIncome.value,
      employment_income_type: selectedEmploymentIncome.value,
      employment_income: formData.employment_income,
      other_income: haveOtherIncome ? formData.other_income : 0,
      chargeable_gains: makeProfitSelling ? formData.chargeable_gains : 0,
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
          {incomeTypes.map((item, index) => {
            const isSelected = selectedIncome.value === item.value;

            return (
              <View
                key={index}
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
                onTouchEnd={() =>
                  setSelectedIncome({ name: item.name, value: item.value })
                }
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
                  {item.name}
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
          {employmentIncomeTypes.map((item, index) => {
            const isSelected = selectedEmploymentIncome.value === item.value;

            return (
              <View
                key={index}
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
                onTouchEnd={() =>
                  setSelectedEmploymentIncome({
                    name: item.name,
                    value: item.value,
                  })
                }
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
                  {item.name}
                </ThemedText>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {selectedEmploymentIncome.name && (
        <Input
          inputName="employment_income"
          control={control}
          label={`Gross ${selectedEmploymentIncome.name} Income (₦)`}
          placeholder="e.g 2,500,000"
          showLabel
          keyboardType="numeric"
          rules={{
            required: "Employment income required",
          }}
          formatNumber
        />
      )}

      <View
        style={{
          marginTop: globalStyles.margin.sm,
        }}
      >
        <View style={styles.switchWrapper}>
          <ThemedText
            style={{
              flex: 1,
            }}
          >
            Do you have other taxable income?{" "}
          </ThemedText>
          <CustomSwitch
            value={haveOtherIncome}
            onValueChange={(val) => {
              setHaveOtherIncome(val);
              if (!val) {
                resetField("other_income");
              }
            }}
          />
        </View>
        {haveOtherIncome && (
          <Input
            control={control}
            label="Other Income"
            inputName="other_income"
            placeholder="e.g 3000"
            showLabel
            rules={{
              required: haveOtherIncome ? "Other income required" : false,
            }}
            formatNumber
          />
        )}
      </View>

      <View
        style={{
          marginTop: globalStyles.margin.sm,
        }}
      >
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
            value={makeProfitSelling}
            onValueChange={(val) => {
              setMakeProfitSelling(val);
              if (!val) {
                resetField("chargeable_gains");
              }
            }}
          />
        </View>

        {makeProfitSelling && (
          <Input
            control={control}
            label="Amount Gained"
            inputName="chargeable_gains"
            placeholder="e.g 3000"
            showLabel
            rules={{
              required: makeProfitSelling ? "Amount gained required" : false,
            }}
            formatNumber
          />
        )}
      </View>
      <Button
        label="Continue"
        onPress={handleSubmit(handleContinue)}
        active={isValid}
        style={{
          marginTop: globalStyles.margin.md,
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
  },
});
