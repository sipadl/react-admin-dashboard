import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useDashboardMetrics } from '@/hooks/useData';
import { TrendingUp, TrendingDown, ShoppingCart, Package, Users, DollarSign } from 'lucide-react';

export function MetricsGrid() {
  const { data: metrics, isLoading, error } = useDashboardMetrics();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 w-4 rounded bg-gray-200"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4">Failed to load metrics.</div>;
  }

  const metricCards = [
    { key: 'revenue', title: 'Revenue', icon: DollarSign, format: (v: number) => `$${v.toLocaleString()}` },
    { key: 'sales', title: 'Sales', icon: ShoppingCart, format: (v: number) => v.toLocaleString() },
    { key: 'orders', title: 'Orders', icon: Package, format: (v: number) => v.toLocaleString() },
    { key: 'users', title: 'Users', icon: Users, format: (v: number) => v.toLocaleString() },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metricCards.map(({ key, title, icon: Icon, format }) => {
        const m = metrics![key as keyof typeof metrics];
        return (
          <Card key={key} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{format(m.total)}</div>
              <p className="text-xs text-muted-foreground">
                {m.trend === 'up' ? (
                  <TrendingUp className="inline h-3 w-3 text-emerald-500" />
                ) : (
                  <TrendingDown className="inline h-3 w-3 text-red-500" />
                )}{' '}
                {Math.abs(m.change)}% from last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
