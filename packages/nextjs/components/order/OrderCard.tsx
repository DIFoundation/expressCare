"use client";

import { Order, OrderStatus } from "~~/types";

interface OrderCardProps {
  order: Order;
  onConfirm?: (orderId: number) => void;
  onCancel?: (orderId: number) => void;
  onFulfill?: (orderId: number) => void;
}

export const OrderCard = ({ order, onConfirm, onCancel, onFulfill }: OrderCardProps) => {
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Pending:
        return "text-yellow-600 bg-yellow-100";
      case OrderStatus.Paid:
        return "text-blue-600 bg-blue-100";
      case OrderStatus.Fulfilled:
        return "text-purple-600 bg-purple-100";
      case OrderStatus.Completed:
        return "text-green-600 bg-green-100";
      case OrderStatus.Refunded:
        return "text-red-600 bg-red-100";
      case OrderStatus.Cancelled:
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const formatPrice = (price: string) => {
    const priceInEth = parseFloat(price) / 1e18;
    return priceInEth.toFixed(4);
  };

  const getStatusDisplay = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Pending:
        return "PENDING";
      case OrderStatus.Paid:
        return "PAID";
      case OrderStatus.Fulfilled:
        return "FULFILLED";
      case OrderStatus.Completed:
        return "COMPLETED";
      case OrderStatus.Refunded:
        return "REFUNDED";
      case OrderStatus.Cancelled:
        return "CANCELLED";
      default:
        return "UNKNOWN";
    }
  };

  const canConfirm = order.status === OrderStatus.Fulfilled && onConfirm;
  const canCancel = order.status === OrderStatus.Paid && onCancel;
  const canFulfill = order.status === OrderStatus.Paid && onFulfill;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Order Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Order #{order.id}
          </h3>
          <p className="text-sm text-gray-500">
            {new Date(Number(order.createdAt) * 1000).toLocaleDateString()}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
          {getStatusDisplay(order.status)}
        </div>
      </div>

      {/* Order Details */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Product ID:</span>
          <span className="font-medium">#{order.productId}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Quantity:</span>
          <span className="font-medium">{order.quantity}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Total Amount:</span>
          <span className="font-bold text-lg">{formatPrice(order.totalAmount.toString())} ETH</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Escrow ID:</span>
          <span className="font-mono text-sm">#{order.escrowId}</span>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-2">Shipping Address:</h4>
        <p className="text-gray-600 bg-gray-50 p-3 rounded">
          {order.shippingAddress}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {canFulfill && (
          <button
            onClick={() => onFulfill(Number(order.id))}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Mark as Fulfilled
          </button>
        )}
        
        {canConfirm && (
          <button
            onClick={() => onConfirm(Number(order.id))}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Confirm Receipt
          </button>
        )}
        
        {canCancel && (
          <button
            onClick={() => onCancel(Number(order.id))}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Cancel Order
          </button>
        )}
      </div>
    </div>
  );
};
