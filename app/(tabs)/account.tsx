import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { Button, ScreenHeader, ScreenWrapper } from "@/components/common";
import { ThemedText } from "@/components/themed-text";
import { Skeleton } from "@/components/ui/skeleton";
import { deleteData, getData } from "@/helpers";
import { useGetProfile } from "@/hooks/profile";
import { useTheme } from "@/hooks/use-theme-color";
import { formatWithCommas, globalStyles } from "@/utils";
import { router } from "expo-router";
import { useEffect, useState } from "react";

export default function Account() {
  const { colors, isDark } = useTheme();
  const [settings, setSettings] = useState<any>([]);

  const [isProfile, setIsProfile] = useState(false);
  const { data, isLoading } = useGetProfile();

  useEffect(() => {
    if (!data) return;
    if (data.status >= 400) {
      setIsProfile(false);
    } else {
      setIsProfile(true);
    }
  }, [data]);

  const TAX_PROFILE = [
    {
      label: "State",
      value: isProfile ? data?.state_of_residence : "-",
    },
    {
      label: "Annual Income",
      value: isProfile ? `₦${formatWithCommas(data?.employment_income)}` : "-",
    },
    {
      label: "Total Deductions",
      value: isProfile ? data.data?.dependants || "Not set" : "-",
    },
    {
      label: "Rent Relief",
      value: isProfile ? `₦${formatWithCommas(data?.house_rent)}` : "-",
    },
  ];

  useEffect(() => {
    const load = async () => {
      const token = await getData("token");

      setSettings([
        {
          label: "Tax Forecasts",
          caption: "Manage the forecast saved.",
          screen: "/saved-forecasts",
          icon: require("../../assets/icons/bag.png"),
        },
        {
          label: "Saved Expenses",
          caption: "Manage the expenses saved",
          screen: "/expenses",
          icon: require("../../assets/icons/pencil.png"),
        },
        {
          label: "Reset Password",
          caption: "Change your password",
          screen: "/change-password",
          icon: require("../../assets/icons/settings.png"),
        },

        // 👇 AUTH ACTION
        ...(token
          ? [
              {
                label: "Log out",
                caption: "Sign out of the App.",
                icon: require("../../assets/icons/logout.png"),
              },
            ]
          : [
              {
                label: "Log in",
                caption: "Sign in to your account.",
                screen: "/login",
                icon: require("../../assets/icons/login.png"),
              },
            ]),
      ]);
    };

    load();
  }, []);

  const handlePress = (label: string, screen: any) => {
    if (label === "Log out") {
      Alert.alert(
        "Confirm Logout",
        "Are you sure you want to sign out?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Log out",
            style: "destructive",
            onPress: async () => {
              await deleteData("token");
              router.replace("/login");
            },
          },
        ],
        { cancelable: true }
      );
    } else {
      router.push(screen);
    }
  };

  return (
    <ScreenWrapper>
      <ScreenHeader title="Account" hideBackBtn />
      <ScrollView>
        <View style={styles.mainWrapper}>
          <ThemedText type="subtitle">Tax Profile</ThemedText>
          <View style={styles.taxProfileWrapper}>
            {TAX_PROFILE.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.taxProfileStyle,
                  {
                    backgroundColor: isDark ? colors.inputBox : "#f7fafa",
                  },
                ]}
              >
                <ThemedText
                  style={{
                    color: colors.body,
                    fontSize: 12,
                    marginBottom: 8,
                  }}
                >
                  {item.label}
                </ThemedText>
                {isLoading ? (
                  <Skeleton
                    width={"30%"}
                    style={{
                      marginTop: 4,
                    }}
                  />
                ) : (
                  <ThemedText
                    type="defaultSemiBold"
                    style={{
                      color: colors.primary,
                      textTransform: "capitalize",
                    }}
                  >
                    {item.value}
                  </ThemedText>
                )}
              </View>
            ))}
          </View>
          {isLoading ? (
            <Skeleton style={styles.skeletonWrapper} />
          ) : (
            <Button
              label={isProfile ? "Edit Tax Profile" : "Create Tax Profile"}
              onPress={() => router.push("/tax-profile")}
              style={styles.taxProfileBtn}
              active
            />
          )}

          <ThemedText
            type="subtitle"
            style={{
              marginBottom: globalStyles.margin.xs,
            }}
          >
            Account Settings
          </ThemedText>
          {settings.map((item: any, index: number) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.btnWrapper,
                pressed && {
                  opacity: 0.7,
                },
              ]}
              onPress={() => handlePress(item.label, item.screen)}
            >
              <View
                style={[
                  styles.iconWrapper,
                  {
                    backgroundColor: isDark ? colors.inputBox : "#f7fafa",
                  },
                ]}
              >
                <Image
                  source={item.icon}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  resizeMode="contain"
                />
              </View>
              <View
                style={{
                  flex: 1,
                }}
              >
                <ThemedText type="defaultSemiBold">{item.label}</ThemedText>
                <ThemedText
                  type="defaultSemiBold"
                  style={{
                    color: colors.body,
                  }}
                >
                  {item.caption}
                </ThemedText>
              </View>
              <Image
                source={require("../../assets/icons/chevron-right.png")}
                style={{
                  width: 16,
                  height: 16,
                }}
                resizeMode="contain"
                tintColor={isDark ? colors.white : "#000"}
              />
            </Pressable>
          ))}
          <ThemedText
            type="subtitle"
            style={{
              marginTop: globalStyles.margin.sm,
            }}
          >
            Support
          </ThemedText>
          <Pressable
            style={({ pressed }) => [
              styles.supportBtnWrapper,
              pressed && {
                opacity: 0.7,
              },
            ]}
          >
            <ThemedText>Help & FAQ</ThemedText>
          </Pressable>
          <Pressable
            onPress={() => router.push("/terms-of-use")}
            style={({ pressed }) => [
              styles.supportBtnWrapper,
              pressed && {
                opacity: 0.7,
              },
            ]}
          >
            <ThemedText>Terms and conditions</ThemedText>
          </Pressable>
          <Pressable
            onPress={() => router.push("/privacy-policy")}
            style={({ pressed }) => [
              styles.supportBtnWrapper,
              pressed && {
                opacity: 0.7,
              },
            ]}
          >
            <ThemedText>Privacy Policy</ThemedText>
          </Pressable>
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
    paddingBottom: globalStyles.margin.xl,
  },
  taxProfileWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    marginTop: globalStyles.margin.sm + 4,
  },
  taxProfileStyle: {
    width: "48%",
    padding: globalStyles.padding.xs,
    borderRadius: 10,
  },
  taxProfileBtn: {
    width: "70%",
    height: 40,
    alignSelf: "center",
    marginTop: globalStyles.margin.xl,
    marginBottom: globalStyles.margin.xl + 4,
  },
  btnWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: globalStyles.padding.sm,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginRight: globalStyles.margin.sm,
  },
  supportBtnWrapper: {
    marginTop: globalStyles.margin.xs,
  },
  skeletonWrapper: {
    height: 36,
    width: "70%",
    alignSelf: "center",
    marginBottom: globalStyles.margin.xl + 4,
    marginTop: globalStyles.margin.xl,
  },
});
