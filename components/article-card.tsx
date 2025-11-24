import { useTheme } from "@/hooks/use-theme-color";
import { globalStyles } from "@/utils";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";

export const ArticleCard = () => {
  const { colors, isDark } = useTheme();
  return (
    <Pressable
      style={[
        styles.mainWrapper,
        {
          backgroundColor: isDark ? colors.inputBox : "#f8fafa",
        },
      ]}
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
          Understanding income tax in Nigeria.
        </ThemedText>
        <ThemedText
          style={{
            fontSize: 12,
            color: colors.body,
          }}
        >
          5 mins read • Blog
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
