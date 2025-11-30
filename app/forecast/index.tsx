import { ScreenHeader, ScreenWrapper } from "@/components/common";
import { Tab1 } from "@/components/tabs/tab1";
import { Tab2 } from "@/components/tabs/tab2";
import { Tab3 } from "@/components/tabs/tab3";
import { Tab4 } from "@/components/tabs/tab4";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme-color";
import { globalStyles } from "@/utils";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

const TABS = [
  {
    name: "Income",
    value: "income",
    component: <Tab1 />,
  },
  {
    name: "Deductions",
    value: "deductions",
    component: <Tab2 />,
  },
  {
    name: "Housing",
    value: "housing",
    component: <Tab3 />,
  },
  {
    name: "Summary",
    value: "summary",
    component: <Tab4 />,
  },
];
export default function Index() {
  const [selectedTab, setSelectedTab] = useState({
    name: "income",
    component: <Tab1 />,
  });
  const { colors, isDark } = useTheme();

  return (
    <ScreenWrapper>
      <ScreenHeader title="Forecast" />
      <View
        style={[
          styles.headerWrapper,
          {
            backgroundColor: isDark ? colors.inputBox : "#f0f7f4",
          },
        ]}
      >
        <View
          style={[
            styles.amountWrapper,
            {
              backgroundColor: colors.primary,
            },
          ]}
        >
          <ThemedText
            type="title"
            style={{
              color: colors.white,
            }}
          >
            N240,000
          </ThemedText>
          <ThemedText
            style={{
              color: colors.white,
              marginTop: 2,
            }}
          >
            Your Estimated Tax Due
          </ThemedText>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tabsWrapper}>
            {TABS.map((item, index) => {
              const isSelected = item.value === selectedTab.name;
              return (
                <Pressable
                  key={index}
                  style={[
                    styles.tabButton,
                    {
                      borderBottomWidth: isSelected ? 2 : 0,
                      borderBottomColor: colors.primary,
                    },
                  ]}
                  onPress={() =>
                    setSelectedTab({
                      component: item.component,
                      name: item.value,
                    })
                  }
                >
                  <ThemedText
                    style={{
                      fontFamily: isSelected ? "Inter-Bold" : "Inter-Medium",
                      color: isSelected ? colors.primary : colors.body,
                    }}
                  >
                    {item.name}
                  </ThemedText>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <ScrollView>
        <ThemedView style={styles.mainWrapper}>
          {selectedTab.component}
        </ThemedView>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    paddingHorizontal: globalStyles.wrapper,
    paddingTop: globalStyles.padding.xs + 4,
    paddingBottom: globalStyles.padding.xxl,
  },
  headerWrapper: {
    paddingHorizontal: globalStyles.wrapper,
    paddingBottom: globalStyles.padding.sm,
  },
  amountWrapper: {
    paddingVertical: globalStyles.padding.sm,
    alignItems: "center",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    // --- Shadow (iOS) ---
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    // --- Shadow (Android) ---
    elevation: 4,
  },
  tabsWrapper: {
    flexDirection: "row",
    gap: 12,
    marginTop: globalStyles.margin.sm,
  },
  tabButton: {
    paddingVertical: globalStyles.padding.xs,
  },
});
