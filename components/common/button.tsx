import { useTheme } from "@/hooks/use-theme-color";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { globalStyles } from "../../utils";
import { ThemedText } from "../themed-text";

type ScreenProps = {
  bgColor?: string;
  textColor?: string;
  label: string;
  onPress: () => void;
  active?: boolean;
  icon?: any;
  hideIcon?: boolean;
  loading?: boolean;
  hover?: string;
  vibrate?: boolean;
  style?: ViewStyle;
};

export function Button({
  active,
  onPress,
  textColor,
  bgColor,
  label,
  icon,
  hideIcon,
  loading,
  hover,
  vibrate,
  style,
}: ScreenProps) {
  const { colors } = useTheme();

  return (
    <>
      {/* if button is active */}
      {active ? (
        <Pressable
          style={({ pressed }) => [
            styles.activeButton,
            {
              backgroundColor: colors.primary,
            },
            {
              backgroundColor: loading
                ? colors.inactive
                : bgColor
                ? bgColor
                : colors.primary,
              opacity: pressed ? 0.9 : 1,
            },
            style,
          ]}
          onPress={
            !loading
              ? () => {
                  onPress();
                }
              : null
          }
        >
          <>
            <ThemedText
              style={{
                color: loading ? "#635d5dff" : "#fff",
              }}
            >
              {loading ? "Loading" : label}
            </ThemedText>

            {loading ? (
              <ActivityIndicator
                color={colors.body}
                size={"small"}
                style={{
                  marginLeft: globalStyles.margin.xs,
                }}
              />
            ) : (
              !hideIcon && (
                <>
                  {/* <Image
                  source={
                    icon ? icon : require("../../assets/icons/arrow-right.png")
                  }
                  style={[
                    styles.arrowStyle,
                    {
                      tintColor: textColor ? textColor : colors.background,
                    },
                  ]}
                /> */}
                </>
              )
            )}
          </>
        </Pressable>
      ) : (
        // if button is inactive
        <View
          style={[
            styles.inactiveButton,
            {
              backgroundColor: colors.inactive,
            },
            style,
          ]}
        >
          <ThemedText>{label}</ThemedText>

          {!hideIcon && (
            <>
              {/* <Image
              source={
                icon ? icon : require("../../assets/icons/arrow-right.png")
              }
              style={[styles.arrowStyle, { tintColor: colors.body }]}
            /> */}
            </>
          )}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  activeButton: {
    alignItems: "center",
    height: 56,
    justifyContent: "center",
    borderRadius: globalStyles.radius.xs - 4,
    flexDirection: "row",
  },

  inactiveButton: {
    alignItems: "center",
    height: 56,
    justifyContent: "center",
    borderRadius: globalStyles.radius.xs - 4,
    flexDirection: "row",
  },

  arrowStyle: {
    width: 16,
    height: 16,
    marginLeft: globalStyles.margin.xs + 2,
  },
});
