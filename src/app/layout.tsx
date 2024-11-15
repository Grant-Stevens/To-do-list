import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import Header from "./components/header/header";
import { AuthProvider } from "./context/authContext";
import { UserProvider } from "./context/userContext";
import { TaskProvider } from "./context/taskContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "To-do list",
  description: "Created by Grant Stevens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <UserProvider>
            <TaskProvider>
              <Header />
              {children}
              <footer></footer>
            </TaskProvider>
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
