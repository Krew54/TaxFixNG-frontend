import { useTheme } from "@/hooks/use-theme-color";
import { globalStyles } from "@/utils";
import { router } from "expo-router";
import moment from "moment";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";

type ArticleCardProps = {
  title: string;
  content: string;
  date?: string;
};

export const ArticleCard = ({ title, content, date }: ArticleCardProps) => {
  const { colors, isDark } = useTheme();
  return (
    <Pressable
      style={[
        styles.mainWrapper,
        {
          backgroundColor: isDark ? colors.inputBox : "#f8fafa",
        },
      ]}
      onPress={() =>
        router.push({
          pathname: "/blog-post",
          params: { content: content },
        })
      }
    >
      <View
        style={[
          styles.articleImage,
          {
            backgroundColor: isDark ? "#2b2b2b" : "#d9d9d9",
          },
        ]}
      ></View>
      <View
        style={{
          flex: 1,
        }}
      >
        <ThemedText
          type="defaultSemiBold"
          style={{
            marginBottom: 4,
            color: isDark ? colors.text : colors.primary,
          }}
        >
          {title}
        </ThemedText>
        <ThemedText
          style={{
            fontSize: 12,
            color: colors.body,
          }}
        >
          {moment(date).format("MMM D, YYYY")}
        </ThemedText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flexDirection: "row",
    gap: 12,
    padding: globalStyles.padding.xs + 6,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: globalStyles.margin.xs + 2,
  },
  articleImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
});
