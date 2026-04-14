"use client";

import { useAccount } from "wagmi";
import { ProductCard } from "~~/components/marketplace/ProductCard";
import { useMarketplace } from "~~/hooks/useMarketplace";
import { formatPrice } from "~~/lib/format";

export default function MarketplacePage() {
  const { isConnected } = useAccount();
  const { reads } = useMarketplace();

  // Mock data for demonstration
  const mockProducts = [
    {
      id: BigInt(1),
      seller: "0x742d35Cc6634C0532925a3b844Bc454e4438f3e",
      name: "Premium Headphones",
      description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
      price: BigInt("150000000000000000000"), // 0.15 ETH
      stock: BigInt(25),
      isActive: true,
      createdAt: BigInt(Date.now()),
      ipfsHash: "QmExample123...",
    },
    {
      id: BigInt(2),
      seller: "0x8ba1f109551bD43280301767609c983f0412a837",
      name: "Smart Watch",
      description: "Feature-rich smartwatch with health tracking and notifications.",
      price: BigInt("200000000000000000000"), // 0.2 ETH
      stock: BigInt(15),
      isActive: true,
      createdAt: BigInt(Date.now()),
      ipfsHash: "QmExample456...",
    },
  ];

  const handlePurchase = (product: any) => {
    // TODO: Implement purchase logic
    console.log("Purchasing product:", product);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 text-2xl font-bold">
                🛍
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Connect Wallet</h1>
            <p className="text-gray-600 mb-8">Connect your wallet to browse the marketplace</p>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Marketplace</h1>
          <p className="text-xl text-gray-600">Discover amazing products from trusted sellers</p>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Home & Garden</option>
            </select>
            
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
            </select>
            
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <ProductCard
              key={product.id.toString()}
              product={product}
              onPurchase={handlePurchase}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Load More Products
          </button>
        </div>
      </div>
    </div>
  );
}
