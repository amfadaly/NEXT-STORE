import "./globals.css";
import { ThemeProvider } from "./src/components/ThemeProvider";
import { Providers } from "./src/redux/Providers";
import Navbar from "./src/components/Navbar";
import Footer from "./src/components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-950 text-black dark:text-white transition-colors duration-300">
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
