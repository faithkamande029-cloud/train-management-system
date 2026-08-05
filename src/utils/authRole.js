export const defaultAccounts = [
  // Keep this aligned with the mock API and the documented demo account.
  {
    name: "Admin User",
    email: "admin@railms.com",
    password: "admin123",
    role: "admin",
  },
  {
    name: "Regular User",
    email: "user@railway.com",
    password: "user123",
    role: "user",
  },
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(email) {
  return String(email).trim().toLowerCase();
}

export function getAccount(email, accounts = []) {
  const normalizedEmail = normalizeEmail(email);
  return (
    [...accounts, ...defaultAccounts].find(
      (account) => account.email === normalizedEmail,
    ) ?? null
  );
}

export function validateLogin(email, password, role, accounts = []) {
  const account = getAccount(email, accounts);

  if (!account) {
    return { ok: false, role: null, error: "Invalid email or password." };
  }

  if (account.password !== password) {
    return { ok: false, role: null, error: "Invalid email or password." };
  }

  if (role && account.role !== role) {
    return {
      ok: false,
      role: null,
      error: "The selected role does not match the provided credentials.",
    };
  }

  return { ok: true, role: role ?? account.role, error: null, account };
}

export function validateSignup(
  name,
  email,
  password,
  confirmPassword,
  accounts = [],
  profile = {},
) {
  const fullName = String(name ?? "").trim();
  const firstName = String(profile.firstName ?? "").trim();
  const lastName = String(profile.lastName ?? "").trim();
  const phone = String(profile.phone ?? "").trim();

  if (!fullName) return { ok: false, error: "Please enter your name." };

  if (
    Object.prototype.hasOwnProperty.call(profile, "firstName") &&
    !firstName
  ) {
    return { ok: false, error: "Please enter your first name." };
  }

  if (Object.prototype.hasOwnProperty.call(profile, "lastName") && !lastName) {
    return { ok: false, error: "Please enter your last name." };
  }

  if (Object.prototype.hasOwnProperty.call(profile, "phone")) {
    if (!phone) return { ok: false, error: "Please enter a phone number." };
    if (!/^\+?\d+$/.test(phone)) {
      return {
        ok: false,
        error:
          "Phone number can only contain digits and an optional leading +.",
      };
    }
    if (phone.replace(/^\+/, "").length < 10) {
      return { ok: false, error: "Please enter a valid phone number." };
    }
  }

  if (!emailPattern.test(normalizeEmail(email)))
    return { ok: false, error: "Please enter a valid email address." };
  if (password.length < 6)
    return { ok: false, error: "Password must contain at least 6 characters." };
  if (password !== confirmPassword)
    return { ok: false, error: "Passwords do not match." };
  if (getAccount(email, accounts))
    return { ok: false, error: "An account with this email already exists." };
  return { ok: true, error: null };
}

export function validatePasswordReset(
  email,
  password,
  confirmPassword,
  accounts = [],
) {
  if (!getAccount(email, accounts))
    return { ok: false, error: "No account was found for that email address." };
  if (password.length < 6)
    return { ok: false, error: "Password must contain at least 6 characters." };
  if (password !== confirmPassword)
    return { ok: false, error: "Passwords do not match." };
  return { ok: true, error: null };
}
