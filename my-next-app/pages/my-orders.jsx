'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function MyOrders() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchOrders = async () => {
        try {
          const email = session?.user?.email;
          if (!email) {
            console.warn('No user email found in session.');
            return;
          }

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/get_orders?email=${session.user.email}`
          );

          if (!res.ok) {
            throw new Error(`Server error: ${res.status}`);
          }

          const data = await res.json();
          console.log('📦 Orders fetched:', data);
          setOrders(data);
        } catch (error) {
          console.error('❌ Failed to fetch orders:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    }
  }, [status, session]);

  if (status === 'loading' || loading) {
    return (
      <div className="p-6 text-gray-600 text-sm">
        Loading orders...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="p-6 text-red-600 font-semibold">
        Please log in to view your orders.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-gray-500 text-lg">No orders found.</div>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total:</strong> {order.total}</p>
              <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>

              {/* Add more fields depending on your OrderSerializer */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
