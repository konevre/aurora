import type React from "react";
import { HeaderWidget } from "@/widgets/header";
import { FooterWidget } from "@/widgets/footer";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen grid grid-rows-[auto,1fr,auto] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
            <HeaderWidget />
            <main className="grid place-items-center px-6 py-12">
                {children}
            </main>
            <FooterWidget />
        </div>
    );
}
