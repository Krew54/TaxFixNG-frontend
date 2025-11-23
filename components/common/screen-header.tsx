import { BackHandler, Image, Pressable, StyleSheet, View } from "react-native";

import { useTheme } from "@/hooks/use-theme-color";
import { globalStyles } from "@/utils";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "../themed-text";

type ScreenProps = {
  title?: string;
  children?: any;
  loading?: boolean;
  color?: string;
  hide?: boolean;
  prevScreen?: any;
  dontCentralizeTitle?: boolean;
  webViewRef?: any;
  hideBackBtn?: boolean;
};

export const ScreenHeader = ({
  title,
  children,
  loading,
  hide,
  prevScreen,
  dontCentralizeTitle,
  hideBackBtn,
}: ScreenProps) => {
  const { colors } = useTheme();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        return loading && true;
      }
    );
    return () => backHandler.remove();
  }, [loading]);

  const BackBtn = () => {
    if (prevScreen) {
      router.push(prevScreen);
    } else {
      router.back();
    }
  };

  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.headerWrapper,
        {
          borderBottomWidth: !hide ? 0.8 : 0,
          borderBottomColor: colors.border,
          paddingTop: insets.top + 6,
        },
      ]}
    >
      {!hide && (
        <View style={styles.wrapper}>
          <View style={[styles.sideContainer, { marginLeft: -5 }]}>
            {!hideBackBtn && (
              <Pressable
                style={({ pressed }) => [
                  styles.backBtnStyle,
                  pressed && {
                    opacity: 0.9,
                  },
                ]}
                onPress={BackBtn}
              >
                <Image
                  source={require("../../assets/icons/back.png")}
                  style={styles.backImgStyle}
                  tintColor={colors.text}
                />
              </Pressable>
            )}
          </View>
          <View
            style={[
              styles.titleWrapper,
              { alignItems: dontCentralizeTitle ? "flex-start" : "center" },
            ]}
          >
            <ThemedText type="defaultSemiBold">{title}</ThemedText>
          </View>
          <View style={styles.sideContainer}>{children}</View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    paddingVertical: globalStyles.padding.xs + 2,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    paddingHorizontal: globalStyles.padding.md - 8,
    justifyContent: "space-between",
  },
  sideContainer: {
    minWidth: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  titleWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  backBtnStyle: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  backImgStyle: {
    width: 20,
    height: 20,
  },
});
