import { createContext, useEffect, useState, useContext } from "react";
import { 
  getAccount, 
  normalizeEmail, 
  validateLogin, 
  validatePasswordReset, 
  validateSignup 
} from "../utils/authRole";

export const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext)
  };

const USER_STORAGE_KEY = "train-management-user";
const ACCOUNTS_STORAGE_KEY = "train-management-accounts";

function readAccounts() {
  try {
    const savedAccounts = window.localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    return savedAccounts ? JSON.parse(savedAccounts) : [];
  } catch {
    return [];
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = window.localStorage.getItem(USER_STORAGE_KEY);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      localStorage.removeItem(USER_STORAGE_KEY);
      return null;
    }
  });
  const [accounts, setAccounts] = useState(readAccounts);

  useEffect(() => {
    if (user) window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    else window.localStorage.removeItem(USER_STORAGE_KEY);
  }, [user]);

  useEffect(() => {
    window.localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
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
    setAccounts((currentAccounts) => [...currentAccounts, account]);
    setUser({ name: account.name, email: account.email, role: account.role });
    return { ok: true, error: null };
  };

  const resetPassword = (email, password, confirmPassword) => {
    const result = validatePasswordReset(email, password, confirmPassword, accounts);
    if (!result.ok) return result;

    const existingAccount = getAccount(email, accounts);
    const updatedAccount = { ...existingAccount, email: normalizeEmail(email), password };
    setAccounts((currentAccounts) => [
      ...currentAccounts.filter((account) => account.email !== updatedAccount.email),
      updatedAccount,
    ]);
    return { ok: true, error: null };
  };


  return (
    <AuthContext.Provider value={{ user, login, logout: () => setUser(null), signUp, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}
