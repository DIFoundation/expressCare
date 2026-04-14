/**
 * Format utilities for the marketplace
 */

export const formatPrice = (price: bigint | string, decimals: number = 4): string => {
  const priceInEth = Number(price) / 1e18;
  return priceInEth.toFixed(decimals);
};

export const formatAddress = (address: string): string => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatDate = (timestamp: bigint | number): string => {
  return new Date(Number(timestamp) * 1000).toLocaleDateString();
};

export const formatDateTime = (timestamp: bigint | number): string => {
  return new Date(Number(timestamp) * 1000).toLocaleString();
};

export const formatNumber = (num: number | bigint): string => {
  return Number(num).toLocaleString();
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "Pending":
    case "PENDING":
      return "text-yellow-600 bg-yellow-100";
    case "Paid":
    case "PAID":
      return "text-blue-600 bg-blue-100";
    case "Fulfilled":
    case "FULFILLED":
      return "text-purple-600 bg-purple-100";
    case "Completed":
    case "COMPLETED":
      return "text-green-600 bg-green-100";
    case "Refunded":
    case "REFUNDED":
      return "text-red-600 bg-red-100";
    case "Cancelled":
    case "CANCELLED":
      return "text-gray-600 bg-gray-100";
    case "Disputed":
    case "DISPUTED":
      return "text-orange-600 bg-orange-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

export const weiToEth = (wei: bigint | string): number => {
  return Number(wei) / 1e18;
};

export const ethToWei = (eth: number | string): bigint => {
  return BigInt(Number(eth) * 1e18);
};
