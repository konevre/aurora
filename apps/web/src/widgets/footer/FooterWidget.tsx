"use client";

import { useTranslations } from "next-intl";

export function FooterWidget() {
    const t = useTranslations("FooterWidget");

    return (
        <footer className="app-header">
            <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-secondary flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="font-medium">
                    © {new Date().getFullYear()} Aurora
                </div>
                <div className="flex items-center gap-6">
                    <a
                        href="/help"
                        className="hover:text-heading transition-colors"
                    >
                        {t("help")}
                    </a>
                    <a
                        href="/changelog"
                        className="hover:text-heading transition-colors"
                    >
                        {t("changelog")}
                    </a>
                    <a
                        href="/status"
                        className="hover:text-heading transition-colors"
                    >
                        {t("status")}
                    </a>
                </div>
            </div>
        </footer>
    );
}
