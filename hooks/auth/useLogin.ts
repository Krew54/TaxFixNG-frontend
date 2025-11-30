import { post } from "@/services";
import { LoginPayload } from "@/types";
import { useMutation } from "@tanstack/react-query";

type MutationProp = {
  payload: LoginPayload;
};

export const useLogin = (onSuccess?: (e: any) => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ payload }: MutationProp) => {
      return post("/auth/user/login", payload);
    },

    onSuccess: async (response: any) => {
      onSuccess?.(response?.data);
    },
  });

  return { mutate, isPending };
};
