export const defaultAccounts = [
  { name: 'Admin User', email: 'admin@railway.com', password: 'admin123', role: 'admin' },
  { name: 'Regular User', email: 'user@railway.com', password: 'user123', role: 'user' },
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(email) {
  return String(email).trim().toLowerCase();
}

export function getAccount(email, accounts = []) {
  const normalizedEmail = normalizeEmail(email);
  return [...accounts, ...defaultAccounts].find((account) => account.email === normalizedEmail) ?? null;
}

export function validateLogin(email, password, role, accounts = []) {
  const account = getAccount(email, accounts);

  if (account?.password === password && account.role === role) {
    return { ok: true, role, error: null, account };
  }
  if (account?.password === password && account.role !== role) {
    return { ok: false, role: null, error: 'The selected role does not match the provided credentials.' };
  }
  return { ok: false, role: null, error: 'Invalid email or password.' };
}

export function validateSignup(name, email, password, confirmPassword, accounts = []) {
  if (!String(name).trim()) return { ok: false, error: 'Please enter your name.' };
  if (!emailPattern.test(normalizeEmail(email))) return { ok: false, error: 'Please enter a valid email address.' };
  if (password.length < 6) return { ok: false, error: 'Password must contain at least 6 characters.' };
  if (password !== confirmPassword) return { ok: false, error: 'Passwords do not match.' };
  if (getAccount(email, accounts)) return { ok: false, error: 'An account with this email already exists.' };
  return { ok: true, error: null };
}

export function validatePasswordReset(email, password, confirmPassword, accounts = []) {
  if (!getAccount(email, accounts)) return { ok: false, error: 'No account was found for that email address.' };
  if (password.length < 6) return { ok: false, error: 'Password must contain at least 6 characters.' };
  if (password !== confirmPassword) return { ok: false, error: 'Passwords do not match.' };
  return { ok: true, error: null };
}
