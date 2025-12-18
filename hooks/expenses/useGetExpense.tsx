import { get } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetExpense = ({ category }: { category: String }) => {
  const { data, isSuccess, isLoading, isFetching } = useQuery({
    queryKey: ["getExpense"],
    queryFn: () => {
      return get(`/documents/${category}`);
    },
  });

  return { data, isSuccess, isLoading, isFetching };
};
