import { get } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetExpensess = () => {
  const { data, isSuccess, isLoading, isFetching } = useQuery({
    queryKey: ["getExpenses"],
    queryFn: () => {
      return get("/documents");
    },
  });

  return { data, isSuccess, isLoading, isFetching };
};
