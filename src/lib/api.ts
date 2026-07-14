const API_URL = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, options);
  const data = await res.json().catch(() => null);

  if (!res.ok || data?.success === false) {
    throw new ApiError(data?.message || res.statusText, res.status);
  }

  return data as T;
}

// ---- Product types (as returned by the backend, minus the excluded `image` field) ----

export type ApiProduct = {
  _id: string;
  sku: string;
  name: string;
  category: string;
  description?: string;
  price: number;
  discountPrice?: number;
  stock: number;
  fabric?: string;
  sizes: string[];
  colors: string[];
  type?: string;
  rating: number;
  numReviews: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type PaginatedProducts = {
  success: true;
  count: number;
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  products: ApiProduct[];
};

export async function getAllProducts(page = 1) {
  return request<PaginatedProducts>(`/products/getAllproducts?page=${page}`);
}

/** Loops through every page of getAllProducts and returns the combined list. Capped as a safety bound. */
export async function getAllProductsFull(maxPages = 25): Promise<ApiProduct[]> {
  const first = await getAllProducts(1);
  const all = [...first.products];
  const totalPages = Math.min(first.totalPages, maxPages);

  for (let page = 2; page <= totalPages; page++) {
    const next = await getAllProducts(page);
    all.push(...next.products);
  }

  return all;
}

export type CreateProductInput = {
  name: string;
  type: string;
  category: string;
  description?: string;
  price: number;
  discountPrice?: number;
  stock: number;
  fabric?: string;
  sizes?: string; // comma separated
  colors?: string; // comma separated
  isActive?: boolean;
  image?: File | null;
};

export async function createProduct(input: CreateProductInput) {
  const form = new FormData();
  form.append("name", input.name);
  form.append("type", input.type);
  form.append("category", input.category);
  if (input.description) form.append("description", input.description);
  form.append("price", String(input.price));
  if (input.discountPrice != null) form.append("discountPrice", String(input.discountPrice));
  form.append("stock", String(input.stock));
  if (input.fabric) form.append("fabric", input.fabric);
  if (input.sizes) form.append("sizes", input.sizes);
  if (input.colors) form.append("colors", input.colors);
  if (input.isActive != null) form.append("isActive", String(input.isActive));
  if (input.image) form.append("image", input.image);

  return request<{ success: true; product: ApiProduct }>("/products/create", {
    method: "POST",
    body: form,
  });
}

export async function updateProductStatus(id: string, isActive: boolean) {
  return request<{ success: true; product: ApiProduct }>(`/products/statusdelee/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isActive }),
  });
}

export async function softDeleteProduct(id: string) {
  return request<{ success: true }>(`/products/delete/${id}`, { method: "PUT" });
}

// ---- Dashboard / analytics ----

export async function getDashboardStats() {
  return request<{
    success: true;
    data: { totalUsers: number; totalRevenue: number; totalOrders: number };
  }>("/products/dashboard-stats");
}

export async function getWeeklyOrdersGraph() {
  return request<{ success: true; weeklyOrders: { day: string; orders: number }[] }>(
    "/products/weekly-orders-graph",
  );
}

export async function getMonthlyOrdersGraph() {
  return request<{ success: true; year: number; monthlyOrders: { month: string; orders: number }[] }>(
    "/products/monthly-graph",
  );
}

export async function getCategoryDistribution() {
  return request<{
    success: true;
    totalSold: number;
    categories: { type: string; sold: number; percentage: number }[];
  }>("/products/category-distribution");
}
