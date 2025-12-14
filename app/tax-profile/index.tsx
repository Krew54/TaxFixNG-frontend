import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";

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
import { checkAuth, globalStyles, showToast } from "@/utils";
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
        employment_income: data?.employment_income.toString() || 0,
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

    const { first_name, last_name, ...rest } = data;

    const payload = {
      ...rest,
      name: `${first_name} ${last_name}`,
    };

    if (isProfile) {
      updateProfile({
        payload,
      });
      return;
    }
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
                  placeholder="Enter State of Residence"
                  label="State"
                  showLabel
                  rules={{
                    required: "State is required",
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
                  inputName="employment_type"
                  placeholder="Enter Employment Type"
                  label="Employment Type"
                  showLabel
                  rules={{
                    required: "Employment type is required",
                  }}
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
                inputName="employment_income"
                label="Annual Gross Income"
                showLabel
                placeholder="e.g 350,000"
                rules={{
                  required: "Gross Income is required",
                }}
                keyboardType="numeric"
                formatNumber
              />
              <Input
                control={control}
                inputName="house_rent"
                label="Annual Rent"
                showLabel
                placeholder="e.g 350,000"
                rules={{
                  required: "Rent is required",
                }}
                formatNumber
                keyboardType="numeric"
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
                inputName="pension_contribution"
                label="Pension Contributions"
                showLabel
                placeholder="e.g 350,000"
                rules={{
                  required: "Pension Contribution is required",
                }}
                keyboardType="numeric"
                formatNumber
              />
              <Input
                control={control}
                inputName="National_health_insurance_scheme"
                label="NHIS Contributions"
                showLabel
                placeholder="e.g 350,000"
                rules={{
                  required: "NHIS is required",
                }}
                keyboardType="numeric"
                formatNumber
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
