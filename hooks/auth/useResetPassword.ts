import { post } from "@/services";
import { ResetPasswordPayload } from "@/types";
import { useMutation } from "@tanstack/react-query";

type MutationProp = {
  payload: ResetPasswordPayload;
};

export const useResetPassword = (onSuccess?: (e: any) => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ payload }: MutationProp) => {
      return post("/auth/user/update-password-with-otp", payload);
    },
    onSuccess: async (response: any) => {
      onSuccess?.(response);
    },
  });

  return { mutate, isPending };
};
