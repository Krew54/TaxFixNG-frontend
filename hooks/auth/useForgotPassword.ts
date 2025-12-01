import { post } from "@/services";
import { ForgetPasswordPayload } from "@/types";
import { useMutation } from "@tanstack/react-query";

type MutationProp = {
  payload: ForgetPasswordPayload;
};

export const useForgotPassword = (onSuccess?: (e: any) => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ payload }: MutationProp) => {
      return post("/auth/user/forget-password", payload);
    },
    onSuccess: async (response) => {
      onSuccess?.(response);
    },
  });

  return { mutate, isPending };
};
