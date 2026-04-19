import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/Navbar/Navbar";
import { ProfilePage } from "@/pages/ProfilePage";

export default function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <Navbar />
      <ProfilePage />
    </ThemeProvider>
  );
}
