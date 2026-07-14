import { useQuery } from "@tanstack/react-query";
import { getDashboardStats, getWeeklyOrdersGraph } from "@/lib/api";

export function useDashboardStats() {
  const stats = useQuery({ queryKey: ["admin", "dashboard-stats"], queryFn: getDashboardStats });
  const weekly = useQuery({ queryKey: ["admin", "weekly-orders"], queryFn: getWeeklyOrdersGraph });

  return {
    totalRevenue: stats.data?.data.totalRevenue ?? 0,
    totalOrders: stats.data?.data.totalOrders ?? 0,
    totalUsers: stats.data?.data.totalUsers ?? 0,
    weeklyOrders: weekly.data?.weeklyOrders ?? [],
    isLoading: stats.isLoading || weekly.isLoading,
  };
}
