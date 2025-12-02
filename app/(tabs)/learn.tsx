import { ScrollView, StyleSheet, View } from "react-native";

import { ArticleCard } from "@/components/article-card";
import { Categories } from "@/components/categories";
import { Input, ScreenHeader, ScreenWrapper } from "@/components/common";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme-color";
import { globalStyles } from "@/utils";
import { useForm } from "react-hook-form";

export default function Blog() {
  const { colors, isDark } = useTheme();
  const { control } = useForm();
  return (
    <ScreenWrapper>
      <ScreenHeader title="Learn" hideBackBtn />
      <View style={styles.mainWrapper}>
        <ThemedText
          type="defaultSemiBold"
          style={{
            color: isDark ? colors.text : colors.primary,
          }}
        >
          Stay informed and take care of your tax journey.
        </ThemedText>
        <Input
          inputName="search"
          control={control}
          placeholder="Search..."
          leftIcon={require("../../assets/icons/search.png")}
        />
        <Categories />
        <ScrollView>
          <ThemedText
            type="defaultSemiBold"
            style={{
              marginVertical: globalStyles.margin.md,
            }}
          >
            Featured Articles
          </ThemedText>
          <ArticleCard />
          <ThemedText
            type="defaultSemiBold"
            style={{
              marginVertical: globalStyles.margin.sm,
            }}
          >
            Latest Articles
          </ThemedText>
          <ArticleCard />
          <ArticleCard />
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    paddingHorizontal: globalStyles.wrapper,
    flex: 1,
    paddingTop: globalStyles.padding.md,
  },
});
