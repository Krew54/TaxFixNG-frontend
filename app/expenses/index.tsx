import { Button, ScreenHeader, ScreenWrapper } from "@/components/common";
import { ThemedText } from "@/components/themed-text";
import { useDeleteExpense, useGetExpenses } from "@/hooks/expenses";
import { useTheme } from "@/hooks/use-theme-color";
import { formatWithCommas, globalStyles } from "@/utils";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { queryClient } from "../_layout";

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

const ExpenseCard = ({ item }: { item: ListType }) => {
  const { colors } = useTheme();

  const { mutate: deleteExpense, isPending: isDeleting } = useDeleteExpense(
    (response) => {
      if (response.status >= 400) {
        console.log(response.data);
      } else {
        queryClient.invalidateQueries({
          queryKey: ["getExpenses"],
        });
      }
    }
  );

  const handleDeleteExpense = (doc_id: string) => {
    Alert.alert(
      "Delete Expense",
      "Are you sure you want to delete this expense? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteExpense({ doc_id });
          },
        },
      ]
    );
  };
  return (
    <View style={styles.expenseCard}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ThemedText
          type="defaultSemiBold"
          style={{ textTransform: "capitalize" }}
        >
          {item.category?.replaceAll("_", " ")}
        </ThemedText>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/edit-expense",
                params: {
                  item: JSON.stringify(item),
                },
              })
            }
          >
            <FontAwesome5 name="edit" size={20} color={colors.primary} />
          </Pressable>
          {isDeleting ? (
            <ActivityIndicator color={colors.body} size={"small"} />
          ) : (
            <Pressable onPress={() => handleDeleteExpense(item.id)}>
              <Ionicons
                name="trash-outline"
                size={20}
                color={colors.secondary}
              />
            </Pressable>
          )}
        </View>
      </View>

      <ThemedText
        type="defaultSemiBold"
        style={{
          color: colors.primary,
          marginVertical: globalStyles.margin.xs - 4,
        }}
      >
        {item.document_name}(₦{formatWithCommas(item.amount)})
      </ThemedText>

      <ThemedText style={{ color: colors.body }}>
        Added on {moment(item.created_at).format("MMMM D, YYYY")}
      </ThemedText>
    </View>
  );
};

export default function Index() {
  const { colors } = useTheme();
  const [expenses, setExpenses] = useState<ListType[]>([]);
  const { data, isLoading } = useGetExpenses();

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
          renderItem={({ item }) => <ExpenseCard item={item} />}
          ListEmptyComponent={() => (
            <View style={styles.emptyRecordWrapper}>
              <ThemedText
                type="subtitle"
                style={{
                  textAlign: "center",
                  color: colors.primary,
                }}
              >
                No Expense Saved
              </ThemedText>
              <ThemedText
                style={{
                  color: colors.body,
                  textAlign: "center",
                  width: "90%",
                  alignSelf: "center",
                  marginTop: globalStyles.margin.sm + 4,
                  marginBottom: globalStyles.margin.md,
                }}
              >
                Start adding tax relevant expenses you want to keep track of for
                your tax forecast.
              </ThemedText>
              <Button
                label="Add First Expense"
                onPress={() => router.push("/add-expense")}
                active
              />
            </View>
          )}
          ItemSeparatorComponent={() => (
            <View style={{ marginTop: globalStyles.margin.sm }} />
          )}
          contentContainerStyle={{
            marginHorizontal: globalStyles.wrapper,
            paddingTop: globalStyles.padding.lg,
          }}
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
  emptyRecordWrapper: {
    paddingHorizontal: globalStyles.padding.sm,
    paddingVertical: globalStyles.margin.md + 2,
    borderRadius: 12,
    // --- Shadow (iOS) ---
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    // --- Shadow (Android) ---
    elevation: 4,
    backgroundColor: "#F4F6F7",
  },
  expenseCard: {
    borderRadius: 12,
    // --- Shadow (iOS) ---
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    // --- Shadow (Android) ---
    elevation: 4,
    backgroundColor: "#F4F6F7",
    paddingHorizontal: globalStyles.margin.md + 2,
    paddingVertical: globalStyles.padding.sm,
  },
});
