import { get } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetProfile = () => {
  const { data, isSuccess, isLoading, isFetching } = useQuery({
    queryKey: ["getProfile"],
    queryFn: () => {
      return get("/auth/profile/my_profile");
    },
  });

  return { data, isSuccess, isLoading, isFetching };
};
