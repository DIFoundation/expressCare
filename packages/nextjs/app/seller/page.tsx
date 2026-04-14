"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { ProductForm } from "~~/components/seller/ProductForm";
import { OrderCard } from "~~/components/order/OrderCard";
import { useMarketplace } from "~~/hooks/useMarketplace";
import { formatPrice, formatDate } from "~~/lib/format";

export default function SellerPage() {
  const { isConnected, address } = useAccount();
  const { createProduct, registerSeller } = useMarketplace();
  const [activeTab, setActiveTab] = useState<"products" | "orders" | "analytics">("products");
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Mock data for demonstration
  const mockOrders = [
    {
      id: BigInt(1),
      productId: BigInt(1),
      buyer: "0x742d35Cc6634C0532925a3b844Bc454e4438f3e",
      seller: address || "0x0000000000000000000000000000000000000000000",
      quantity: BigInt(1),
      totalAmount: BigInt("150000000000000000000"), // 0.15 ETH
      shippingAddress: "123 Main St, City, State 12345",
      status: 0, // Pending
      createdAt: BigInt(Date.now() - 86400000), // 1 day ago
      escrowId: BigInt(1),
    },
    {
      id: BigInt(2),
      productId: BigInt(2),
      buyer: "0x8ba1f109551bD43280301767609c983f0412a837",
      seller: address || "0x0000000000000000000000000000000000000000000",
      quantity: BigInt(2),
      totalAmount: BigInt("400000000000000000000"), // 0.4 ETH
      shippingAddress: "456 Oak Ave, Town, State 67890",
      status: 2, // Fulfilled
      createdAt: BigInt(Date.now() - 172800000), // 2 days ago
      escrowId: BigInt(2),
    },
  ];

  const handleCreateProduct = async (productData: any) => {
    const success = await createProduct(productData);
    if (success) {
      setShowCreateForm(false);
    }
  };

  const handleRegisterSeller = async () => {
    await registerSeller("My Store", "Welcome to my amazing store!");
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 text-2xl font-bold">
                🏪
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Seller Dashboard</h1>
            <p className="text-gray-600 mb-8">Connect your wallet to manage your store</p>
            <div className="text-sm text-gray-500">
              Connect using MetaMask, WalletConnect, or other supported wallets
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Seller Dashboard</h1>
              <p className="text-xl text-gray-600">Manage your products and orders</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCreateForm(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                + Create Product
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("products")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "products"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              My Products
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "orders"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "analytics"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Analytics
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === "products" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProductForm onSubmit={handleCreateProduct} />
            
            {/* Products List */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Products</h3>
              <div className="text-gray-500 text-center py-8">
                Your products will appear here
              </div>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
            {mockOrders.map((order) => (
              <OrderCard
                key={order.id.toString()}
                order={order}
                onFulfill={(orderId) => console.log("Fulfill order:", orderId)}
                onCancel={(orderId) => console.log("Cancel order:", orderId)}
              />
            ))}
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Sales</h3>
              <p className="text-3xl font-bold text-green-600">12</p>
              <p className="text-gray-500">This month</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Revenue</h3>
              <p className="text-3xl font-bold text-blue-600">2.45 ETH</p>
              <p className="text-gray-500">Total earnings</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Products</h3>
              <p className="text-3xl font-bold text-purple-600">8</p>
              <p className="text-gray-500">Currently listed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
