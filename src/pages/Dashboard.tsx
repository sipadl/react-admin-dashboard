import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import { TrendingUp, ShoppingCart, Package, DollarSign } from 'lucide-react';

const revenueData = [
  { month: 'Jan', revenue: 4500, orders: 120 },
  { month: 'Feb', revenue: 5200, orders: 145 },
  { month: 'Mar', revenue: 4800, orders: 132 },
  { month: 'Apr', revenue: 6100, orders: 178 },
  { month: 'May', revenue: 7300, orders: 210 },
  { month: 'Jun', revenue: 6800, orders: 195 },
  { month: 'Jul', revenue: 8200, orders: 245 },
];

const stats = [
  { label: 'Total Revenue', value: '$43,200', icon: DollarSign, change: '+12.5%', color: 'text-green-600 bg-green-50' },
  { label: 'Total Orders', value: '1,225', icon: ShoppingCart, change: '+8.2%', color: 'text-blue-600 bg-blue-50' },
  { label: 'Products', value: '156', icon: Package, change: '+3.1%', color: 'text-purple-600 bg-purple-50' },
  { label: 'Growth', value: '23.5%', icon: TrendingUp, change: '+4.7%', color: 'text-orange-600 bg-orange-50' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ label, value, icon: Icon, change, color }) => (
          <div key={label} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
                <p className="text-2xl font-bold mt-1 dark:text-white">{value}</p>
                <span className="text-sm text-green-500">{change}</span>
              </div>
              <div className={`p-3 rounded-xl ${color}`}>
                <Icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" fill="#e0e7ff" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Orders by Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
