import { ScreenHeader, ScreenWrapper } from "@/components/common";
import { Tab1 } from "@/components/tabs/tab1";
import { Tab2 } from "@/components/tabs/tab2";
import { Tab3 } from "@/components/tabs/tab3";
import { Tab4 } from "@/components/tabs/tab4";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useGetProfile } from "@/hooks/profile";
import { useTheme } from "@/hooks/use-theme-color";
import { globalStyles } from "@/utils";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

const TABS = [
  {
    name: "Income",
    value: "income",
    component: Tab1,
  },
  {
    name: "Deductions",
    value: "deductions",
    component: Tab2,
  },
  {
    name: "Housing",
    value: "housing",
    component: Tab3,
  },
  {
    name: "Summary",
    value: "summary",
    component: Tab4,
  },
];
export default function Index() {
  const [activeTab, setActiveTab] = useState(0);
  const TabComponent = TABS[activeTab].component;

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

  const goToNext = (index?: number) => {
    if (typeof index === "number") {
      setActiveTab(Math.min(index, TABS.length - 1));
    } else {
      setActiveTab((prev) => Math.min(prev + 1, TABS.length - 1));
    }
  };

  const goToPrev = (index?: number) => {
    if (typeof index === "number") {
      setActiveTab(Math.max(index, 0));
    } else {
      setActiveTab((prev) => Math.max(prev - 1, 0));
    }
  };
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
            {isProfile ? `₦${data?.data?.estimated_tax_due}` : "₦0"}
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
              const isSelected = index === activeTab;
              const isLastTab = index === TABS.length - 1;

              return (
                <Pressable
                  key={index}
                  disabled={isLastTab}
                  onPress={() => {
                    if (!isLastTab) {
                      setActiveTab(index);
                    }
                  }}
                  style={[
                    styles.tabButton,
                    {
                      borderBottomWidth: isSelected ? 2 : 0,
                      borderBottomColor: isSelected
                        ? colors.primary
                        : "transparent",
                    },
                  ]}
                >
                  <ThemedText
                    style={{
                      color: isSelected ? colors.primary : colors.body,
                      fontFamily: isSelected ? "Inter-Bold" : "Inter-Medium",
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
          <TabComponent goToNext={goToNext} goToPrev={goToPrev} />
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
