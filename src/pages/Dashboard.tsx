import React from 'react';
import { MetricsGrid } from '@/components/dashboard/MetricsGrid';
import { RevenueLineChart } from '@/components/dashboard/RevenueLineChart';
import { OrdersPieChart } from '@/components/dashboard/OrdersPieChart';
import { useDashboardMetrics, useRevenueChart, useCategoryChart } from '@/hooks/useData';

export default function Dashboard() {
  const metrics = useDashboardMetrics();
  const revenue = useRevenueChart();
  const category = useCategoryChart();

  const isLoading = metrics.isLoading || revenue.isLoading || category.isLoading;
  const isError = metrics.error || revenue.error || category.error;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-1 lg:col-span-2 h-80 bg-gray-100 rounded-lg animate-pulse" />
          <div className="h-80 bg-gray-100 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="p-4 text-red-500 bg-red-50 rounded-lg">
          Failed to load dashboard data. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      {/* Metrics Grid */}
      <MetricsGrid />
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <RevenueLineChart />
        <OrdersPieChart />
      </div>
    </div>
  );
}
