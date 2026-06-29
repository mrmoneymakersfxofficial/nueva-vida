"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Preloader from "@/components/Preloader";
import type { SanitySiteSettings } from "@/lib/sanity.client";

export default function LayoutShell({ children, siteSettings }: { children: React.ReactNode; siteSettings: SanitySiteSettings | null }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  if (isAdmin) return <>{children}</>;
  return (
    <>
      <Preloader />
      <div className="min-h-screen flex flex-col bg-white">
        <Header siteSettings={siteSettings} />
        <main className="flex-1">{children}</main>
        <Footer siteSettings={siteSettings} />
        <WhatsAppButton />
      </div>
    </>
  );
}
