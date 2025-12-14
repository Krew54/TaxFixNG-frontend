import { post } from "@/services";
import { EstimateTaxPayload } from "@/types";
import { useMutation } from "@tanstack/react-query";

type MutationProp = {
  payload: EstimateTaxPayload;
};

export const useEstimateTax = (onSuccess?: (e: any) => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ payload }: MutationProp) => {
      return post("/auth/profile/estimate_tax", payload);
    },

    onSuccess: async (response: any) => {
      onSuccess?.(response);
    },
  });

  return { mutate, isPending };
};
