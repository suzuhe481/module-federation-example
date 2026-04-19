import { create } from "zustand";
import type { UserRole } from "@/constants/lists";
import { mockUser, mockProfile, mockRole } from "@/data/mockData";

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Profile {
  first_name: string;
  last_name: string | null;
}

interface AuthStore {
  user: User | null;
  profile: Profile | null;
  role: UserRole | null;
  isLoading: boolean;
  setAuth: (
    user: User | null,
    profile: Profile | null,
    role: UserRole | null,
  ) => void;
  setProfile: (profile: Profile | null) => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: mockUser,
  profile: mockProfile,
  role: mockRole,
  isLoading: false,
  setAuth: (user, profile, role) =>
    set({ user, profile, role, isLoading: false }),
  setProfile: (profile) => set({ profile }),
}));
