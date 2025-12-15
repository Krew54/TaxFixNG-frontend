import { ScreenHeader, ScreenWrapper } from "@/components/common";
import { ThemedText } from "@/components/themed-text";
import { useGetExpensess } from "@/hooks/expenses";
import { useTheme } from "@/hooks/use-theme-color";
import { globalStyles } from "@/utils";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

type ListType = {
  amount: string;
  category: string;
  created_at: string;
  document_name: string;
  file_url: string;
  id: string;
  relevant_tax_year: string;
  updated_at: string;
  user_email: string;
};
export default function Index() {
  const { colors } = useTheme();
  const [expenses, setExpenses] = useState<ListType[]>([]);
  const { data, isLoading } = useGetExpensess();

  useEffect(() => {
    if (!data) return;
    setExpenses(data);
  }, [data]);

  return (
    <ScreenWrapper>
      <ScreenHeader title="Saved Expenses" />
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <ActivityIndicator color={colors.body} size={"large"} />
          <ThemedText
            style={{
              textAlign: "center",
            }}
          >
            One moment...
          </ThemedText>
        </View>
      ) : (
        <FlatList
          data={expenses}
          renderItem={({ index, item }) => (
            <Pressable key={index}>
              <ThemedText>{item.document_name}</ThemedText>
            </Pressable>
          )}
        />
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    paddingTop: globalStyles.margin.lg,
    paddingHorizontal: globalStyles.wrapper,
  },
  btnStyle: {
    marginTop: globalStyles.margin.xl,
  },
  uploadDocumentBtn: {
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: globalStyles.margin.md + 2,
    padding: globalStyles.padding.sm,
    borderRadius: 8,
  },
  plusIcon: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#D9D9D9",
    marginRight: globalStyles.margin.xs + 4,
  },
  documentInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: globalStyles.margin.sm,
    paddingHorizontal: globalStyles.padding.sm,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
    padding: globalStyles.padding.md,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalOption: {
    paddingVertical: globalStyles.padding.sm,
  },
});
