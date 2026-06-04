import React from 'react';

const orders = [
  { id: 'ORD-001', customer: 'John Doe', total: 159.98, status: 'completed', date: '2024-01-15' },
  { id: 'ORD-002', customer: 'Jane Smith', total: 45.00, status: 'processing', date: '2024-01-14' },
  { id: 'ORD-003', customer: 'Bob Wilson', total: 129.99, status: 'shipped', date: '2024-01-14' },
  { id: 'ORD-004', customer: 'Alice Brown', total: 234.97, status: 'pending', date: '2024-01-13' },
  { id: 'ORD-005', customer: 'Charlie Lee', total: 79.99, status: 'completed', date: '2024-01-12' },
];

const statusStyle: Record<string, string> = {
  completed: 'bg-green-100 text-green-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  pending: 'bg-yellow-100 text-yellow-800',
};

export default function Orders() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold dark:text-white">Recent Orders</h3>
      </div>
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Order ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Total</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-6 py-4 font-medium text-indigo-600">{order.id}</td>
              <td className="px-6 py-4 dark:text-white">{order.customer}</td>
              <td className="px-6 py-4 dark:text-white">${order.total.toFixed(2)}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle[order.status]}`}>
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
