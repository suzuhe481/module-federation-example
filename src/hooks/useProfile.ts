import { useAuthStore } from "@/stores/useAuthStore";

export function useProfile() {
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const isLoading = useAuthStore((s) => s.isLoading);

  const firstName = profile?.first_name ?? "User";
  const lastName = profile?.last_name ?? "";

  const fullName = profile
    ? [firstName, lastName].filter(Boolean).join(" ")
    : (user?.email ?? "");

  return {
    isLoading,
    isSignedIn: !!user,
    email: user?.email,
    firstName,
    lastName,
    fullName,
  };
}
