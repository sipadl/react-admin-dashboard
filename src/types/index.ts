export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  sku: string;
  image?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  email: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff' | 'viewer';
  avatar?: string;
  status: 'active' | 'inactive';
  lastLogin?: string;
  createdAt: string;
}

export interface DashboardMetrics {
  revenue: { total: number; change: number; trend: 'up' | 'down' };
  sales: { total: number; change: number; trend: 'up' | 'down' };
  orders: { total: number; change: number; trend: 'up' | 'down' };
  users: { total: number; change: number; trend: 'up' | 'down' };
}

export interface ChartData {
  date: string;
  revenue: number;
  sales: number;
}

export interface CategoryData {
  name: string;
  value: number;
}

export interface StatusData {
  name: string;
  value: number;
}
