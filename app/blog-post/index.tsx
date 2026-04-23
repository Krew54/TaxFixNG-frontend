import { ScreenHeader, ScreenWrapper } from "@/components/common";
import { globalStyles } from "@/utils";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import Markdown from "react-native-markdown-display";

export default function Index() {
  const { content } = useLocalSearchParams<{ content: string }>();

  return (
    <ScreenWrapper>
      <ScreenHeader title="Learn" />
      <ScrollView>
        <View style={[styles.mainWrapper]}>
          <Markdown>{content}</Markdown>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    paddingHorizontal: globalStyles.wrapper,
  },
});
