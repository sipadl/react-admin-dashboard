import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Product, Order, DashboardMetrics, ChartData, CategoryData } from '../types';
import {
  fetchProducts,
  fetchOrders,
  fetchDashboardMetrics,
  fetchRevenueChart,
  fetchCategoryData,
  fetchProductCategories,
} from '../api/client';

// ── Products ──
export function useProducts(params?: Parameters<typeof fetchProducts>[0]) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
  });
}

export function useProductCategories() {
  return useQuery({
    queryKey: ['product-categories'],
    queryFn: fetchProductCategories,
    staleTime: 5 * 60 * 1000,
  });
}

// ── Orders ──
export function useOrders(params?: Parameters<typeof fetchOrders>[0]) {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => fetchOrders(params),
  });
}

// ── Dashboard ──
export function useDashboardMetrics() {
  return useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: fetchDashboardMetrics,
    refetchInterval: 60_000, // auto-refresh every 60s
  });
}

export function useRevenueChart() {
  return useQuery({
    queryKey: ['revenue-chart'],
    queryFn: fetchRevenueChart,
    refetchInterval: 60_000,
  });
}

export function useCategoryChart() {
  return useQuery({
    queryKey: ['category-chart'],
    queryFn: fetchCategoryData,
    refetchInterval: 60_000,
  });
}
