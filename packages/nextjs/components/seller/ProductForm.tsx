"use client";

import { useState } from "react";

interface ProductFormProps {
  onSubmit?: (product: ProductFormData) => void;
  initialData?: Partial<ProductFormData>;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: string;
  stock: string;
  ipfsHash: string;
}

export const ProductForm = ({ onSubmit, initialData }: ProductFormProps) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    stock: initialData?.stock || "",
    ipfsHash: initialData?.ipfsHash || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const handleInputChange = (field: keyof ProductFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        {initialData ? "Edit Product" : "Create New Product"}
      </h3>
      
      <div className="space-y-4">
        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe your product"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
            Price (ETH)
          </label>
          <input
            type="number"
            id="price"
            value={formData.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
            step="0.001"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.0"
            required
          />
        </div>

        {/* Stock */}
        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
            Stock Quantity
          </label>
          <input
            type="number"
            id="stock"
            value={formData.stock}
            onChange={(e) => handleInputChange("stock", e.target.value)}
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0"
            required
          />
        </div>

        {/* IPFS Hash */}
        <div>
          <label htmlFor="ipfsHash" className="block text-sm font-medium text-gray-700 mb-2">
            IPFS Hash (for images/metadata)
          </label>
          <input
            type="text"
            id="ipfsHash"
            value={formData.ipfsHash}
            onChange={(e) => handleInputChange("ipfsHash", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Qm..."
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          {initialData ? "Update Product" : "Create Product"}
        </button>
      </div>
    </form>
  );
};
