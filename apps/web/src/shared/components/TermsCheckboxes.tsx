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
                        className="mt-0.5 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 data-[state=checked]:text-white"
                    />
                    <Label
                        htmlFor="agreeTerms"
                        className="text-sm flex-wrap text-slate-300 cursor-pointer leading-relaxed hover:text-slate-200 transition-colors"
                    >
                        {t("i-accept")}{" "}
                        <a
                            href="/legal/terms"
                            className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                        >
                            {t("terms-of-use")}
                        </a>{" "}
                        {t("and")}{" "}
                        <a
                            href="/legal/privacy"
                            className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                        >
                            {t("privacy-policy")}
                        </a>
                    </Label>
                </div>
                {agreeTermsError && (
                    <p className="text-sm text-red-400 ml-7">
                        {agreeTermsError}
                    </p>
                )}
            </div>

            <div className="flex items-start gap-3">
                <Checkbox
                    id="newsletter"
                    name="newsletter"
                    defaultChecked={newsletter}
                    className="mt-0.5 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 data-[state=checked]:text-white"
                />
                <Label
                    htmlFor="newsletter"
                    className="text-sm text-slate-300 cursor-pointer hover:text-slate-200 transition-colors"
                >
                    {t("receive-news")}
                </Label>
            </div>
        </motion.div>
    );
}
