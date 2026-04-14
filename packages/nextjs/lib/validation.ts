/**
 * Validation utilities for forms and data
 */

import { VALIDATION_RULES } from "./constants";

export const validateProductForm = (data: any) => {
  const errors: Record<string, string> = {};

  // Product name validation
  if (!data.name || data.name.trim().length < VALIDATION_RULES.PRODUCT_NAME_MIN) {
    errors.name = `Product name must be at least ${VALIDATION_RULES.PRODUCT_NAME_MIN} characters`;
  } else if (data.name.length > VALIDATION_RULES.PRODUCT_NAME_MAX) {
    errors.name = `Product name must not exceed ${VALIDATION_RULES.PRODUCT_NAME_MAX} characters`;
  }

  // Description validation
  if (!data.description || data.description.trim().length < VALIDATION_RULES.PRODUCT_DESC_MIN) {
    errors.description = `Description must be at least ${VALIDATION_RULES.PRODUCT_DESC_MIN} characters`;
  } else if (data.description.length > VALIDATION_RULES.PRODUCT_DESC_MAX) {
    errors.description = `Description must not exceed ${VALIDATION_RULES.PRODUCT_DESC_MAX} characters`;
  }

  // Price validation
  const price = parseFloat(data.price);
  if (isNaN(price) || price < VALIDATION_RULES.PRICE_MIN) {
    errors.price = `Price must be at least ${VALIDATION_RULES.PRICE_MIN} ETH`;
  } else if (price > VALIDATION_RULES.PRICE_MAX) {
    errors.price = `Price must not exceed ${VALIDATION_RULES.PRICE_MAX} ETH`;
  }

  // Stock validation
  const stock = parseInt(data.stock);
  if (isNaN(stock) || stock < VALIDATION_RULES.STOCK_MIN) {
    errors.stock = `Stock must be at least ${VALIDATION_RULES.STOCK_MIN}`;
  } else if (stock > VALIDATION_RULES.STOCK_MAX) {
    errors.stock = `Stock must not exceed ${VALIDATION_RULES.STOCK_MAX}`;
  }

  // IPFS hash validation
  if (!data.ipfsHash || data.ipfsHash.trim().length === 0) {
    errors.ipfsHash = "IPFS hash is required";
  } else if (!data.ipfsHash.startsWith("Qm")) {
    errors.ipfsHash = "Invalid IPFS hash format";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateSellerForm = (data: any) => {
  const errors: Record<string, string> = {};

  // Store name validation
  if (!data.storeName || data.storeName.trim().length < VALIDATION_RULES.STORE_NAME_MIN) {
    errors.storeName = `Store name must be at least ${VALIDATION_RULES.STORE_NAME_MIN} characters`;
  } else if (data.storeName.length > VALIDATION_RULES.STORE_NAME_MAX) {
    errors.storeName = `Store name must not exceed ${VALIDATION_RULES.STORE_NAME_MAX} characters`;
  }

  // Store description validation
  if (!data.storeDescription || data.storeDescription.trim().length < VALIDATION_RULES.STORE_DESC_MIN) {
    errors.storeDescription = `Description must be at least ${VALIDATION_RULES.STORE_DESC_MIN} characters`;
  } else if (data.storeDescription.length > VALIDATION_RULES.STORE_DESC_MAX) {
    errors.storeDescription = `Description must not exceed ${VALIDATION_RULES.STORE_DESC_MAX} characters`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateOrderForm = (data: any) => {
  const errors: Record<string, string> = {};

  // Product ID validation
  if (!data.productId || data.productId <= 0) {
    errors.productId = "Please select a valid product";
  }

  // Quantity validation
  if (!data.quantity || data.quantity <= 0) {
    errors.quantity = "Quantity must be at least 1";
  }

  // Shipping address validation
  if (!data.shippingAddress || data.shippingAddress.trim().length < 10) {
    errors.shippingAddress = "Please enter a valid shipping address";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};
