import { get } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetWeeklyPost = () => {
  const { data, isSuccess, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["getWeeklyPost"],
    queryFn: () => {
      return get("/tax/weekly-post");
    },
  });

  return { data, isSuccess, isLoading, isFetching, refetch };
};
