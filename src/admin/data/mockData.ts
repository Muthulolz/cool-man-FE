import { products } from "@/data/products";

export type Order = {
  id: string;
  customer: string;
  email: string;
  products: string[];
  amount: number;
  paymentStatus: "paid" | "pending" | "failed" | "refunded";
  orderStatus: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  date: string;
  trackingId?: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  status: "active" | "disabled";
  joinDate: string;
};

export type Coupon = {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  expiryDate: string;
  usageLimit: number;
  usedCount: number;
  active: boolean;
};

export type Transaction = {
  id: string;
  orderId: string;
  customer: string;
  amount: number;
  method: string;
  status: "completed" | "pending" | "failed" | "refunded";
  date: string;
};

export const mockOrders: Order[] = [
  { id: "CM-2026-001", customer: "Rahul Sharma", email: "rahul@email.com", products: ["Essential Black Tee", "Cloud White Hoodie"], amount: 2798, paymentStatus: "paid", orderStatus: "delivered", date: "2026-03-14", trackingId: "TRK001" },
  { id: "CM-2026-002", customer: "Priya Patel", email: "priya@email.com", products: ["Olive Jogger Pants"], amount: 1499, paymentStatus: "paid", orderStatus: "shipped", date: "2026-03-15", trackingId: "TRK002" },
  { id: "CM-2026-003", customer: "Amit Kumar", email: "amit@email.com", products: ["Pro Red Jersey Tee", "Athletic Grey Shorts"], amount: 2198, paymentStatus: "pending", orderStatus: "pending", date: "2026-03-16" },
  { id: "CM-2026-004", customer: "Sneha Reddy", email: "sneha@email.com", products: ["Street Art Custom Tee"], amount: 1599, paymentStatus: "paid", orderStatus: "confirmed", date: "2026-03-16" },
  { id: "CM-2026-005", customer: "Vikram Singh", email: "vikram@email.com", products: ["Midnight Black Hoodie", "Navy Full Sleeve Tee"], amount: 3198, paymentStatus: "failed", orderStatus: "cancelled", date: "2026-03-13" },
  { id: "CM-2026-006", customer: "Ananya Gupta", email: "ananya@email.com", products: ["Essential Black Tee"], amount: 799, paymentStatus: "paid", orderStatus: "shipped", date: "2026-03-15", trackingId: "TRK006" },
  { id: "CM-2026-007", customer: "Kiran Joshi", email: "kiran@email.com", products: ["Cloud White Hoodie", "Olive Jogger Pants"], amount: 3498, paymentStatus: "paid", orderStatus: "pending", date: "2026-03-16" },
  { id: "CM-2026-008", customer: "Deepa Nair", email: "deepa@email.com", products: ["Athletic Grey Shorts"], amount: 899, paymentStatus: "refunded", orderStatus: "cancelled", date: "2026-03-12" },
];

export const mockCustomers: Customer[] = [
  { id: "C001", name: "Rahul Sharma", email: "rahul@email.com", phone: "+91 9876543210", totalOrders: 5, totalSpent: 8990, status: "active", joinDate: "2025-11-01" },
  { id: "C002", name: "Priya Patel", email: "priya@email.com", phone: "+91 9876543211", totalOrders: 3, totalSpent: 4499, status: "active", joinDate: "2025-12-15" },
  { id: "C003", name: "Amit Kumar", email: "amit@email.com", phone: "+91 9876543212", totalOrders: 2, totalSpent: 2198, status: "active", joinDate: "2026-01-20" },
  { id: "C004", name: "Sneha Reddy", email: "sneha@email.com", phone: "+91 9876543213", totalOrders: 7, totalSpent: 12599, status: "active", joinDate: "2025-09-05" },
  { id: "C005", name: "Vikram Singh", email: "vikram@email.com", phone: "+91 9876543214", totalOrders: 1, totalSpent: 3198, status: "disabled", joinDate: "2026-02-10" },
  { id: "C006", name: "Ananya Gupta", email: "ananya@email.com", phone: "+91 9876543215", totalOrders: 4, totalSpent: 5996, status: "active", joinDate: "2025-10-20" },
];

export const mockCoupons: Coupon[] = [
  { id: "CP001", code: "COOL20", discountType: "percentage", discountValue: 20, expiryDate: "2026-04-30", usageLimit: 100, usedCount: 45, active: true },
  { id: "CP002", code: "FIRST50", discountType: "fixed", discountValue: 50, expiryDate: "2026-06-30", usageLimit: 200, usedCount: 89, active: true },
  { id: "CP003", code: "HOODIE30", discountType: "percentage", discountValue: 30, expiryDate: "2026-03-31", usageLimit: 50, usedCount: 48, active: true },
  { id: "CP004", code: "FLASH10", discountType: "percentage", discountValue: 10, expiryDate: "2026-05-15", usageLimit: 500, usedCount: 120, active: false },
];

export const mockTransactions: Transaction[] = [
  { id: "TXN001", orderId: "CM-2026-001", customer: "Rahul Sharma", amount: 2798, method: "UPI", status: "completed", date: "2026-03-14" },
  { id: "TXN002", orderId: "CM-2026-002", customer: "Priya Patel", amount: 1499, method: "Card", status: "completed", date: "2026-03-15" },
  { id: "TXN003", orderId: "CM-2026-003", customer: "Amit Kumar", amount: 2198, method: "UPI", status: "pending", date: "2026-03-16" },
  { id: "TXN004", orderId: "CM-2026-004", customer: "Sneha Reddy", amount: 1599, method: "Card", status: "completed", date: "2026-03-16" },
  { id: "TXN005", orderId: "CM-2026-005", customer: "Vikram Singh", amount: 3198, method: "Net Banking", status: "failed", date: "2026-03-13" },
  { id: "TXN006", orderId: "CM-2026-006", customer: "Ananya Gupta", amount: 799, method: "UPI", status: "completed", date: "2026-03-15" },
  { id: "TXN007", orderId: "CM-2026-008", customer: "Deepa Nair", amount: 899, method: "Card", status: "refunded", date: "2026-03-12" },
];

export const salesData = [
  { name: "Mon", sales: 4200 },
  { name: "Tue", sales: 3800 },
  { name: "Wed", sales: 5100 },
  { name: "Thu", sales: 4700 },
  { name: "Fri", sales: 6200 },
  { name: "Sat", sales: 8100 },
  { name: "Sun", sales: 7300 },
];

export const monthlySalesData = [
  { name: "Oct", revenue: 45000 },
  { name: "Nov", revenue: 52000 },
  { name: "Dec", revenue: 78000 },
  { name: "Jan", revenue: 61000 },
  { name: "Feb", revenue: 55000 },
  { name: "Mar", revenue: 72000 },
];

export const topProducts = [
  { name: "Essential Black Tee", sold: 128, revenue: 102272 },
  { name: "Street Art Custom Tee", sold: 156, revenue: 249444 },
  { name: "Cloud White Hoodie", sold: 89, revenue: 177911 },
  { name: "Pro Red Jersey Tee", sold: 91, revenue: 118209 },
  { name: "Olive Jogger Pants", sold: 67, revenue: 100433 },
];

export const adminProducts = products.map((p, i) => ({
  ...p,
  stock: [45, 12, 30, 55, 8, 22, 38, 15][i] || 20,
  active: true,
  description: `Premium quality ${p.name.toLowerCase()} made with ${p.fabric}. Perfect for everyday streetwear.`,
  discountPrice: p.originalPrice ? p.price : undefined,
  colors: ["Black", "White", "Navy", "Grey"].slice(0, 2 + (i % 3)),
}));
