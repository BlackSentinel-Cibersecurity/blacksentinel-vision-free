import { create } from "zustand";

interface User {
  username: string;
  role: string;
  name: string;
  email: string;
  permissions: string[];
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  checkAuth: () => boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  login: (token, user) => {
    localStorage.setItem("bsv_auth", JSON.stringify({
      token,
      user,
      expires: Date.now() + 24 * 60 * 60 * 1000,
    }));
    set({ isAuthenticated: true, user, token });
  },
  logout: () => {
    localStorage.removeItem("bsv_auth");
    set({ isAuthenticated: false, user: null, token: null });
    window.location.href = "/login";
  },
  checkAuth: () => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("bsv_auth");
    if (!stored) return false;
    try {
      const auth = JSON.parse(stored);
      if (auth.expires < Date.now()) {
        localStorage.removeItem("bsv_auth");
        return false;
      }
      set({ isAuthenticated: true, user: auth.user, token: auth.token });
      return true;
    } catch {
      localStorage.removeItem("bsv_auth");
      return false;
    }
  },
}));
