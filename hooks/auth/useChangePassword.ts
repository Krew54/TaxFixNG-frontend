import { post } from "@/services";
import { ChangePasswordPayload } from "@/types";
import { useMutation } from "@tanstack/react-query";

type MutationProp = {
  payload: ChangePasswordPayload;
};

export const useChangePassword = (onSuccess?: (e: any) => void) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ payload }: MutationProp) => {
      return post("/auth/user/change-password", payload);
    },
    onSuccess: async (response: any) => {
      onSuccess?.(response);
    },
  });

  return { mutate, isPending };
};
