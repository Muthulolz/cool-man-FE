import { useQuery } from "@tanstack/react-query";
import { getAllProductsFull } from "@/lib/api";
import { mapApiProduct } from "@/lib/mapProduct";

export function useProducts() {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: getAllProductsFull,
    select: (apiProducts) => apiProducts.filter((p) => p.isActive).map(mapApiProduct),
  });

  return {
    products: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
