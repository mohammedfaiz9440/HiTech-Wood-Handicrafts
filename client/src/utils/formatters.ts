/**
 * Parses a price string like "₹35,000" or "₹ 35,000" into a numeric value (35000)
 */
export function parsePrice(priceStr: string): number {
  if (!priceStr) return 0;
  // Remove currency symbols, commas, spaces and non-numeric characters except decimals
  const cleanStr = priceStr.replace(/[^0-9.]/g, "");
  const value = parseFloat(cleanStr);
  return isNaN(value) ? 0 : value;
}

/**
 * Formats a number into Indian Rupee currency format (e.g. 35000 -> "₹35,000")
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
