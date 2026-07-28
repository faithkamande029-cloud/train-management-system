/**
 * Format date e.g. "2026-07-11" → "July 11, 2026"
 */
export function formatDate(dateStr, locale = "en-KE") {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "Invalid Date";
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format short date e.g. "2026-07-11" → "11/07/2026"
 */
export function formatShortDate(dateStr, locale = "en-KE") {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "Invalid Date";
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

/**
 * Format time e.g. "08:00" → "8:00 AM"
 */
export function formatTime(timeStr, locale = "en-KE") {
  if (!timeStr) return "N/A";
  const [hours, minutes] = timeStr.split(":").map(Number);
  if (isNaN(hours) || isNaN(minutes)) return "N/A";
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Format full date + time e.g. "2026-07-11T08:00" → "July 11, 2026 at 8:00 AM"
 */
export function formatDateTime(dateTimeStr, locale = "en-KE") {
  if (!dateTimeStr) return "N/A";
  const date = new Date(dateTimeStr);
  if (isNaN(date.getTime())) return "Invalid Date";
  return date.toLocaleString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Format currency e.g. 1500 → "Ksh 1,500"
 */
export function formatCurrency(amount, currency = "Ksh") {
  const num = Number(amount);
  if (isNaN(num) || num === 0) return `${currency} 0`;
  return `${currency} ${num.toLocaleString()}`;
}

/**
 * Get time difference e.g. "08:00" and "11:30" → "3h 30m"
 */
export function getDuration(departure, arrival) {
  if (!departure || !arrival) return "N/A";
  const [dH, dM] = departure.split(":").map(Number);
  const [aH, aM] = arrival.split(":").map(Number);
  if ([dH, dM, aH, aM].some(isNaN)) return "N/A";
  let totalMins = (aH * 60 + aM) - (dH * 60 + dM);
  if (totalMins < 0) totalMins += 24 * 60;
  const hours = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

/**
 * Check if a date is in the past
 */
export function isPastDate(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return false;
  return date < new Date();
}

/**
 * Get relative time e.g. "2 days ago", "in 3 hours"
 */
export function getRelativeTime(dateStr, locale = "en") {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "Invalid Date";
  const rtf = new Intl.RelativeTimeFormatter(locale, { numeric: "auto" });
  const diff = date.getTime() - Date.now();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (Math.abs(years) > 0) return rtf.format(years, "year");
  if (Math.abs(months) > 0) return rtf.format(months, "month");
  if (Math.abs(days) > 0) return rtf.format(days, "day");
  if (Math.abs(hours) > 0) return rtf.format(hours, "hour");
  if (Math.abs(minutes) > 0) return rtf.format(minutes, "minute");
  return rtf.format(seconds, "second");
}