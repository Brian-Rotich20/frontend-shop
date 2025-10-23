'use client';

export default function AnalyticsPage() {
  const monthlyRevenue = [
    { month: 'Jan', revenue: 12500 },
    { month: 'Feb', revenue: 15800 },
    { month: 'Mar', revenue: 18200 },
    { month: 'Apr', revenue: 22400 },
    { month: 'May', revenue: 28600 },
    { month: 'Jun', revenue: 32100 },
  ];

  const topProducts = [
    { name: 'Wireless Headphones', sales: 342, revenue: '$44,458' },
    { name: 'Smart Watch Pro', sales: 289, revenue: '$86,697' },
    { name: 'USB-C Hub', sales: 267, revenue: '$10,677' },
    { name: 'Keyboard & Mouse Set', sales: 198, revenue: '$17,820' },
    { name: 'Laptop Stand', sales: 156, revenue: '$7,798' },
  ];

  const trafficSources = [
    { source: 'Direct', percentage: 45, color: 'bg-orange-600' },
    { source: 'Social Media', percentage: 28, color: 'bg-blue-600' },
    { source: 'Search Engines', percentage: 18, color: 'bg-green-600' },
    { source: 'Referrals', percentage: 9, color: 'bg-purple-600' },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
        <p className="text-gray-600">
          Track your store performance and customer insights
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl">💰</span>
            <span className="text-sm font-medium text-green-600">+24%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">$48,392</p>
          <p className="text-sm text-gray-600">Total Revenue</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl">🛒</span>
            <span className="text-sm font-medium text-green-600">+18%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">1,429</p>
          <p className="text-sm text-gray-600">Total Orders</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl">👥</span>
            <span className="text-sm font-medium text-green-600">+32%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">8,234</p>
          <p className="text-sm text-gray-600">Total Customers</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl">📊</span>
            <span className="text-sm font-medium text-orange-600">4.2%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">$33.87</p>
          <p className="text-sm text-gray-600">Avg Order Value</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Monthly Revenue
          </h2>
          <div className="space-y-4">
            {monthlyRevenue.map((data, index) => {
              const maxRevenue = Math.max(...monthlyRevenue.map((d) => d.revenue));
              const widthPercent = (data.revenue / maxRevenue) * 100;
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {data.month}
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      ${data.revenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-orange-600 h-3 rounded-full transition-all duration-500 hover:bg-orange-700"
                      style={{ width: `${widthPercent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Traffic Sources
          </h2>
          <div className="space-y-6">
            {trafficSources.map((source, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {source.source}
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {source.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${source.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${source.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Top Selling Products</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Sales
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topProducts.map((product, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="flex items-center justify-center w-8 h-8 bg-orange-100 text-orange-600 font-bold rounded-full">
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {product.sales} units
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.revenue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
          <h3 className="font-semibold text-gray-900 mb-4">Conversion Rate</h3>
          <p className="text-3xl font-bold text-orange-600 mb-2">3.8%</p>
          <p className="text-sm text-gray-600">+0.4% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Avg Session Duration</h3>
          <p className="text-3xl font-bold text-gray-900 mb-2">4m 32s</p>
          <p className="text-sm text-gray-600">+12s from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Return Rate</h3>
          <p className="text-3xl font-bold text-gray-900 mb-2">2.1%</p>
          <p className="text-sm text-green-600">-0.3% from last month</p>
        </div>
      </div>
    </div>
  );
}