import { Image, ScrollView, StyleSheet, View } from "react-native";

import { Button, ScreenHeader, ScreenWrapper } from "@/components/common";
import { HelloWave } from "@/components/hello-wave";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme-color";
import { checkAuth, globalStyles } from "@/utils";
import { router } from "expo-router";

export default function TexCenter() {
  const { colors } = useTheme();

  const handlePlanNow = async () => {
    const isLoggedIn = await checkAuth();
    if (!isLoggedIn) return;

    router.push("/forecast");
  };

  return (
    <ScreenWrapper>
      <ScreenHeader title="Tax Center" hideBackBtn />
      <ScrollView>
        <View style={styles.mainWrapper}>
          <ThemedText style={{ marginBottom: globalStyles.margin.md + 2 }}>
            <ThemedText type="defaultSemiBold">Hi Ade</ThemedText> <HelloWave />{" "}
            welcome to your Tax Centre.
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
                <ThemedText type="defaultSemiBold">
                  Planning your 2026 tax?
                </ThemedText>
                <ThemedText style={{ marginTop: 4 }}>
                  Estimate your tax in just 2 mins
                </ThemedText>
              </View>
            </View>
            <Button
              label="PLAN NOW"
              active
              onPress={handlePlanNow}
              style={styles.buttonStyle}
            />
          </View>

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
                source={require("../../assets/icons/document.png")}
                style={styles.iconStyle}
                resizeMode="contain"
              />
              <View style={{ flex: 1 }}>
                <ThemedText type="defaultSemiBold">
                  Have an expenses to save?
                </ThemedText>
                <ThemedText style={{ marginTop: 4 }}>
                  Save rent, capital loss or other tax reducing expenses
                </ThemedText>
              </View>
            </View>
            <Button
              label="ADD NOW"
              active
              onPress={() => {}}
              style={styles.buttonStyle}
            />
          </View>

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
                source={require("../../assets/icons/knowledge.png")}
                style={styles.iconStyle}
                resizeMode="contain"
              />
              <View style={{ flex: 1 }}>
                <ThemedText type="defaultSemiBold">
                  Want to understand how Naija Tax?
                </ThemedText>
                <ThemedText style={{ marginTop: 4 }}>
                  Read short articles that explains it.
                </ThemedText>
              </View>
            </View>
            <Button
              label="READ NOW"
              active
              onPress={() => {}}
              style={styles.buttonStyle}
            />
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    paddingHorizontal: globalStyles.wrapper,
    marginTop: globalStyles.margin.md,
  },
  iconStyle: {
    width: 40,
    height: 40,
  },
  sectionWrapper: {
    marginBottom: globalStyles.margin.sm,
    padding: globalStyles.padding.md,
    borderRadius: 12,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  buttonStyle: {
    width: 120,
    height: 40,
    borderRadius: 12,
    marginTop: globalStyles.margin.xs + 4,
  },
});
