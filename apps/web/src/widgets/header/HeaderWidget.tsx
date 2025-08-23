"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface HeaderWidgetProps {
    showSignInLink?: boolean;
}

export function HeaderWidget({ showSignInLink = true }: HeaderWidgetProps) {
    const t = useTranslations("HeaderWidget");
    return (
        <header className="border-b border-slate-800/50 backdrop-blur-sm bg-slate-900/20">
            <div className="mx-auto max-w-6xl px-6 py-4 flex items-center gap-3">
                <motion.div
                    className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-400 via-cyan-400 to-blue-500 shadow-lg shadow-blue-500/25"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                />
                <div className="font-bold text-lg tracking-tight bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
                    AURORA
                </div>
                {showSignInLink && (
                    <div className="ml-auto text-sm text-slate-400">
                        {t("already-have-account")}
                        <a
                            className="ml-1 text-blue-400 hover:text-blue-300 transition-colors font-medium"
                            href="/auth/login"
                        >
                            {t("login")}
                        </a>
                    </div>
                )}
            </div>
        </header>
    );
}
