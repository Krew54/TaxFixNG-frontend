import moment from "moment";
import React from "react";
import { View } from "react-native";
import Markdown from "react-native-markdown-display";
import { ThemedText } from "./themed-text";

type ArticleCardProps = {
  title: string;
  content: string;
  date?: string;
};

export const ArticleCard = ({ title, content, date }: ArticleCardProps) => {
  return (
    <View>
      <ThemedText type="defaultSemiBold">{title}</ThemedText>
      <Markdown>{content}</Markdown>
      {date && <ThemedText>{moment(date).format("MMMM Do YYYY")}</ThemedText>}
    </View>
  );
};
