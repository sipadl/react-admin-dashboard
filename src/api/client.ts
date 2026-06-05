import { mockProducts, mockOrders, mockUsers, mockMetrics, mockRevenueChart, mockCategoryData } from '../lib/mock-data';
import type { Product, Order, User, DashboardMetrics, ChartData, CategoryData } from '../types';

// ── Simulate network delay ──
const delay = (ms: number = 300) => new Promise((res) => setTimeout(res, ms));

// ── Generic response wrapper ──
interface ApiResponse<T> {
  data: T;
  total: number;
  page: number;
  pageSize: number;
}

// ── Products API ──
export async function fetchProducts(params?: {
  page?: number;
  pageSize?: number;
  search?: string;
  category?: string;
  status?: string;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}): Promise<ApiResponse<Product[]>> {
  await delay(400);
  let filtered = [...mockProducts];

  if (params?.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
  }
  if (params?.category) {
    filtered = filtered.filter((p) => p.category === params.category);
  }
  if (params?.status) {
    filtered = filtered.filter((p) => p.status === params.status);
  }
  // Sort
  if (params?.sortBy) {
    const dir = params.sortDir === 'desc' ? -1 : 1;
    filtered.sort((a: any, b: any) => {
      if (a[params.sortBy!] < b[params.sortBy!]) return -1 * dir;
      if (a[params.sortBy!] > b[params.sortBy!]) return 1 * dir;
      return 0;
    });
  }
  const page = params?.page || 1;
  const pageSize = params?.pageSize || 10;
  const start = (page - 1) * pageSize;
  return {
    data: filtered.slice(start, start + pageSize),
    total: filtered.length,
    page,
    pageSize,
  };
}

export async function fetchProductCategories(): Promise<string[]> {
  await delay(200);
  return ['Electronics', 'Clothing', 'Food', 'Books', 'Home', 'Sports', 'Beauty', 'Toys'];
}

// ── Orders API ──
export async function fetchOrders(params?: {
  page?: number;
  pageSize?: number;
  status?: string;
  search?: string;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}): Promise<ApiResponse<Order[]>> {
  await delay(500);
  let filtered = [...mockOrders];
  if (params?.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter(
      (o) => o.customerName.toLowerCase().includes(q) || o.id.toLowerCase().includes(q)
    );
  }
  if (params?.status) {
    filtered = filtered.filter((o) => o.status === params.status);
  }
  if (params?.sortBy) {
    const dir = params.sortDir === 'desc' ? -1 : 1;
    filtered.sort((a: any, b: any) => {
      if (a[params.sortBy!] < b[params.sortBy!]) return -1 * dir;
      if (a[params.sortBy!] > b[params.sortBy!]) return 1 * dir;
      return 0;
    });
  }
  const page = params?.page || 1;
  const pageSize = params?.pageSize || 10;
  const start = (page - 1) * pageSize;
  return {
    data: filtered.slice(start, start + pageSize),
    total: filtered.length,
    page,
    pageSize,
  };
}

// ── Dashboard API ──
export async function fetchDashboardMetrics(): Promise<DashboardMetrics> {
  await delay(300);
  return mockMetrics;
}
export async function fetchRevenueChart(): Promise<ChartData[]> {
  await delay(300);
  return mockRevenueChart;
}
export async function fetchCategoryData(): Promise<CategoryData[]> {
  await delay(300);
  return mockCategoryData;
}
