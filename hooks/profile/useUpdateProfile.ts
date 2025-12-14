import { patch } from "@/services";
import { EstimateTaxPayload } from "@/types";
import { useMutation } from "@tanstack/react-query";

type MutationProp = {
  payload: EstimateTaxPayload;
};

export const useUpdateProfile = (onSuccess?: (e: any) => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ payload }: MutationProp) => {
      return patch("/auth/profile", payload);
    },

    onSuccess: async (response: any) => {
      onSuccess?.(response);
    },
  });

  return { mutate, isPending };
};
