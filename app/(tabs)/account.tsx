import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";

import { Button, ScreenHeader, ScreenWrapper } from "@/components/common";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme-color";
import { globalStyles } from "@/utils";

const TAX_PROFILE = [
  {
    label: "State",
    value: "Lagos",
  },
  {
    label: "Income",
    value: "₦750,000/year",
  },
  {
    label: "Dependants",
    value: "Not set",
  },
  {
    label: "Rent",
    value: "₦350,000/year",
  },
];
const ACCOUNT_SETTINGS = [
  {
    label: "Saved Expenses",
    caption: "Manage the expenses saved",
    screen: "",
    icon: require("../../assets/icons/bag.png"),
  },
  {
    label: "Reset Password",
    caption: "Change your password",
    screen: "",
    icon: require("../../assets/icons/settings.png"),
  },
  {
    label: "Log out",
    caption: "Sign out of the App.",
    screen: "",
    icon: require("../../assets/icons/logout.png"),
  },
];
export default function Account() {
  const { colors, isDark } = useTheme();
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
                <ThemedText
                  type="defaultSemiBold"
                  style={{
                    color: colors.primary,
                  }}
                >
                  {item.value}
                </ThemedText>
              </View>
            ))}
          </View>
          <Button
            label="Edit Tax Profile"
            onPress={() => {}}
            style={styles.taxProfileBtn}
            active
          />

          <ThemedText
            type="subtitle"
            style={{
              marginBottom: globalStyles.margin.xs,
            }}
          >
            Account Settings
          </ThemedText>
          {ACCOUNT_SETTINGS.map((item, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.btnWrapper,
                pressed && {
                  opacity: 0.7,
                },
              ]}
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
});
