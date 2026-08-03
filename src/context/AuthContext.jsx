import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { getCurrentUser, login as apiLogin, logout as apiLogout, register as apiRegister } from "../services/authService";
import { 
  getAccount, 
  normalizeEmail, 
  validateLogin, 
  validatePasswordReset, 
  validateSignup 
} from "../utils/authRole";

const USER_STORAGE_KEY = "train-management-user";
const ACCOUNTS_STORAGE_KEY = "train-management-accounts";
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const apiUrl = import.meta.env.VITE_API_URL;
const isDemoAuth = import.meta.env.VITE_AUTH_MODE === "demo"
  || !apiUrl
  || apiUrl === "/api"
  || apiUrl.includes("localhost:3001");

function normalizeApiUser(user) {
  if (!user) return null;

  return {
    ...user,
    name: user.name || [user.first_name, user.last_name].filter(Boolean).join(" "),
    role: user.role === "passenger" ? "user" : user.role,
  };
}

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
  const [isLoading, setIsLoading] = useState(!isDemoAuth);

  useEffect(() => {
    if (user) window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    else window.localStorage.removeItem(USER_STORAGE_KEY);
  }, [user]);

  useEffect(() => {
    window.localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    if (isDemoAuth) return;

    getCurrentUser()
      .then((response) => setUser(normalizeApiUser(response.data?.data || response.data)))
      .catch(() => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (email, password, role) => {
    if (isDemoAuth) {
      const result = validateLogin(email, password, role, accounts);
      if (result.ok) {
        const { name, email: accountEmail, role: accountRole } = result.account;
        setUser({ name, email: accountEmail, role: accountRole });
      }
      return result;
    }

    setIsLoading(true);
    try {
      const response = await apiLogin({ email, password });
      const authenticatedUser = normalizeApiUser(response.data?.data || response.data?.user);
      if (!authenticatedUser) {
        return { ok: false, role: null, error: "The API login response is missing the user." };
      }
      if (role && authenticatedUser.role !== role) {
        return { ok: false, role: null, error: "The selected role does not match this account." };
      }
      setUser(authenticatedUser);
      return { ok: true, role: authenticatedUser.role, error: null, account: authenticatedUser };
    } catch (error) {
      return { ok: false, role: null, error: error.response?.data?.message || error.message || "Login failed." };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name, email, password, confirmPassword, profile = {}) => {
    const fullName = String(name ?? "").trim() || [profile.firstName, profile.lastName].filter(Boolean).join(" ");
    const firstName = String(profile.firstName ?? "").trim();
    const lastName = String(profile.lastName ?? "").trim();
    const phone = String(profile.phone ?? "").trim();

    const result = validateSignup(fullName, email, password, confirmPassword, accounts, {
      firstName,
      lastName,
      phone,
    });
    if (!result.ok) return result;

    if (isDemoAuth) {
      const account = {
        name: fullName,
        firstName,
        lastName,
        phone,
        email: normalizeEmail(email),
        password,
        role: "user",
      };
      setAccounts((currentAccounts) => [...currentAccounts, account]);
      setUser({ name: account.name, email: account.email, role: account.role });
      return { ok: true, error: null, account };
    }

    setIsLoading(true);
    try {
      const response = await apiRegister({
        name: fullName,
        first_name: firstName,
        last_name: lastName,
        email: normalizeEmail(email),
        password,
        phone,
      });
      const authenticatedUser = normalizeApiUser(response.data?.data || response.data?.user || response.data);
      if (!authenticatedUser) {
        return { ok: false, error: "The API registration response is missing the user." };
      }
      setUser(authenticatedUser);
      return { ok: true, error: null, account: authenticatedUser };
    } catch (error) {
      return { ok: false, error: error.response?.data?.message || error.message || "Registration failed." };
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = (email, password, confirmPassword) => {
    if (!isDemoAuth) {
      return { ok: false, error: "Password resets must be provided by the production API." };
    }
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


  const logout = async () => {
    try {
      if (!isDemoAuth) await apiLogout();
    } finally {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, signUp, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}
