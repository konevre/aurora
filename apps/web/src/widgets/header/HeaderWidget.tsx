"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/shared/components";

interface HeaderWidgetProps {
    showSignInLink?: boolean;
}

export function HeaderWidget({ showSignInLink = true }: HeaderWidgetProps) {
    const t = useTranslations("HeaderWidget");
    return (
        <header className="app-header">
            <div className="mx-auto max-w-6xl px-6 py-4 flex items-center gap-3">
                <motion.div
                    className="h-8 w-8 rounded-lg logo-gradient shadow-lg shadow-button"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                />
                <div className="font-bold text-lg tracking-tight text-logo-gradient">
                    AURORA
                </div>
                <div className="ml-auto flex items-center gap-3">
                    {showSignInLink && (
                        <div className="text-sm text-secondary">
                            {t("already-have-account")}
                            <a
                                className="ml-1 text-accent hover:text-accent transition-colors font-medium"
                                href="/auth/login"
                            >
                                {t("login")}
                            </a>
                        </div>
                    )}
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
