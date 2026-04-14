/**
 * Application constants
 */

export const APP_CONFIG = {
  NAME: "ZamaCare Marketplace",
  DESCRIPTION: "Decentralized marketplace with FHE technology",
  VERSION: "1.0.0",
} as const;

export const NETWORK_CONFIG = {
  SEPOLIA_CHAIN_ID: 11155111,
  BLOCK_EXPLORER_URL: "https://sepolia.etherscan.io",
} as const;

export const CONTRACT_ADDRESSES = {
  MARKETPLACE: "0x8bC17Cb1B74aAdbcC4a8566357d906BE556A81f6",
  ESCROW: "0x18265eB5007d4795C2F6587FCCE80233a8f5f7b1",
} as const;

export const UI_CONSTANTS = {
  PAGINATION_LIMIT: 12,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  DEBOUNCE_DELAY: 300,
  NOTIFICATION_DURATION: 5000,
} as const;

export const ROUTES = {
  HOME: "/",
  MARKETPLACE: "/marketplace",
  SELLER: "/seller",
  ORDERS: "/orders",
  PROFILE: "/profile",
  SETTINGS: "/settings",
} as const;

export const API_ENDPOINTS = {
  PRODUCTS: "/api/products",
  ORDERS: "/api/orders",
  SELLERS: "/api/sellers",
  UPLOAD: "/api/upload",
} as const;

export const VALIDATION_RULES = {
  PRODUCT_NAME_MIN: 3,
  PRODUCT_NAME_MAX: 100,
  PRODUCT_DESC_MIN: 10,
  PRODUCT_DESC_MAX: 1000,
  PRICE_MIN: 0.001,
  PRICE_MAX: 1000,
  STOCK_MIN: 0,
  STOCK_MAX: 10000,
  STORE_NAME_MIN: 3,
  STORE_NAME_MAX: 50,
  STORE_DESC_MIN: 10,
  STORE_DESC_MAX: 500,
} as const;
