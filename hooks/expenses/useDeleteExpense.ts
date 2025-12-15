import { Delete } from "@/services";
import { useMutation } from "@tanstack/react-query";

type MutationProp = {
  doc_id: string;
};

export const useDeleteExpense = (onSuccess?: (e: any) => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ doc_id }: MutationProp) => {
      return Delete(`/documents/${doc_id}`);
    },

    onSuccess: async (response: any) => {
      onSuccess?.(response);
    },
  });

  return { mutate, isPending };
};
