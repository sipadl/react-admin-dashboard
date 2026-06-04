import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock: number;
  status: 'active' | 'draft' | 'archived';
}

const mockProducts: Product[] = [
  { id: 1, name: 'Wireless Headphones', sku: 'WH-001', price: 79.99, stock: 150, status: 'active' },
  { id: 2, name: 'USB-C Hub', sku: 'UC-002', price: 45.00, stock: 89, status: 'active' },
  { id: 3, name: 'Mechanical Keyboard', sku: 'MK-003', price: 129.99, stock: 42, status: 'active' },
  { id: 4, name: 'Monitor Stand', sku: 'MS-004', price: 34.99, stock: 200, status: 'draft' },
  { id: 5, name: 'Webcam HD', sku: 'WC-005', price: 59.99, stock: 0, status: 'archived' },
];

export default function Products() {
  const [search, setSearch] = useState('');
  const filtered = mockProducts.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.includes(search)
  );

  const statusColor = {
    active: 'bg-green-100 text-green-800',
    draft: 'bg-yellow-100 text-yellow-800',
    archived: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">SKU</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filtered.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 font-medium dark:text-white">{product.name}</td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{product.sku}</td>
                <td className="px-6 py-4 dark:text-white">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4 dark:text-white">{product.stock}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[product.status]}`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit size={16} /></button>
                  <button className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
