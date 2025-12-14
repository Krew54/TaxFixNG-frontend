import { getData, storeData } from "@/helpers";
import { useEstimateTax } from "@/hooks/profile";
import { useTheme } from "@/hooks/use-theme-color";
import { TabProps } from "@/types";
import { globalStyles } from "@/utils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Input } from "../common";
import { CustomSwitch } from "../switch";
import { ThemedText } from "../themed-text";

const rentSituation = [
  {
    name: "Rented Apartment",
    value: "rented_apartment",
  },
  {
    name: "Self Owned",
    value: "self_owned",
  },
];
const haveMortgage = [
  {
    name: "Yes",
    value: "yes",
  },
  {
    name: "No",
    value: "no",
  },
];

type OptionType = {
  name: string;
  value: string;
};
export const Tab3 = ({ goToNext }: TabProps) => {
  const [switchOn, setSwitchOn] = useState(false);
  const [selectedRentSituation, setSelectedRentSituation] =
    useState<OptionType>({
      name: "Rented Apartment",
      value: "rented_apartment",
    });
  const [selectedMortgage, setSelectedMortgage] = useState<OptionType>({
    name: "Yes",
    value: "yes",
  });
  const { colors } = useTheme();
  const { control, reset, handleSubmit } = useForm();

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
        house_rent: data.house_rent?.toString() || "",
      });
    };

    hydrate();
  }, []);

  const { isPending, mutate } = useEstimateTax(async (response) => {
    if (response.status >= 400) {
      // handle error
      return;
    }
    await storeData("forecast_summary", response.data);
    goToNext?.();
  });

  const handleContinue = async (formData: any) => {
    const existing = await getData("forecast_payload");
    const parsedExisting = existing ? existing : {};
    const payload = {
      ...parsedExisting,
      house_rent: formData.house_rent,
    };

    await storeData("forecast_payload", payload);
    mutate({ payload });
  };
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
      <ThemedText
        style={{
          marginTop: globalStyles.margin.sm,
          color: colors.body,
        }}
      >
        What is your housing situation?
      </ThemedText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row", marginTop: 10, gap: 12 }}>
          {rentSituation.map((item, index) => {
            const isSelected = selectedRentSituation.value === item.value;

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
                  setSelectedRentSituation({
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

      <>
        <ThemedText
          style={{
            marginTop: globalStyles.margin.sm,
            color: colors.body,
          }}
        >
          Do you pay mortgage on the apartment ?
        </ThemedText>

        <View style={{ flexDirection: "row", marginTop: 10, gap: 12 }}>
          {haveMortgage.map((item, index) => {
            const isSelected = selectedMortgage.value === item.value;

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
                  setSelectedMortgage({
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
      </>

      <Input
        inputName="house_rent"
        control={control}
        label="Annual Rent Amount (₦)"
        placeholder="e.g 2,500,000"
        showLabel
        keyboardType="numeric"
        formatNumber
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
      <Button
        label="Continue"
        loading={isPending}
        onPress={handleSubmit(handleContinue)}
        active
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
    marginBottom: globalStyles.margin.lg,
  },
});
