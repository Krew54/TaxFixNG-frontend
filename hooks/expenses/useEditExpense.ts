import { put } from "@/services";
import { ExpensesPayload } from "@/types";
import { useMutation } from "@tanstack/react-query";

type MutationProp = {
  payload: ExpensesPayload;
  doc_id: string;
};

export const useEditExpense = (onSuccess?: (e: any) => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ payload, doc_id }: MutationProp) => {
      return put(`/documents/${doc_id}`, payload);
    },

    onSuccess: async (response: any) => {
      onSuccess?.(response);
    },
  });

  return { mutate, isPending };
};
