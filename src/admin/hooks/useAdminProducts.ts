import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  getAllProductsFull,
  softDeleteProduct,
  updateProductStatus,
  type CreateProductInput,
} from "@/lib/api";
import { placeholderFor } from "@/lib/mapProduct";

export function useAdminProducts() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["admin", "products"],
    queryFn: getAllProductsFull,
    select: (apiProducts) =>
      apiProducts.map((p) => ({
        id: p._id,
        name: p.name,
        category: p.category,
        price: p.price,
        discountPrice: p.discountPrice,
        stock: p.stock,
        active: p.isActive,
        image: placeholderFor(p._id),
      })),
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin", "products"] });

  const createMutation = useMutation({
    mutationFn: (input: CreateProductInput) => createProduct(input),
    onSuccess: invalidate,
  });

  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      updateProductStatus(id, isActive),
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => softDeleteProduct(id),
    onSuccess: invalidate,
  });

  return {
    products: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    createProduct: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    toggleStatus: toggleStatusMutation.mutate,
    deleteProduct: deleteMutation.mutate,
  };
}
