import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import { HamburgerButton } from "@/components/HamburgerButton/HamburgerButton";
import { AnimatedLink } from "@/components/AnimatedLink/AnimatedLink";
import { Button } from "@/components/ui/button";
import { UserProfileIcon } from "@/assets/icons/uiIcons";
import {
  SunMoonIcon,
  type AnimationState,
} from "@/assets/animatedIcons/SunMoonIcon";
import { useProfile } from "@/hooks/useProfile";
import { useHasMounted } from "@/hooks/useHasMounted";

const menuItems = [
  { label: "Log in", href: "/login", cta: false },
  { label: "Sign up", href: "/signup", cta: true },
];

const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();
  const hasMounted = useHasMounted();
  const [pendingTransition, setPendingTransition] = useState<
    "moon-to-sun" | "sun-to-moon" | null
  >(null);

  const animationState: AnimationState =
    pendingTransition ?? (theme === "dark" ? "moon-idle" : "sun-idle");

  const handleToggle = () => {
    if (animationState === "moon-idle" || animationState === "sun-to-moon") {
      setTheme("light");
      setPendingTransition("moon-to-sun");
    } else {
      setTheme("dark");
      setPendingTransition("sun-to-moon");
    }
  };

  const handleAnimationComplete = (variant: string) => {
    if (variant === "moon-to-sun" || variant === "sun-to-moon") {
      setPendingTransition(null);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-md text-text-muted hover:text-text-base bg-surface-3/30 hover:bg-surface-3/50 transition-colors duration-200 cursor-pointer"
      aria-label="Toggle theme"
    >
      {hasMounted ? (
        <SunMoonIcon
          animationState={animationState}
          onAnimationComplete={handleAnimationComplete}
          className="size-6"
        />
      ) : (
        <div className="size-6" aria-hidden="true" />
      )}
    </button>
  );
};

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const profileContainerRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLUListElement>(null);
  const hamburgerContainerRef = useRef<HTMLDivElement>(null);

  const { isLoading, isSignedIn, email, fullName } = useProfile();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
      setProfileOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!profileOpen) return;

    const controller = new AbortController();

    document.addEventListener(
      "mousedown",
      (event) => {
        const target = event.target as Node;
        if (profileContainerRef.current?.contains(target)) return;
        setProfileOpen(false);
      },
      { signal: controller.signal },
    );

    return () => controller.abort();
  }, [profileOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const controller = new AbortController();

    document.addEventListener(
      "mousedown",
      (event) => {
        const target = event.target as Node;
        if (mobileMenuRef.current?.contains(target)) return;
        if (hamburgerContainerRef.current?.contains(target)) return;
        setMenuOpen(false);
      },
      { signal: controller.signal },
    );

    return () => controller.abort();
  }, [menuOpen]);

  function handleLogout() {
    setIsLoggingOut(true);
    setProfileOpen(false);
    console.log("logout");
    setIsLoggingOut(false);
  }

  return (
    <header className="relative z-50 w-full flex justify-center bg-surface-2">
      <nav className="flex flex-row justify-between items-center w-full max-w-6xl px-4 py-2 text-text-base transition-colors duration-300">
        {/* Right side: Theme toggle + Profile + Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          {/* Theme toggle */}
          <ThemeToggleButton />

          {/* Profile button (logged in, desktop) */}
          {!isLoading && isSignedIn && (
            <div className="relative hidden sm:block" ref={profileContainerRef}>
              <button
                onClick={() => setProfileOpen((prev) => !prev)}
                className="p-2 rounded-md text-primary hover:bg-surface-3/15 transition-colors duration-200 cursor-pointer"
                aria-label="Profile"
                aria-expanded={profileOpen}
              >
                <UserProfileIcon className="size-5" />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -4 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 top-full mt-2 w-52 rounded-lg border border-surface-3/25 bg-surface-1 overflow-hidden z-100"
                    style={{
                      boxShadow:
                        "0 4px 24px oklch(0 0 0 / 0.4), 0 0 0 1px oklch(1 0 0 / 0.03)",
                    }}
                  >
                    <a
                      href="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-3 border-b border-surface-3/20 hover:bg-surface-3/25 transition-colors duration-150 cursor-pointer"
                    >
                      <p className="text-sm text-text-base font-primary truncate">
                        {fullName}
                      </p>
                      <p className="text-xs text-text-muted font-primary truncate">
                        {email}
                      </p>
                    </a>
                    <div className="py-1 w-full">
                      <a
                        href="/dashboard"
                        className="block w-full px-4 py-2.5 text-left text-sm text-text-base font-primary hover:bg-surface-3/25 transition-colors duration-150 cursor-pointer"
                      >
                        Dashboard
                      </a>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full px-4 py-2.5 text-left text-sm text-text-base font-primary hover:bg-surface-3/25 transition-colors duration-150 cursor-pointer"
                      >
                        Log out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Desktop menu items for unauthenticated users */}
          {!isLoading && !isSignedIn && !isLoggingOut && (
            <ul className="hidden sm:flex items-center gap-4 pl-4">
              {menuItems.map((item) =>
                item.cta ? (
                  <li key={item.label}>
                    <Button
                      asChild
                      size="sm"
                      className="font-title text-sm text-black"
                    >
                      <a href={item.href}>{item.label}</a>
                    </Button>
                  </li>
                ) : (
                  <li key={item.label} className="text-xl font-title">
                    <AnimatedLink href={item.href} label={item.label} />
                  </li>
                ),
              )}
            </ul>
          )}

          {/* Hamburger menu: Small screens only */}
          <div className="flex sm:hidden" ref={hamburgerContainerRef}>
            <HamburgerButton
              menuOpen={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
            />
          </div>
        </div>
      </nav>

      {/* Mobile Links */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            ref={mobileMenuRef}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="sm:hidden overflow-hidden bg-surface-2 font-title absolute left-0 right-0 top-full z-40 border-b border-surface-3/25"
          >
            {!isLoading &&
              !isSignedIn &&
              !isLoggingOut &&
              menuItems.map((item) => (
                <li
                  key={item.label}
                  className="text-xl text-text-base font-title p-4 border-b border-surface-3/10 last:border-b-0"
                >
                  <AnimatedLink href={item.href} label={item.label} />
                </li>
              ))}
            {!isLoading && isSignedIn && (
              <>
                <li className="border-b border-surface-3/10">
                  <a
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 hover:bg-surface-3/25 transition-colors duration-150 cursor-pointer"
                  >
                    <p className="text-sm text-text-base font-primary truncate">
                      {fullName}
                    </p>
                    <p className="text-xs text-text-muted font-primary truncate">
                      {email}
                    </p>
                  </a>
                </li>
                <li className="text-xl text-text-base font-title p-4">
                  <a
                    href="/dashboard"
                    className="block text-left font-title text-xl text-text-base cursor-pointer"
                  >
                    Dashboard
                  </a>
                </li>
                <li className="text-xl text-text-base font-title p-4 w-full">
                  <button
                    onClick={handleLogout}
                    className="text-left font-title text-xl text-text-base cursor-pointer w-full"
                  >
                    Log out
                  </button>
                </li>
              </>
            )}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Bottom accent border */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary z-51 pointer-events-none" />
    </header>
  );
};
