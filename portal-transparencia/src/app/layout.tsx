import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, ChartColumnIncreasing, FileChartColumnIncreasing, Book } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import NavItem from "@/components/nav-item";
import { SidebarProvider,SidebarTrigger  } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { cookies } from "next/headers";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portal da Transparência - RO",
  description: "Dashboard dos dados abertos de RO",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "false"
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-row justify-items-center m-4 sm:hidden">
            <Sheet >
              <SheetTrigger className="sm:hidden">
                <Menu/>
              </SheetTrigger>
              <SheetContent className="w-[300px] " side="left">
                <SheetHeader>
                  <SheetTitle>MENU</SheetTitle>
                  <SheetDescription>
                    Navegue entre as opções.
                  </SheetDescription>
                </SheetHeader>
                <NavItem href= "/">
                  <ChartColumnIncreasing /> Dashboard
                </NavItem>
                <NavItem href= "/relatorio">
                  <FileChartColumnIncreasing /> Relatórios
                </NavItem>
                <NavItem href= "/sobre" >
                  <Book /> Documentação
                </NavItem>

              </SheetContent>
            </Sheet>
    
          </div>
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar/>
            <main className="flex-1 w-full h-full">
              <div className="hidden sm:inline">
                <SidebarTrigger size={"lg"} className="mx-2"/>
              </div>
              <div className="absolute top-4 right-4 inline">
                <ThemeToggle />
              </div>

              {children}
            </main>
          </SidebarProvider>

        </ThemeProvider>
      </body>
    </html>
  );
}
