import { Delete } from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useDeleteAccount = (onSuccess?: (e: any) => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return Delete("/auth/user/delete-account");
    },

    onSuccess: async (response: any) => {
      onSuccess?.(response);
    },
  });

  return { mutate, isPending };
};
