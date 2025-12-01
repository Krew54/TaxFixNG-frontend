import { post } from "@/services";
import { SignupPayload } from "@/types";
import { useMutation } from "@tanstack/react-query";

type MutationProp = {
  payload: SignupPayload;
};

export const useSignup = (onSuccess?: (e: any) => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ payload }: MutationProp) => {
      return post("/auth/user/signup", payload);
    },

    onSuccess: async (response: any) => {
      onSuccess?.(response);
    },
  });

  return { mutate, isPending };
};
