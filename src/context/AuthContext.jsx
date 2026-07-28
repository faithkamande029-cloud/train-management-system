import { createContext, useContext, useEffect, useState } from "react";
import { getAccount, normalizeEmail, validateLogin, validatePasswordReset, validateSignup } from "../utils/authRole";

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const USER_STORAGE_KEY = "train-management-user";
const ACCOUNTS_STORAGE_KEY = "train-management-accounts";

function loadAccounts() {
  try {
    const storedAccounts = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    return storedAccounts ? JSON.parse(storedAccounts) : [];
  } catch {
    return [];
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      localStorage.removeItem(USER_STORAGE_KEY);
      return null;
    }
  });
  const [accounts, setAccounts] = useState(loadAccounts);

  useEffect(() => {
    if (user) localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_STORAGE_KEY);
  }, [user]);

  useEffect(() => {
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
  }, [accounts]);

  const login = (email, password, role) => {
    const result = validateLogin(email, password, role, accounts);
    if (result.ok) {
      const { name, email: accountEmail, role: accountRole } = result.account;
      setUser({ name, email: accountEmail, role: accountRole });
    }
    return result;
  };

  const signUp = (name, email, password, confirmPassword) => {
    const result = validateSignup(name, email, password, confirmPassword, accounts);
    if (!result.ok) return result;
    const account = { name: name.trim(), email: normalizeEmail(email), password, role: "user" };
    setAccounts((current) => [...current, account]);
    setUser({ name: account.name, email: account.email, role: account.role });
    return { ok: true, error: null };
  };

  const resetPassword = (email, password, confirmPassword) => {
    const result = validatePasswordReset(email, password, confirmPassword, accounts);
    if (!result.ok) return result;
    const account = { ...getAccount(email, accounts), email: normalizeEmail(email), password };
    setAccounts((current) => [...current.filter((item) => item.email !== account.email), account]);
    return { ok: true, error: null };
  };

  return <AuthContext.Provider value={{ user, login, logout: () => setUser(null), signUp, resetPassword }}>{children}</AuthContext.Provider>;
}
