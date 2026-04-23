import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { ArticleCard } from "@/components/article-card";
import { ScreenHeader, ScreenWrapper } from "@/components/common";
import { useGetWeeklyPost } from "@/hooks/blog";
import { useTheme } from "@/hooks/use-theme-color";
import { globalStyles } from "@/utils";

export default function Blog() {
  const { colors, isDark } = useTheme();

  const { data, isSuccess, isLoading, isFetching, refetch } =
    useGetWeeklyPost();

  return (
    <ScreenWrapper>
      <ScreenHeader title="Learn" hideBackBtn />
      <View style={styles.mainWrapper}>
        {/* <ThemedText
          type="defaultSemiBold"
          style={{
            color: isDark ? colors.text : colors.primary,
          }}
        >
          Stay informed and take care of your tax journey.
        </ThemedText> */}

        {/* <Categories /> */}
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={refetch} />
          }
          contentContainerStyle={{ paddingVertical: 20 }}
        >
          {isLoading && (
            <ActivityIndicator size={"large"} color={colors.body} />
          )}

          {isSuccess && data && (
            <ArticleCard
              title={data.topic}
              content={data.content}
              date={data.generated_at}
            />
          )}
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    paddingHorizontal: globalStyles.wrapper,
    flex: 1,
  },
});
