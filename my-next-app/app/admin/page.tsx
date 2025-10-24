// app/admin/page.tsx
// dashboard overview (stats, recent activity)
'use client';

import Link from 'next/link';
import {
  PlusCircle,
  Star,
  ClipboardList,
  Zap,
  CreditCard,
  Store,
} from "lucide-react";
import { Linkedin, Twitter, Instagram, Facebook } from "lucide-react";

export default function AdminDashboard() {


const quickActions = [
  {
    title: 'Add Product',
    description: 'Create a new product listing',
    href: '/admin/products/add',
    icon: <PlusCircle className="w-5 h-5 text-orange-500" />,
    color: 'orange',
  },
  {
    title: 'Add Featured Product',
    description: 'Feature a product on homepage',
    href: '/admin/products/featured',
    icon: <Star className="w-5 h-5 text-orange-500" />,
    color: 'orange',
  },
  {
    title: 'View Orders',
    description: 'Manage customer orders',
    href: '/admin/orders',
    icon: <ClipboardList className="w-5 h-5 text-orange-500" />,
    color: 'gray',
  },
  {
    title: 'Flash Sales',
    description: 'Create limited-time offers',
    href: '/admin/products/flash-sales',
    icon: <Zap className="w-5 h-5 text-orange-500" />,
    color: 'orange',
  },
  {
    title: 'Add Payment',
    description: 'Configure payment methods',
    href: '/admin/settings/payments',
    icon: <CreditCard className="w-5 h-5 text-orange-500" />,
    color: 'gray',
  },
  {
    title: 'View Your Store',
    description: 'Preview your live store',
    href: '/',
    icon: <Store className="w-5 h-5 text-orange-500" />,
    color: 'orange',
  },
];






  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto bg-gray-900">
      {/* Welcome Section */}
      <div className="mb-8 bg-orange-500 text-white rounded-2xl p-6 shadow-md">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome DIGITAL ARCHITECTS!
        </h1>
        <p className="text-gray-100">
          Here&apos;s an overview of your store performance and recent activity.
        </p>
      </div>


        {/* Quick Actions */}
        <div className="mb-8 bg-gray-800 rounded-2xl p-6 shadow-md">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">
            Your e-commerce store is live.
          </h2>
          <p className="text-xs text-gray-400 mb-4">
            ✅ Your store is ready — just complete a few quick steps to launch fully!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="p-6 rounded-xl border border-gray-700 bg-gray-900 hover:bg-gray-700 transition-all duration-200 flex items-start gap-4"
              >
                <div className="text-3xl">{action.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-100 mb-1">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-400">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Next Steps Section */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-md mt-8">
          <h2 className="text-xl font-bold text-white mb-2">
            You’re about to complete your shop
          </h2>
          <p className="text-xs text-gray-400 mb-6">
            Follow these quick steps to finish setting up and share your store with customers.
          </p>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex items-start gap-4">
              <button className="w-8 h-8 rounded-full bg-gray-300 text-gray-900 font-semibold flex items-center justify-center">
                1
              </button>
              <div>
                <h3 className="font-semibold text-gray-100">Add store info</h3>
                <p className="text-sm text-gray-400 mb-2">
                  Complete your store profile and details.
                </p>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium px-4 py-2 rounded-lg">
                  Add Info
                </button>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4">
              <button className="w-8 h-8 rounded-full bg-gray-300 text-gray-900 font-semibold flex items-center justify-center">
                2
              </button>
              <div>
                <h3 className="font-semibold text-gray-100">Set up payments</h3>
                <p className="text-sm text-gray-400 mb-2">
                  Choose how you would like to receive payments for your orders.
                </p>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium px-4 py-2 rounded-lg">
                  Set Up Payments
                </button>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4">
              <button className="w-8 h-8 rounded-full bg-gray-300 text-gray-900 font-semibold flex items-center justify-center">
                3
              </button>
              <div>
                <h3 className="font-semibold text-gray-100">Connect your preferred domain</h3>
                <p className="text-sm text-gray-400 mb-2">
                  Set up a custom domain for your store.
                </p>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium px-4 py-2 rounded-lg">
                  Connect Domain
                </button>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-4">
              <button className="w-8 h-8 rounded-full bg-gray-300 text-gray-900 font-semibold flex items-center justify-center">
                4
              </button>
              <div>
                <h3 className="font-semibold text-gray-100">Copy your store link</h3>
                <p className="text-sm text-gray-400 mb-2">
                  Share your store link with customers to start getting sales.
                </p>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium px-4 py-2 rounded-lg">
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Revenue Overview */}
          <div className="rounded-xl p-4 shadow-sm border border-gray-700">
            <h2 className="text-lg font-semibold text-gray-100 mb-2">Revenue Overview</h2>
            <p className="text-2xl font-bold text-green-600">Ksh 0</p>
            <p className="text-sm text-gray-400 mt-2 font-medium">
               No revenue data available yet
            </p>
          </div>

          {/* Recent Orders */}
          <div className="rounded-xl p-4 shadow-sm border border-gray-700">
            <h2 className="text-lg font-semibold text-gray-100 mb-2">Recent Orders</h2>
            <p className="text-sm text-gray-400 font-semibold">
               No sales data yet
            </p>
          </div>

          {/* Top Selling Products */}
          <div className="rounded-xl p-4 shadow-sm border border-gray-700">
            <h2 className="text-lg font-semibold text-gray-100 mb-2">Top Selling Products</h2>
            <p className="text-sm text-gray-400">
              No sales data yet
            </p>
          </div>
        </div>
             <div className="bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-700 mt-8">
      <h2 className="text-lg font-semibold text-gray-100 mb-4">
        Follow Us on Social Media
      </h2>

      <div className="flex flex-wrap gap-3">
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-gray-800 text-gray-100 px-4 py-2 rounded-xl hover:bg-gray-700 transition"
        >
          <Linkedin className="w-5 h-5 text-blue-500" />
          LinkedIn
        </a>

        <a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-gray-800 text-gray-100 px-4 py-2 rounded-xl hover:bg-gray-700 transition"
        >
          <Twitter className="w-5 h-5 text-gray-300" />
          X (Twitter)
        </a>

        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-gray-800 text-gray-100 px-4 py-2 rounded-xl hover:bg-gray-700 transition"
        >
          <Instagram className="w-5 h-5 text-pink-500" />
          Instagram
        </a>

        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-gray-800 text-gray-100 px-4 py-2 rounded-xl hover:bg-gray-700 transition"
        >
          <Facebook className="w-5 h-5 text-blue-600" />
          Facebook
        </a>
      </div>
    </div>

      </div>
  );
}