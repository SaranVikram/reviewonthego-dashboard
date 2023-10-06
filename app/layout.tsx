import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import LayoutProvider from "@/components/LayoutProvider";
import { UiContextProvider } from "@/contexts/UiContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UiContextProvider>
      <LayoutProvider>{children}</LayoutProvider>
    </UiContextProvider>
  );
}
