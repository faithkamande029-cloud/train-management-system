// ─── Helper Functions ──────────────────────────────────────────

/**
 * Check if a value is empty (null, undefined, or whitespace only)
 */
export function isEmpty(value) {
  return !value || value.toString().trim() === "";
}

/**
 * Validate email format (basic RFC 5322 compliant)
 */
export function isValidEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

/**
 * Validate phone number (Kenyan format: 0712345678 or +254712345678)
 */
export function isValidPhone(phone) {
  return /^(\+254|0)[17]\d{8}$/.test(phone);
}

/**
 * Validate a number is positive integer
 */
export function isPositiveInteger(value) {
  return Number.isInteger(Number(value)) && Number(value) > 0;
}

/**
 * Validate time format (HH:MM)
 */
export function isValidTime(time) {
  return /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(time);
}

/**
 * Validate date (YYYY-MM-DD)
 */
export function isValidDate(date) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
}

/**
 * Validate that a string is not empty and has minimum length
 */
export function minLength(value, min) {
  return value && value.toString().trim().length >= min;
}

// ─── Train Form Validator ──────────────────────────────────────

export function validateTrainForm(form) {
  const errors = {};

  if (isEmpty(form.name)) {
    errors.name = "Train name is required";
  } else if (!minLength(form.name, 2)) {
    errors.name = "Train name must be at least 2 characters";
  }

  if (isEmpty(form.type)) {
    errors.type = "Train type is required";
  }

  if (isEmpty(form.totalSeats)) {
    errors.totalSeats = "Total seats is required";
  } else if (!isPositiveInteger(form.totalSeats)) {
    errors.totalSeats = "Total seats must be a positive number";
  }

  if (isEmpty(form.status)) {
    errors.status = "Status is required";
  }

  return errors;
}

// ─── Station Form Validator ────────────────────────────────────

export function validateStationForm(form) {
  const errors = {};

  if (isEmpty(form.name)) {
    errors.name = "Station name is required";
  } else if (!minLength(form.name, 2)) {
    errors.name = "Station name must be at least 2 characters";
  }

  if (isEmpty(form.code)) {
    errors.code = "Station code is required";
  } else if (!minLength(form.code, 2)) {
    errors.code = "Station code must be at least 2 characters";
  }

  if (isEmpty(form.city)) {
    errors.city = "City is required";
  } else if (!minLength(form.city, 2)) {
    errors.city = "City must be at least 2 characters";
  }

  if (isEmpty(form.platform)) {
    errors.platform = "Platform count is required";
  } else if (!isPositiveInteger(form.platform)) {
    errors.platform = "Platform count must be a positive number";
  }

  return errors;
}

// ─── Booking Form Validator ────────────────────────────────────

export function validateBookingForm(form) {
  const errors = {};

  if (isEmpty(form.passengerName)) {
    errors.passengerName = "Passenger name is required";
  } else if (!minLength(form.passengerName, 2)) {
    errors.passengerName = "Passenger name must be at least 2 characters";
  }

  if (isEmpty(form.email)) {
    errors.email = "Email is required";
  } else if (!isValidEmail(form.email)) {
    errors.email = "Invalid email address";
  }

  if (isEmpty(form.phone)) {
    errors.phone = "Phone number is required";
  } else if (!isValidPhone(form.phone)) {
    errors.phone = "Invalid phone number (use 0712345678 or +254712345678)";
  }

  if (isEmpty(form.trainId)) {
    errors.trainId = "Train ID is required";
  }

  if (isEmpty(form.scheduleId)) {
    errors.scheduleId = "Schedule ID is required";
  }

  if (isEmpty(form.seatNumber)) {
    errors.seatNumber = "Seat number is required";
  }

  if (isEmpty(form.fare)) {
    errors.fare = "Fare is required";
  } else if (!isPositiveInteger(form.fare)) {
    errors.fare = "Fare must be a positive number";
  }

  return errors;
}

// ─── Schedule Form Validator ───────────────────────────────────

export function validateScheduleForm(form) {
  const errors = {};

  if (isEmpty(form.trainId)) {
    errors.trainId = "Train ID is required";
  }

  if (isEmpty(form.fromStation)) {
    errors.fromStation = "Departure station is required";
  }

  if (isEmpty(form.toStation)) {
    errors.toStation = "Arrival station is required";
  }

  if (isEmpty(form.departureTime)) {
    errors.departureTime = "Departure time is required";
  } else if (!isValidTime(form.departureTime)) {
    errors.departureTime = "Invalid time format (HH:MM)";
  }

  if (isEmpty(form.arrivalTime)) {
    errors.arrivalTime = "Arrival time is required";
  } else if (!isValidTime(form.arrivalTime)) {
    errors.arrivalTime = "Invalid time format (HH:MM)";
  }

  if (form.departureTime && form.arrivalTime && form.departureTime >= form.arrivalTime) {
    errors.departureTime = "Departure time must be before arrival time";
  }

  if (isEmpty(form.status)) {
    errors.status = "Status is required";
  }

  return errors;
}

// ─── Payment Form Validator (basic, CVV not stored) ───────────

export function validatePaymentForm(form) {
  const errors = {};

  if (isEmpty(form.cardHolderName)) {
    errors.cardHolderName = "Card holder name is required";
  } else if (!minLength(form.cardHolderName, 2)) {
    errors.cardHolderName = "Card holder name must be at least 2 characters";
  }

  if (isEmpty(form.cardNumber)) {
    errors.cardNumber = "Card number is required";
  } else if (!/^\d{16}$/.test(form.cardNumber.replace(/\s/g, ""))) {
    errors.cardNumber = "Card number must be exactly 16 digits";
  }

  if (isEmpty(form.expiryDate)) {
    errors.expiryDate = "Expiry date is required";
  } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiryDate)) {
    errors.expiryDate = "Invalid expiry date (MM/YY)";
  } else {
    // Check if card is expired
    const [month, year] = form.expiryDate.split("/").map(Number);
    const now = new Date();
    const expYear = 2000 + year;
    const expMonth = month - 1;
    const expiry = new Date(expYear, expMonth + 1, 0);
    if (expiry <= now) {
      errors.expiryDate = "Card has expired";
    }
  }

  if (isEmpty(form.cvv)) {
    errors.cvv = "CVV is required";
  } else if (!/^\d{3,4}$/.test(form.cvv)) {
    errors.cvv = "CVV must be 3 or 4 digits";
  }

  if (isEmpty(form.paymentMethod)) {
    errors.paymentMethod = "Payment method is required";
  }

  return errors;
}

// ─── User Form Validator ───────────────────────────────────────

export function validateUserForm(form) {
  const errors = {};

  if (isEmpty(form.name)) {
    errors.name = "Name is required";
  } else if (!minLength(form.name, 2)) {
    errors.name = "Name must be at least 2 characters";
  }

  if (isEmpty(form.email)) {
    errors.email = "Email is required";
  } else if (!isValidEmail(form.email)) {
    errors.email = "Invalid email address";
  }

  if (isEmpty(form.role)) {
    errors.role = "Role is required";
  }

  if (isEmpty(form.status)) {
    errors.status = "Status is required";
  }

  return errors;
}

// ─── Login Form Validator ──────────────────────────────────────

export function validateLoginForm(form) {
  const errors = {};

  if (isEmpty(form.email)) {
    errors.email = "Email is required";
  } else if (!isValidEmail(form.email)) {
    errors.email = "Invalid email address";
  }

  if (isEmpty(form.password)) {
    errors.password = "Password is required";
  } else if (form.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
}

// ─── Register Form Validator ──────────────────────────────────

export function validateRegisterForm(form) {
  const errors = {};

  if (isEmpty(form.name)) {
    errors.name = "Name is required";
  } else if (!minLength(form.name, 2)) {
    errors.name = "Name must be at least 2 characters";
  }

  if (isEmpty(form.email)) {
    errors.email = "Email is required";
  } else if (!isValidEmail(form.email)) {
    errors.email = "Invalid email address";
  }

  if (isEmpty(form.password)) {
    errors.password = "Password is required";
  } else if (form.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (isEmpty(form.confirmPassword)) {
    errors.confirmPassword = "Please confirm your password";
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}