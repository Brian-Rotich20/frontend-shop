// app/admin/page.tsx
// dashboard overview (stats, recent activity)
'use client';

import Link from 'next/link';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Products', value: '248', icon: '📦', change: '+12%' },
    { label: 'Categories', value: '18', icon: '🏷️', change: '+3%' },
    { label: 'Total Orders', value: '1,429', icon: '🛒', change: '+18%' },
    { label: 'Featured Products', value: '32', icon: '⭐', change: '+5%' },
    { label: 'Flash Sales', value: '8', icon: '⚡', change: 'Active' },
    { label: 'Revenue', value: '$48,392', icon: '💰', change: '+24%' },
  ];

  const quickActions = [
    {
      title: 'Add Product',
      description: 'Create a new product listing',
      href: '/admin/products/add',
      icon: '➕',
      color: 'orange',
    },
    {
      title: 'Add Featured Product',
      description: 'Feature a product on homepage',
      href: '/admin/products/featured',
      icon: '⭐',
      color: 'orange',
    },
    {
      title: 'View Orders',
      description: 'Manage customer orders',
      href: '/admin/orders',
      icon: '📋',
      color: 'gray',
    },
    {
      title: 'Flash Sales',
      description: 'Create limited-time offers',
      href: '/admin/products/flash-sales',
      icon: '⚡',
      color: 'orange',
    },
    {
      title: 'Add Payment',
      description: 'Configure payment methods',
      href: '/admin/settings/payments',
      icon: '💳',
      color: 'gray',
    },
    {
      title: 'View Your Store',
      description: 'Preview your live store',
      href: '/',
      icon: '🏪',
      color: 'orange',
    },
  ];

  const recentOrders = [
    {
      id: '#ORD-1047',
      customer: 'John Smith',
      product: 'Wireless Headphones',
      amount: '$129.99',
      status: 'Completed',
      date: '2 hours ago',
    },
    {
      id: '#ORD-1046',
      customer: 'Sarah Johnson',
      product: 'Smart Watch Pro',
      amount: '$299.99',
      status: 'Processing',
      date: '5 hours ago',
    },
    {
      id: '#ORD-1045',
      customer: 'Michael Brown',
      product: 'Laptop Stand',
      amount: '$49.99',
      status: 'Shipped',
      date: '1 day ago',
    },
    {
      id: '#ORD-1044',
      customer: 'Emily Davis',
      product: 'Keyboard & Mouse Set',
      amount: '$89.99',
      status: 'Completed',
      date: '1 day ago',
    },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 12500 },
    { month: 'Feb', revenue: 15800 },
    { month: 'Mar', revenue: 18200 },
    { month: 'Apr', revenue: 22400 },
    { month: 'May', revenue: 28600 },
    { month: 'Jun', revenue: 32100 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-orange-100 text-orange-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome DIGITAL ARCHITECTS!
        </h1>
        <p className="text-gray-600">
          Here&apos;s an overview of your store performance and recent activity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{stat.icon}</span>
              <span className="text-sm font-medium text-orange-600">
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value}
            </p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                action.color === 'orange'
                  ? 'border-orange-200 bg-orange-50 hover:bg-orange-100 hover:border-orange-600'
                  : 'border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'
              }`}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{action.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Orders & Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {order.product}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-200">
            <Link
              href="/admin/orders"
              className="text-sm text-orange-600 hover:text-orange-700 font-medium"
            >
              View all orders →
            </Link>
          </div>
        </div>

        {/* Revenue Overview */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Revenue Overview
          </h2>
          <div className="space-y-4">
            {revenueData.map((data, index) => {
              const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));
              const widthPercent = (data.revenue / maxRevenue) * 100;
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      {data.month}
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      ${data.revenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${widthPercent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <Link
              href="/admin/analytics"
              className="text-sm text-orange-600 hover:text-orange-700 font-medium"
            >
              View detailed analytics →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}