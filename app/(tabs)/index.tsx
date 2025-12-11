import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";

import { Button, ScreenHeader, ScreenWrapper } from "@/components/common";
import { HelloWave } from "@/components/hello-wave";
import { ThemedText } from "@/components/themed-text";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProfile } from "@/hooks/profile";
import { useTheme } from "@/hooks/use-theme-color";
import { checkAuth, globalStyles } from "@/utils";
import { router } from "expo-router";
import { useEffect, useState } from "react";

const QUICK_ACTION = [
  {
    label: "Forecast",
    icon: require("../../assets/icons/symbol.png"),
    screen: "/forecast",
  },
  {
    label: "Log Expenses",
    icon: require("../../assets/icons/document.png"),
    screen: "",
  },
  {
    label: "Learn Tax",
    icon: require("../../assets/icons/knowledge.png"),
    screen: "",
  },
];
const NEXT_STEPS = [
  {
    label: "Complete Your Tax Profile",
    screen: "",
  },
  {
    label: "Check Your Tax Forecast",
    screen: "/forecast",
  },
  {
    label: "Add Your First Tax Expenses",
    screen: "",
  },
  {
    label: "Read how Nigerian taxes work",
    screen: "",
  },
];
export default function HomeScreen() {
  const [profile, setProfile] = useState(null);
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

  const { colors, isDark } = useTheme();

  const handleForecastPress = async () => {
    const isLoggedIn = await checkAuth();
    if (!isLoggedIn) return;
    router.push("/forecast");
  };

  const handleNavigation = async (screen: any) => {
    if (screen === "/forecast") {
      const isLoggedIn = await checkAuth();
      if (!isLoggedIn) return;
      router.push(screen);
    } else {
      router.push(screen);
    }
  };

  return (
    <ScreenWrapper>
      <ScreenHeader title="Home" hideBackBtn />
      <ScrollView>
        <View style={styles.mainWrapper}>
          <ThemedText type="defaultSemiBold">
            Hi Ade <HelloWave />
          </ThemedText>
          <ThemedText style={{ marginBottom: globalStyles.margin.md + 2 }}>
            Here is your tax overview.
          </ThemedText>

          <View
            style={[
              styles.sectionWrapper,
              {
                backgroundColor: colors.inputBox,
              },
            ]}
          >
            <View style={styles.flexRow}>
              <Image
                source={require("../../assets/icons/symbol.png")}
                style={styles.iconStyle}
                resizeMode="contain"
              />
              <View style={{ flex: 1 }}>
                <ThemedText
                  style={{
                    fontSize: 14,
                  }}
                >
                  Estimated Tax
                </ThemedText>
                {isLoading ? (
                  <Skeleton
                    style={{
                      marginTop: 10,
                    }}
                  />
                ) : (
                  <ThemedText
                    style={{ marginTop: 4, color: colors.primary }}
                    type="subtitle"
                  >
                    ₦0
                  </ThemedText>
                )}
              </View>
            </View>
            {isLoading ? (
              <Skeleton
                style={{
                  marginTop: globalStyles.margin.md,
                  height: 40,
                  width: "60%",
                }}
              />
            ) : (
              <Button
                label={isProfile ? "VIEW FORECAST" : "CREATE FORECAST"}
                active
                onPress={handleForecastPress}
                style={styles.buttonStyle}
              />
            )}
          </View>
          <View style={styles.actionWrapper}>
            {QUICK_ACTION.map((item: any, index) => (
              <Pressable
                key={index}
                style={({ pressed }) => [
                  styles.actionButton,
                  {
                    backgroundColor: isDark ? colors.inputBox : "#f7fafa",
                  },
                  pressed && {
                    opacity: 0.7,
                  },
                ]}
                onPress={() => handleNavigation(item.screen)}
              >
                <Image
                  source={item.icon}
                  style={{
                    width: 32,
                    height: 32,
                  }}
                  resizeMode="contain"
                />
                <ThemedText
                  type="defaultSemiBold"
                  style={{
                    textAlign: "center",
                    marginTop: globalStyles.margin.xs,
                    fontSize: 12,
                  }}
                >
                  {item.label}
                </ThemedText>
              </Pressable>
            ))}
          </View>

          <View>
            <ThemedText type="defaultSemiBold">Your Next Steps</ThemedText>
            <View
              style={[
                styles.stepsWrapper,
                {
                  backgroundColor: colors.background,
                },
              ]}
            >
              {NEXT_STEPS.map((item: any, index) => (
                <Pressable
                  style={({ pressed }) => [
                    styles.btnWrapper,
                    pressed && {
                      opacity: 0.7,
                    },
                  ]}
                  key={index}
                  onPress={() => handleNavigation(item.screen)}
                >
                  <ThemedText style={{ flex: 1 }}>{item.label}</ThemedText>
                  <Image
                    source={require("../../assets/icons/chevron-right.png")}
                    style={{
                      width: 12,
                      height: 12,
                    }}
                    resizeMode="contain"
                    tintColor={isDark ? colors.white : "#000"}
                  />
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    paddingHorizontal: globalStyles.wrapper,
    flex: 1,
    paddingTop: globalStyles.padding.sm + 4,
    paddingBottom: globalStyles.margin.xl,
  },
  sectionWrapper: {
    marginBottom: globalStyles.margin.lg + 5,
    padding: globalStyles.padding.md,
    borderRadius: 12,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconStyle: {
    width: 40,
    height: 40,
  },
  buttonStyle: {
    width: "60%",
    height: 40,
    borderRadius: 12,
    marginTop: globalStyles.margin.md,
  },
  actionWrapper: {
    flexDirection: "row",
    gap: 20,
    marginBottom: globalStyles.margin.xl + 9,
  },
  actionButton: {
    height: 100,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  stepsWrapper: {
    padding: globalStyles.padding.md,
    borderRadius: 16,
    marginTop: globalStyles.margin.xs + 3,

    // --- Shadow (iOS) ---
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    // --- Shadow (Android) ---
    elevation: 4,
  },
  btnWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: globalStyles.padding.xs,
  },
});
