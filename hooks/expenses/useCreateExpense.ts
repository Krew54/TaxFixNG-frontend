import { post } from "@/services";
import { ExpensesPayload } from "@/types";
import { useMutation } from "@tanstack/react-query";

type MutationProp = {
  payload: ExpensesPayload;
};

export const useCreateExpense = (onSuccess?: (e: any) => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ payload }: MutationProp) => {
      return post("/documents/upload", payload);
    },

    onSuccess: async (response: any) => {
      onSuccess?.(response);
    },
  });

  return { mutate, isPending };
};
