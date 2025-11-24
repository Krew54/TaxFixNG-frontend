import { StyleSheet } from "react-native";

import { ScreenHeader, ScreenWrapper } from "@/components/common";

export default function Account() {
  return (
    <ScreenWrapper>
      <ScreenHeader title="Account" hideBackBtn />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
