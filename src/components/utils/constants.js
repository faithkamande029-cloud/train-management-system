// ─── TRAIN TYPES ──────────────────────────────────────────────
export const TRAIN_TYPES = [
  { value: "express", label: "Express" },
  { value: "intercity", label: "Intercity" },
  { value: "regional", label: "Regional" },
  { value: "freight", label: "Freight" },
];

export const TRAIN_TYPE_COLORS = {
  express: "bg-blue-600",
  intercity: "bg-purple-600",
  regional: "bg-cyan-600",
  freight: "bg-orange-600",
};

export const TRAIN_TYPE_TEXT_COLORS = {
  express: "text-blue-400",
  intercity: "text-purple-400",
  regional: "text-cyan-400",
  freight: "text-orange-400",
};

// ─── TRAIN STATUSES ────────────────────────────────────────────
export const TRAIN_STATUSES = [
  { value: "active", label: "Active" },
  { value: "maintenance", label: "Maintenance" },
  { value: "inactive", label: "Inactive" },
];

export const TRAIN_STATUS_COLORS = {
  active: "bg-green-600",
  maintenance: "bg-yellow-500",
  inactive: "bg-red-600",
};

export const TRAIN_STATUS_TEXT_COLORS = {
  active: "text-green-400",
  maintenance: "text-yellow-400",
  inactive: "text-red-400",
};

// ─── BOOKING STATUSES ──────────────────────────────────────────
export const BOOKING_STATUSES = [
  { value: "confirmed", label: "Confirmed" },
  { value: "pending", label: "Pending" },
  { value: "cancelled", label: "Cancelled" },
];

export const BOOKING_STATUS_COLORS = {
  confirmed: "bg-green-600",
  pending: "bg-yellow-500",
  cancelled: "bg-red-600",
};

export const BOOKING_STATUS_TEXT_COLORS = {
  confirmed: "text-green-400",
  pending: "text-yellow-400",
  cancelled: "text-red-400",
};

// ─── SCHEDULE STATUSES ─────────────────────────────────────────
export const SCHEDULE_STATUSES = [
  { value: "on-time", label: "On Time" },
  { value: "delayed", label: "Delayed" },
  { value: "cancelled", label: "Cancelled" },
];

export const SCHEDULE_STATUS_COLORS = {
  "on-time": "bg-green-600",
  delayed: "bg-yellow-500",
  cancelled: "bg-red-600",
};

export const SCHEDULE_STATUS_TEXT_COLORS = {
  "on-time": "text-green-400",
  delayed: "text-yellow-400",
  cancelled: "text-red-400",
};

// ─── PAYMENT METHODS ───────────────────────────────────────────
export const PAYMENT_METHODS = [
  { value: "credit-card", label: "Credit Card" },
  { value: "debit-card", label: "Debit Card" },
  { value: "mobile-money", label: "Mobile Money" },
  { value: "bank-transfer", label: "Bank Transfer" },
];

// ─── PAGINATION ────────────────────────────────────────────────
export const ITEMS_PER_PAGE = 6;

// ─── SEAT LAYOUT ───────────────────────────────────────────────
export const DEFAULT_SEAT_LAYOUT = {
  rows: 10,
  seatsPerRow: 8,
  aislePosition: 4,
};

export const SEAT_TYPES = {
  vip: { name: "VIP", price: 4500, rows: [0, 1, 2] },
  economy: { name: "Economy", price: 3500, rows: [3, 4, 5] },
  regular: { name: "Regular", price: 1500, rows: [6, 7, 8, 9] },
};

export const SEAT_COLORS = [
  "yellow",
  "blue",
  "violet",
  "green",
  "red",
  "gray",
  "pink",
  "indigo",
];

export const SEAT_COLOR_MAP = {
  yellow: "bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200",
  blue: "bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200",
  violet: "bg-violet-200 border-violet-400 text-violet-800 hover:bg-violet-300",
  green: "bg-green-100 border-green-300 text-green-800 hover:bg-green-200",
  red: "bg-red-100 border-red-300 text-red-800 hover:bg-red-200",
  gray: "bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200",
  pink: "bg-pink-100 border-pink-300 text-pink-800 hover:bg-pink-200",
  indigo: "bg-indigo-100 border-indigo-300 text-indigo-800 hover:bg-indigo-200",
};

// ─── ROUTES ────────────────────────────────────────────────────
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  TRAINS: "/trains",
  TRAINS_ADD: "/trains/add",
  TRAIN_DETAILS: (id) => `/trains/${id}`,
  STATIONS: "/stations",
  SCHEDULES: "/schedules",
  BOOKINGS: "/bookings",
  BOOKINGS_NEW: "/bookings/new",
  BOOKINGS_CONFIRM: "/bookings/confirm",
  ADMIN_USERS: "/admin/users",
  ADMIN_REPORTS: "/admin/reports",
};

// ─── USER ROLES ────────────────────────────────────────────────
export const USER_ROLES = [
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
  { value: "agent", label: "Agent" },
  { value: "support", label: "Support" },
];

export const USER_STATUSES = [
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "inactive", label: "Inactive" },
];

// ─── CURRENCY ──────────────────────────────────────────────────
export const CURRENCY = "Ksh";
export const CURRENCY_SYMBOL = "KSh";