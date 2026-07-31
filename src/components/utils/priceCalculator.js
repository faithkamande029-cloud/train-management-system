// Base fare per km by train type
const BASE_FARE = {
  express: 5,
  intercity: 3.5,
  regional: 2,
  freight: 1.5,
};

/**
 * Calculate fare based on distance and train type
 * @param {number} distanceKm - Distance in kilometres
 * @param {string} trainType - Type of train (express, intercity, regional, freight)
 * @returns {number} Calculated fare rounded to nearest integer
 */
export function calculateFare(distanceKm, trainType = "regional") {
  const rate = BASE_FARE[trainType.toLowerCase()] || 2;
  return Math.round(distanceKm * rate);
}

/**
 * Apply discount e.g. 10% off
 * @param {number} fare - Original fare
 * @param {number} discountPercent - Discount percentage (0-100)
 * @returns {number} Discounted fare rounded to nearest integer
 */
export function applyDiscount(fare, discountPercent = 0) {
  return Math.round(fare - (fare * discountPercent) / 100);
}

/**
 * Format fare as currency string
 * @param {number} fare - Fare amount
 * @returns {string} Formatted currency string e.g. "Ksh 1,500"
 */
export function formatFare(fare) {
  return `Ksh ${Number(fare).toLocaleString()}`;
}

/**
 * Calculate total for multiple tickets
 * @param {number} fare - Fare per ticket
 * @param {number} quantity - Number of tickets
 * @returns {number} Total fare
 */
export function calculateTotal(fare, quantity = 1) {
  return fare * quantity;
}

/**
 * Calculate per-person cost when sharing a group discount
 * @param {number} totalFare - Total fare after discount
 * @param {number} passengerCount - Number of passengers
 * @returns {number} Cost per person
 */
export function perPersonCost(totalFare, passengerCount) {
  if (passengerCount <= 0) return 0;
  return Math.round(totalFare / passengerCount);
}

/**
 * Apply dynamic pricing based on demand factor (1.0 = normal, >1.0 = surge)
 * @param {number} fare - Base fare
 * @param {number} demandFactor - Demand multiplier (e.g. 1.2 for 20% surge)
 * @returns {number} Adjusted fare
 */
export function applyDynamicPricing(fare, demandFactor = 1.0) {
  return Math.round(fare * demandFactor);
}