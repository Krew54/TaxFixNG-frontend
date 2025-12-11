import { useTheme } from "@/hooks/use-theme-color";
import { TabProps } from "@/types";
import { globalStyles } from "@/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Input } from "../common";
import { CustomSwitch } from "../switch";
import { ThemedText } from "../themed-text";

const rentSituation = ["Rented Apartment", "Self Owned"];
const haveMortgage = ["Yes", "No"];

export const Tab3 = ({ goToNext }: TabProps) => {
  const [switchOn, setSwitchOn] = useState(false);
  const [selectedRentSituation, setSelectedRentSituation] = useState<
    string | null
  >(null);
  const [selectedMortgage, setSelectedMortgage] = useState<string | null>(null);
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
          {rentSituation.map((type) => {
            const isSelected = selectedRentSituation === type;

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
                onTouchEnd={() => setSelectedRentSituation(type)}
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

      {selectedRentSituation === "Self Owned" && (
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
            {haveMortgage.map((type) => {
              const isSelected = selectedMortgage === type;

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
                  onTouchEnd={() => setSelectedMortgage(type)}
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
        </>
      )}

      <Input
        inputName="annual_rent"
        control={control}
        label="Annual Rent Amount (₦)"
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
