
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Package, CheckCircle, Clock, Truck, RefreshCw } from 'lucide-react';

const Admin = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();

        // Real-time subscription
        const subscription = supabase
            .channel('orders-channel')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'orders' },
                (payload) => {
                    console.log('New order received!', payload);
                    setOrders((prev) => [payload.new, ...prev]);
                    // Optional: Add a sound or notification here
                }
            )
            .on(
                'postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'orders' },
                (payload) => {
                    setOrders((prev) =>
                        prev.map((order) =>
                            order.id === payload.new.id ? payload.new : order
                        )
                    );
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching orders:', error);
        else setOrders(data || []);
        setLoading(false);
    };

    const updateStatus = async (orderId, newStatus) => {
        const { error } = await supabase
            .from('orders')
            .update({ status: newStatus })
            .eq('id', orderId);

        if (error) {
            alert('Failed to update status');
            console.error(error);
        }
    };

    const statusColors = {
        new: 'bg-blue-100 text-blue-800',
        processing: 'bg-yellow-100 text-yellow-800',
        ready: 'bg-purple-100 text-purple-800',
        delivered: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
    };

    if (loading) return <div className="p-10 text-center">Loading orders...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
                <button
                    onClick={fetchOrders}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                    <RefreshCw size={20} /> Refresh
                </button>
            </div>

            <div className="grid gap-6">
                {orders.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-xl">
                        <p className="text-gray-500 text-lg">No orders yet.</p>
                    </div>
                ) : (
                    orders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md"
                        >
                            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="font-mono text-sm text-gray-500">#{order.reference}</span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${statusColors[order.status] || 'bg-gray-100'}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">
                                        {order.customer?.name || 'Unknown Customer'}
                                    </h3>
                                    <p className="text-gray-600">{order.customer?.phone}</p>
                                    <p className="text-sm text-gray-400 mt-1">
                                        {new Date(order.created_at).toLocaleString()}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <div className="text-2xl font-bold text-[#ff9500]">
                                        GH₵ {order.total_amount?.toFixed(2)}
                                    </div>
                                    <div className="mt-4 flex flex-wrap gap-2 justify-end">
                                        {order.status === 'new' && (
                                            <button
                                                onClick={() => updateStatus(order.id, 'processing')}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                                            >
                                                Accept & Process
                                            </button>
                                        )}
                                        {order.status === 'processing' && (
                                            <button
                                                onClick={() => updateStatus(order.id, 'ready')}
                                                className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700"
                                            >
                                                Mark Ready
                                            </button>
                                        )}
                                        {order.status === 'ready' && (
                                            <button
                                                onClick={() => updateStatus(order.id, 'delivered')}
                                                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                                            >
                                                Complete Order
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-4 mt-4">
                                <h4 className="font-semibold text-gray-700 mb-3">Order Items:</h4>
                                <div className="space-y-2">
                                    {Array.isArray(order.items) && order.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between text-sm">
                                            <span>
                                                <span className="font-bold">{item.quantity}x</span> {item.name}
                                                {item.filling && <span className="text-gray-500"> ({item.filling})</span>}
                                            </span>
                                            <span>GH₵ {item.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {order.delivery_info?.notes && (
                                <div className="mt-4 bg-yellow-50 p-3 rounded-lg text-sm text-yellow-800">
                                    <strong>Note:</strong> {order.delivery_info.notes}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Admin;
