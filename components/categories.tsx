import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme-color";
import { globalStyles } from "@/utils";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

const CATEGORIES = [
  {
    name: "Guides",
    value: "guides",
  },
  {
    name: "Blogs",
    value: "blogs",
  },
  {
    name: "News",
    value: "news",
  },
];
export const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("guides");
  const { colors, isDark } = useTheme();

  return (
    <View style={styles.mainWrapper}>
      {CATEGORIES.map((category, index) => {
        const isSelected = selectedCategory === category.value;
        return (
          <Pressable
            key={index}
            onPress={() => setSelectedCategory(category.value)}
            style={[
              styles.btnWrapper,
              {
                backgroundColor: isSelected
                  ? colors.primary
                  : isDark
                  ? colors.inputBox
                  : "#e5eaea",
              },
            ]}
          >
            <ThemedText
              key={category.value}
              style={{
                color: isSelected
                  ? colors.white
                  : isDark
                  ? colors.text
                  : colors.primary,
              }}
            >
              {category.name}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flexDirection: "row",
    gap: 14,
    marginVertical: globalStyles.margin.sm,
  },
  btnWrapper: {
    flex: 1,
    paddingVertical: globalStyles.padding.xs + 2,
    alignItems: "center",
    borderRadius: 100,
  },
});
