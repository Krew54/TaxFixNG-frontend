import { post } from "@/services";
import { EmailVerificationPayload } from "@/types";
import { useMutation } from "@tanstack/react-query";

type MutationProp = {
  payload: EmailVerificationPayload;
};

export const useVerifyEmail = (onSuccess?: (e: any) => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ payload }: MutationProp) => {
      return post("/auth/user/email-verification", payload);
    },
    onSuccess: async (response: any) => {
      onSuccess?.(response);
    },
  });

  return { mutate, isPending };
};
