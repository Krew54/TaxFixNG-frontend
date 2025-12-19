import { Button, ScreenHeader, ScreenWrapper } from "@/components/common";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useGetProfile } from "@/hooks/profile";
import { useTheme } from "@/hooks/use-theme-color";
import { formatWithCommas, globalStyles } from "@/utils";
import { router } from "expo-router";
import moment from "moment";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

export default function Index() {
  const { colors } = useTheme();
  const [profile, setProfile] = useState<any>({});
  const [isProfile, setIsProfile] = useState(false);
  const { data, isLoading } = useGetProfile();

  useEffect(() => {
    if (!data) return;
    if (data.status >= 400) {
      setIsProfile(false);
    } else {
      setIsProfile(data);
      setProfile(data);
      setIsProfile(true);
    }
  }, [data]);

  return (
    <ScreenWrapper>
      <ScreenHeader title="Saved Forecasts" />
      <ThemedView style={styles.mainWrapper}>
        <ThemedText
          style={{
            marginBottom: globalStyles.margin.lg,
          }}
        >
          Review and compare your past tax estimates.
        </ThemedText>

        {isProfile ? (
          <>
            <Pressable
              style={styles.btnWrapper}
              onPress={() =>
                router.push({
                  pathname: "/forecast-summary",
                  params: {
                    profile: encodeURIComponent(JSON.stringify(profile)),
                  },
                })
              }
            >
              <View>
                <ThemedText
                  style={{
                    color: colors.body,
                  }}
                >
                  Estimate Tax Due
                </ThemedText>
                <ThemedText
                  type="title"
                  style={{
                    color: colors.primary,
                    marginBottom: globalStyles.margin.sm,
                    marginTop: globalStyles.margin.xs - 4,
                  }}
                >
                  ₦{formatWithCommas(profile?.estimated_tax)}
                </ThemedText>
                <ThemedText style={{ color: colors.body }}>
                  {moment(profile.date_modified || profile.date_created).format(
                    "MMMM D, YYYY"
                  )}
                </ThemedText>
              </View>
              <Image
                source={require("../../assets/icons/chevron-right.png")}
                style={{
                  width: 16,
                  height: 16,
                }}
                resizeMode="contain"
              />
            </Pressable>
            <Button
              label="Create New"
              onPress={() => router.push("/forecast")}
              active
            />
          </>
        ) : (
          <View style={styles.emptyStateWrapper}>
            <ThemedText
              type="subtitle"
              style={{
                textAlign: "center",
              }}
            >
              You haven't saved any forecasts
            </ThemedText>
            <ThemedText
              style={{
                color: colors.body,
                textAlign: "center",
                marginBottom: globalStyles.margin.sm + 3,
              }}
            >
              Run a tax estimate and save it to track changes over time.{" "}
            </ThemedText>
            <Button
              label="Create Your First Forecast"
              onPress={() => router.push("/forecast")}
              active
            />
          </View>
        )}
      </ThemedView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    paddingTop: globalStyles.margin.lg,
    paddingHorizontal: globalStyles.wrapper,
  },
  btnWrapper: {
    backgroundColor: "#F4F6F7",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: globalStyles.padding.sm,
    borderRadius: 10,
    // --- Shadow (iOS) ---
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,

    // --- Shadow (Android) ---
    elevation: 4,
    marginBottom: globalStyles.margin.lg + 2,
  },
  emptyStateWrapper: {
    backgroundColor: "#F4F6F7",

    padding: globalStyles.padding.md,
    borderRadius: 10,
    // --- Shadow (iOS) ---
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,

    // --- Shadow (Android) ---
    elevation: 4,
  },
});
