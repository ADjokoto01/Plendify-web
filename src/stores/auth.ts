// import { jwtDecode } from 'jwt-decode';
import { User } from "@/types";
import { jwtDecode } from "jwt-decode";
import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  token?: string | null;
  user?: User | null;
  isAuthenticated: boolean;
  redirect?: string;
  loginUrl: string;
};

type Actions = {
  /** reset auth store to initial state */
  reset: () => void;
  /**
   * authenticate user
   * @param {Object} details - object containing user object and token
   */
  // authenticate: (details: { token: string; loginUrl?: string }) => void;
  authenticate: (details: any) => void;
  setRedirect: (redirect: string) => void;
  getToken: () => State["token"];
  setToken: (newToken: string) => void;
  logout: () => void;
  setUser: (newUser: User) => void;
};

const initialState: State = {
  token: null,
  isAuthenticated: false,
  user: null,
  loginUrl: "/auth/login",
};

const authStore: StateCreator<State & Actions> = (set, get) => ({
  ...initialState,
  reset: () => set(initialState),
  authenticate: ({ token, loginUrl = "/auth/login" }) => {
    const user: User = jwtDecode(token);
    set({
      user,
      token,
      isAuthenticated: true,
      loginUrl,
    });
  },
  logout: () => set({ isAuthenticated: false, user: null, token: null }),
  setRedirect: (redirect: string) => set({ redirect }),
  getToken: () => get().token,
  setToken: (newToken: string) => set({ token: newToken }),
  setUser: (newUser: User) => set({ user: newUser }),
});

const useAuthStore = create(
  persist(authStore, { name: "plendify-web-auth-store" })
);

export { useAuthStore };
