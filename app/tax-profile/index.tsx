import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";

import { Input, ScreenHeader, ScreenWrapper } from "@/components/common";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme-color";
import { globalStyles } from "@/utils";
import { useForm } from "react-hook-form";

export default function Index() {
  const { control } = useForm();
  const { colors, isDark } = useTheme();
  return (
    <ScreenWrapper>
      <ScreenHeader title="Tax Profile" />
      <ScrollView>
        <View style={styles.mainWrapper}>
          <>
            <View style={styles.rowWrapper}>
              <ThemedText type="defaultSemiBold">Personal Info</ThemedText>
              <Pressable>
                <Image
                  source={require("../../assets/icons/edit.png")}
                  style={styles.editIcon}
                />
              </Pressable>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: "48%",
                }}
              >
                <Input
                  control={control}
                  inputName="first_name"
                  placeholder="Enter First name"
                  label="First Name"
                  showLabel
                />
              </View>

              <View
                style={{
                  width: "48%",
                }}
              >
                <Input
                  control={control}
                  inputName="last_name"
                  placeholder="Enter Last name"
                  label="Last Name"
                  showLabel
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: "48%",
                }}
              >
                <Input
                  control={control}
                  inputName="state_of_residence"
                  placeholder="Enter State of Residence"
                  label="State"
                  showLabel
                />
              </View>

              <View
                style={{
                  width: "48%",
                }}
              >
                <Input
                  control={control}
                  inputName="employment_type"
                  placeholder="Enter Employment Type"
                  label="Employment Type"
                  showLabel
                />
              </View>
            </View>
          </>

          <>
            <View
              style={[
                styles.rowWrapper,
                {
                  marginTop: globalStyles.margin.lg + 7,
                },
              ]}
            >
              <ThemedText type="defaultSemiBold">Income & Housing </ThemedText>
              <Pressable>
                <Image
                  source={require("../../assets/icons/edit.png")}
                  style={styles.editIcon}
                />
              </Pressable>
            </View>
            <View style={styles.inputWrapper}>
              <Input
                control={control}
                inputName="gross_income"
                label="Annual Gross Income"
                showLabel
                placeholder="e.g 350,000"
              />
              <Input
                control={control}
                inputName="annual_rent"
                label="Annual Rent"
                showLabel
                placeholder="e.g 350,000"
              />
              <Input
                control={control}
                inputName="employer_provided_housing"
                label="Employer-provided housing"
                showLabel
                placeholder="e.g Yes/No"
              />
            </View>
          </>

          <>
            <View
              style={[
                styles.rowWrapper,
                {
                  marginTop: globalStyles.margin.lg + 7,
                },
              ]}
            >
              <ThemedText type="defaultSemiBold">
                Contributions & Relief{" "}
              </ThemedText>
              <Pressable>
                <Image
                  source={require("../../assets/icons/edit.png")}
                  style={styles.editIcon}
                />
              </Pressable>
            </View>
            <View style={[styles.inputWrapper, {}]}>
              <Input
                control={control}
                inputName="pension_contributions"
                label="Pension Contributions"
                showLabel
                placeholder="e.g 350,000"
              />
              <Input
                control={control}
                inputName="nhis_contributions"
                label="NHIS Contributions"
                showLabel
                placeholder="e.g 350,000"
              />
            </View>
          </>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    paddingHorizontal: globalStyles.wrapper,
    paddingTop: globalStyles.padding.sm + 4,
    paddingBottom: globalStyles.margin.xxl,
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  rowWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputWrapper: {
    marginTop: globalStyles.margin.xs,
  },
});
