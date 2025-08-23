"use client";

import type React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/shared/ui/checkbox";
import { Label } from "@/shared/ui/label";

interface TermsCheckboxesProps {
    agreeTerms?: boolean;
    newsletter?: boolean;
    agreeTermsError?: string | null;
}

const fade = (d = 0) => ({
    hidden: { opacity: 0, y: 12, scale: 0.98 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.4,
            delay: d,
            type: "spring" as const,
            stiffness: 300,
            damping: 30
        }
    }
});

export function TermsCheckboxes({
    agreeTerms = false,
    newsletter = true,
    agreeTermsError
}: TermsCheckboxesProps) {
    const t = useTranslations("SignUpPage");

    return (
        <motion.div variants={fade(0.6)} className="space-y-4">
            <div className="space-y-2">
                <div className="flex items-start gap-3">
                    <Checkbox
                        id="agreeTerms"
                        name="agreeTerms"
                        defaultChecked={agreeTerms}
                        className="mt-0.5 data-[state=checked]:bg-[var(--primary)] data-[state=checked]:border-[var(--primary)] data-[state=checked]:text-white"
                    />
                    <Label
                        htmlFor="agreeTerms"
                        className="text-sm flex-wrap text-secondary cursor-pointer leading-relaxed hover:text-heading transition-colors"
                    >
                        {t("i-accept")}{" "}
                        <a
                            href="/legal/terms"
                            className="text-accent hover:text-accent underline underline-offset-2"
                        >
                            {t("terms-of-use")}
                        </a>{" "}
                        {t("and")}{" "}
                        <a
                            href="/legal/privacy"
                            className="text-accent hover:text-accent underline underline-offset-2"
                        >
                            {t("privacy-policy")}
                        </a>
                    </Label>
                </div>
                {agreeTermsError && (
                    <p className="text-sm text-error ml-7">{agreeTermsError}</p>
                )}
            </div>

            <div className="flex items-start gap-3">
                <Checkbox
                    id="newsletter"
                    name="newsletter"
                    defaultChecked={newsletter}
                    className="mt-0.5 data-[state=checked]:bg-[var(--primary)] data-[state=checked]:border-[var(--primary)] data-[state=checked]:text-white"
                />
                <Label
                    htmlFor="newsletter"
                    className="text-sm text-secondary cursor-pointer hover:text-heading transition-colors"
                >
                    {t("receive-news")}
                </Label>
            </div>
        </motion.div>
    );
}
