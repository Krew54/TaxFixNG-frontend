import { ScreenHeader, ScreenWrapper } from "@/components/common";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { globalStyles } from "@/utils";
import { Image, Pressable, StyleSheet, View } from "react-native";

export default function Index() {
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

        <Pressable style={styles.btnWrapper}>
          <View>
            <ThemedText>Estimate Tax Due</ThemedText>
            <ThemedText>N240,000</ThemedText>
            <ThemedText>Saved on: 12th Aug, 2024</ThemedText>
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
});
