import { useQuery } from "@tanstack/react-query";
import { getCategoryDistribution, getMonthlyOrdersGraph, getWeeklyOrdersGraph } from "@/lib/api";

export function useAnalytics() {
  const weekly = useQuery({ queryKey: ["admin", "weekly-orders"], queryFn: getWeeklyOrdersGraph });
  const monthly = useQuery({ queryKey: ["admin", "monthly-orders"], queryFn: getMonthlyOrdersGraph });
  const category = useQuery({ queryKey: ["admin", "category-distribution"], queryFn: getCategoryDistribution });

  return {
    weeklyOrders: weekly.data?.weeklyOrders ?? [],
    monthlyOrders: monthly.data?.monthlyOrders ?? [],
    categoryDistribution: category.data?.categories ?? [],
  };
}
