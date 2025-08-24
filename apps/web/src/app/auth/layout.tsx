import { PropsWithChildren } from "react";
import { HeaderWidget } from "@/widgets/header";
import { FooterWidget } from "@/widgets/footer";

export default function AuthLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen grid grid-rows-[auto,1fr,auto] app-bg-gradient">
            <HeaderWidget />
            <main className="grid place-items-center px-6 py-12">
                {children}
            </main>
            <FooterWidget />
        </div>
    );
}
