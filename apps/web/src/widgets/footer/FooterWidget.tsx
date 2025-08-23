"use client";

import { useTranslations } from "next-intl";

export function FooterWidget() {
    const t = useTranslations("FooterWidget");

    return (
        <footer className="border-t border-slate-800/50 backdrop-blur-sm bg-slate-900/20">
            <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="font-medium">
                    © {new Date().getFullYear()} Aurora
                </div>
                <div className="flex items-center gap-6">
                    <a
                        href="/help"
                        className="hover:text-slate-200 transition-colors"
                    >
                        {t("help")}
                    </a>
                    <a
                        href="/changelog"
                        className="hover:text-slate-200 transition-colors"
                    >
                        {t("changelog")}
                    </a>
                    <a
                        href="/status"
                        className="hover:text-slate-200 transition-colors"
                    >
                        {t("status")}
                    </a>
                </div>
            </div>
        </footer>
    );
}
