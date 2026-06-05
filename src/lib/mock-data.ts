import type { Product, Order, User, DashboardMetrics, ChartData, CategoryData } from '../types';
import { subDays, format } from 'date-fns';

// ── Products ──
export const mockProducts: Product[] = Array.from({ length: 50 }, (_, i) => {
  const categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Home', 'Sports', 'Beauty', 'Toys'];
  const statuses: ('active' | 'inactive')[] = ['active', 'inactive'];
  const daysAgo = Math.floor(Math.random() * 90);
  return {
    id: `PRD-${String(i + 1).padStart(4, '0')}`,
    name: `Product ${i + 1}`,
    description: `Description for product ${i + 1}. This is a sample product description.`,
    price: Math.round((Math.random() * 1000 + 10) * 100) / 100,
    category: categories[Math.floor(Math.random() * categories.length)],
    stock: Math.floor(Math.random() * 200),
    sku: `SKU-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    createdAt: format(subDays(new Date(), daysAgo), 'yyyy-MM-dd'),
    updatedAt: format(subDays(new Date(), Math.floor(Math.random() * daysAgo)), 'yyyy-MM-dd'),
  };
});

// ── Orders ──
export const mockOrders: Order[] = Array.from({ length: 30 }, (_, i) => {
  const statuses: Order['status'][] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  const names = ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince', 'Eve Wilson', 'Frank Miller', 'Grace Lee', 'Henry Davis'];
  const paymentMethods = ['Credit Card', 'Bank Transfer', 'PayPal', 'E-Wallet'];
  const daysAgo = Math.floor(Math.random() * 60);
  const itemCount = Math.floor(Math.random() * 4) + 1;
  const items = Array.from({ length: itemCount }, (_, j) => ({
    productId: `PRD-${String(Math.floor(Math.random() * 50) + 1).padStart(4, '0')}`,
    productName: `Product ${Math.floor(Math.random() * 50) + 1}`,
    quantity: Math.floor(Math.random() * 5) + 1,
    price: Math.round((Math.random() * 500 + 10) * 100) / 100,
  }));
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return {
    id: `ORD-${String(i + 1).padStart(4, '0')}`,
    customerId: `CUST-${String(Math.floor(Math.random() * 100) + 1).padStart(4, '0')}`,
    customerName: names[Math.floor(Math.random() * names.length)],
    email: `user${i + 1}@example.com`,
    items,
    total: Math.round(total * 100) / 100,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
    shippingAddress: `${Math.floor(Math.random() * 999) + 1} Main St, City, Country`,
    createdAt: format(subDays(new Date(), daysAgo), 'yyyy-MM-dd'),
    updatedAt: format(subDays(new Date(), Math.floor(Math.random() * daysAgo)), 'yyyy-MM-dd'),
  };
});

// ── Users ──
export const mockUsers: User[] = Array.from({ length: 20 }, (_, i) => {
  const roles: User['role'][] = ['admin', 'manager', 'staff', 'viewer'];
  const names = ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince', 'Eve Wilson',
    'Frank Miller', 'Grace Lee', 'Henry Davis', 'Ivy Chen', 'Jack Wilson',
    'Karen White', 'Leo Anderson', 'Mia Thomas', 'Noah Garcia', 'Olivia Brown',
    'Peter Davis', 'Quinn Lee', 'Rachel Kim', 'Sam Taylor', 'Tina Martin'];
  const daysAgo = Math.floor(Math.random() * 180);
  return {
    id: `USR-${String(i + 1).padStart(4, '0')}`,
    name: names[i],
    email: names[i].toLowerCase().replace(' ', '.') + '@example.com',
    role: roles[Math.floor(Math.random() * roles.length)],
    status: Math.random() > 0.2 ? 'active' : 'inactive',
    lastLogin: format(subDays(new Date(), Math.floor(Math.random() * 30)), 'yyyy-MM-dd HH:mm'),
    createdAt: format(subDays(new Date(), daysAgo), 'yyyy-MM-dd'),
  };
});

// ── Dashboard Metrics ──
export const mockMetrics: DashboardMetrics = {
  revenue: { total: 284500, change: 12.5, trend: 'up' },
  sales: { total: 1842, change: 8.3, trend: 'up' },
  orders: { total: 423, change: -3.2, trend: 'down' },
  users: { total: 12580, change: 15.7, trend: 'up' },
};

// ── Revenue Chart Data (last 7 days) ──
export const mockRevenueChart: ChartData[] = Array.from({ length: 7 }, (_, i) => ({
  date: format(subDays(new Date(), 6 - i), 'MMM dd'),
  revenue: Math.round(Math.random() * 50000 + 20000),
  sales: Math.floor(Math.random() * 300 + 100),
}));

// ── Sales by Category ──
export const mockCategoryData: CategoryData[] = [
  { name: 'Electronics', value: 35 },
  { name: 'Clothing', value: 20 },
  { name: 'Food', value: 18 },
  { name: 'Books', value: 10 },
  { name: 'Home', value: 8 },
  { name: 'Others', value: 9 },
];
