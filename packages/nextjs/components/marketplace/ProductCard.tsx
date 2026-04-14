"use client";

import { Product } from "~~/types";

interface ProductCardProps {
  product: Product;
  onPurchase?: (product: Product) => void;
}

export const ProductCard = ({ product, onPurchase }: ProductCardProps) => {
  const formatPrice = (price: string) => {
    const priceInEth = parseFloat(price) / 1e18;
    return priceInEth.toFixed(4);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      {/* Product Image */}
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <div className="text-gray-400 text-4xl">📦</div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(product.price)} ETH
            </span>
            <div className="text-sm text-gray-500">
              Stock: {product.stock}
            </div>
          </div>
          
          <button
            onClick={() => onPurchase?.(product)}
            disabled={product.stock === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {product.stock === 0 ? "Out of Stock" : "Purchase"}
          </button>
        </div>
      </div>
    </div>
  );
};
