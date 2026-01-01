import { ScrollView, StyleSheet, View } from "react-native";

import {
  Button,
  Input,
  ScreenHeader,
  ScreenWrapper,
} from "@/components/common";
import { ThemedText } from "@/components/themed-text";
import {
  useCreateProfile,
  useGetProfile,
  useUpdateProfile,
} from "@/hooks/profile";
import { useTheme } from "@/hooks/use-theme-color";
import {
  checkAuth,
  EMPLOYMENT_TYPES,
  globalStyles,
  showToast,
  STATES,
} from "@/utils";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { queryClient } from "../_layout";

export default function Index() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
  });
  const { colors, isDark } = useTheme();

  const [isProfile, setIsProfile] = useState(false);
  const { data } = useGetProfile();

  useEffect(() => {
    if (!data) return;
    if (data.status >= 400) {
      setIsProfile(false);
    } else {
      reset({
        first_name: data?.Name.split(" ")[0] || "",
        last_name: data?.Name.split(" ")[1] || "",
        state_of_residence: data?.state_of_residence || "",
        employment_type: data?.employment_type || "",
        employment_income: data?.employment_income.toString() || "",
        house_rent: data?.house_rent.toString() || "",
        pension_contribution: data.pension_contribution.toString() || "",
        National_health_insurance_scheme:
          data.National_health_insurance_scheme.toString() || "",
      });
      setIsProfile(true);
    }
  }, [data]);

  const { isPending, mutate } = useCreateProfile((response) => {
    if (response.status >= 400) {
      console.log(response.data);
      showToast({
        label: "Error",
        message: response.data.detail,
        type: "error",
      });
      // handle error
    } else {
      showToast({
        label: "Success",
        message: "Tax profile created successfully",
        type: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["getProfile"],
      });
      router.back();
    }
  });

  const { isPending: isSubmitting, mutate: updateProfile } = useUpdateProfile(
    (response) => {
      console.log(response);

      if (response.status >= 400) {
        showToast({
          label: "Error",
          message: response.data.detail,
          type: "error",
        });
        // handle error
      } else {
        showToast({
          label: "Success",
          message: "Tax profile updated successfully",
          type: "success",
        });
        queryClient.invalidateQueries({
          queryKey: ["getProfile"],
        });
        router.back();
      }
    }
  );

  const onSubmit = async (data: any) => {
    const isLoggedIn = await checkAuth();
    if (!isLoggedIn) return;

    const {
      first_name,
      last_name,
      employment_income,
      house_rent,
      pension_contribution,
      National_health_insurance_scheme,
      ...rest
    } = data;

    const payload = {
      ...rest,
      Name: `${first_name} ${last_name}`,
      employment_income: Number(employment_income) || 0,
      house_rent: Number(house_rent) || 0,
      pension_contribution: Number(pension_contribution) || 0,
      National_health_insurance_scheme:
        Number(National_health_insurance_scheme) || 0,
    };

    if (isProfile) {
      updateProfile({
        payload,
      });
    } else
      mutate({
        payload,
      });
  };

  return (
    <ScreenWrapper>
      <ScreenHeader title="Tax Profile" />
      <ScrollView>
        <View style={styles.mainWrapper}>
          <>
            <View style={styles.rowWrapper}>
              <ThemedText type="defaultSemiBold">Personal Info</ThemedText>
              {/* <Pressable>
                <Image
                  source={require("../../assets/icons/edit.png")}
                  style={styles.editIcon}
                />
              </Pressable> */}
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
                  rules={{
                    required: "First name is required",
                  }}
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
                  rules={{
                    required: "Last name is required",
                  }}
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
                  label="State"
                  placeholder="Select state"
                  showLabel
                  type="select"
                  rules={{ required: "State is required" }}
                  options={STATES}
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
                  label="Employment Type"
                  placeholder="Select employment type"
                  showLabel
                  type="select"
                  rules={{ required: "Employment type is required" }}
                  options={EMPLOYMENT_TYPES}
                  editable={false}
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
              {/* <Pressable>
                <Image
                  source={require("../../assets/icons/edit.png")}
                  style={styles.editIcon}
                />
              </Pressable> */}
            </View>
            <View style={styles.inputWrapper}>
              <Input
                control={control}
                inputName="employment_income"
                label="Annual Gross Income"
                showLabel
                placeholder="e.g 350,000"
                keyboardType="numeric"
                formatNumber
                editable={false}
              />
              <Input
                control={control}
                inputName="house_rent"
                label="Annual Rent"
                showLabel
                placeholder="e.g 350,000"
                formatNumber
                keyboardType="numeric"
                editable={false}
              />
              {/* <Input
                control={control}
                inputName="employer_provided_housing"
                label="Employer-provided housing"
                showLabel
                placeholder="e.g Yes/No"
                rules={{
                    required: "State is required",
                  }}
              /> */}
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
              {/* <Pressable>
                <Image
                  source={require("../../assets/icons/edit.png")}
                  style={styles.editIcon}
                />
              </Pressable> */}
            </View>
            <View style={[styles.inputWrapper, {}]}>
              <Input
                control={control}
                inputName="pension_contribution"
                label="Pension Contributions"
                showLabel
                placeholder="e.g 350,000"
                keyboardType="numeric"
                formatNumber
                editable={false}
              />
              <Input
                control={control}
                inputName="National_health_insurance_scheme"
                label="NHIS Contributions"
                showLabel
                placeholder="e.g 350,000"
                keyboardType="numeric"
                formatNumber
                editable={false}
              />
            </View>
          </>
          <Button
            label={isProfile ? "Update" : "Save"}
            onPress={handleSubmit(onSubmit)}
            active={isValid}
            loading={isPending || isSubmitting}
            style={{
              marginTop: globalStyles.margin.xl,
            }}
          />
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
