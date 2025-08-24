"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Chrome, Github, Sparkles, UserPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useActionState, useState } from "react";

import { PasswordInput } from "@/shared/components/PasswordInput";
import { ToastNotification } from "@/shared/components/ToastNotification";
import { UsernameInput } from "@/shared/components/UsernameInput";
import { Button } from "@/shared/ui/button";
import {
    signinAction,
    type SigninFormState
} from "@/views/auth/signin/actions/signin.action";

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

const stagger = {
    show: {
        transition: {
            staggerChildren: 0.08
        }
    }
};

const initialState: SigninFormState = {
    success: false,
    message: "",
    errors: {},
    data: {
        emailOrUsername: "",
        password: ""
    }
};

export function SignInPage() {
    const [toast, setToast] = useState<string | null>(null);
    const [state, formAction, isPending] = useActionState(
        signinAction,
        initialState
    );

    const t = useTranslations("SignInPage");

    function social(provider: "github" | "google") {
        setToast(
            `${t("registering-with")} ${provider === "github" ? "GitHub" : "Google"}…`
        );
    }

    return (
        <>
            <motion.div
                variants={stagger}
                initial="hidden"
                animate="show"
                className="w-full max-w-md space-y-6"
            >
                <motion.div
                    variants={fade(0)}
                    className="rounded-2xl border border-default app-card p-8 space-y-5"
                >
                    <motion.div
                        variants={fade(0.1)}
                        className="text-center mb-8"
                    >
                        <div className="inline-flex items-center gap-2 text-secondary mb-2">
                            <Sparkles className="h-5 w-5 text-accent" />
                            <span className="text-sm font-medium">
                                {t("sign-in-to-aurora")}
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold text-logo-gradient">
                            {t("welcome")}
                        </h1>
                    </motion.div>

                    <form action={formAction} className="space-y-5">
                        <AnimatePresence>
                            {state?.message && (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: -10,
                                        scale: 0.95
                                    }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    className="rounded-xl px-4 py-3 text-sm backdrop-blur-sm"
                                    style={{
                                        backgroundColor: "var(--error-bg)",
                                        border: "1px solid var(--border-error)",
                                        color: "var(--text-error)"
                                    }}
                                >
                                    {state?.message}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.div variants={fade(0.2)}>
                            <UsernameInput
                                placeholder={t("email-or-username-placeholder")}
                                name="emailOrUsername"
                                label={t("email-or-username")}
                                defaultValue={state?.data?.emailOrUsername}
                                error={state?.errors?.emailOrUsername?.[0]}
                            />
                        </motion.div>
                        <motion.div variants={fade(0.4)}>
                            <PasswordInput
                                placeholder="••••••••"
                                name="password"
                                label={t("password")}
                                error={state?.errors?.password?.[0]}
                                showStrengthMeter={true}
                            />
                        </motion.div>

                        <motion.div
                            variants={fade(0.6)}
                            whileHover={{ y: -1 }}
                            whileTap={{ y: 0 }}
                        >
                            <Button
                                variant="gradient"
                                size="xl"
                                type="submit"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{
                                            duration: 1,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: "linear"
                                        }}
                                        className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full"
                                    />
                                ) : (
                                    <UserPlus className="h-5 w-5" />
                                )}
                                {isPending ? t("signing-in") : t("sign-in")}
                            </Button>
                        </motion.div>

                        <motion.div
                            variants={fade(0.7)}
                            className="relative py-4"
                        >
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-default"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="app-card-soft backdrop-blur-sm px-4 text-secondary font-medium">
                                    {t("or-continue-with")}
                                </span>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={fade(0.8)}
                            className="grid grid-cols-2 gap-3"
                        >
                            <motion.div
                                whileHover={{ y: -1 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    className="w-full"
                                    variant="social"
                                    type="button"
                                    onClick={() => social("google")}
                                >
                                    <Chrome className="h-4 w-4" />
                                    Google
                                </Button>
                            </motion.div>
                            <motion.div
                                whileHover={{ y: -1 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    className="w-full"
                                    variant="social"
                                    type="button"
                                    onClick={() => social("github")}
                                >
                                    <Github className="h-4 w-4" />
                                    GitHub
                                </Button>
                            </motion.div>
                        </motion.div>
                    </form>
                    <motion.div
                        variants={fade(0.8)}
                        className="text-xs text-center flex-wrap text-secondary leading-relaxed transition-colors"
                    >
                        {t("by-signing-in")}{" "}
                        <a
                            className="text-accent hover:text-accent underline underline-offset-2"
                            href="/legal/terms"
                        >
                            {t("terms-of-use")}
                        </a>{" "}
                        {t("and")}{" "}
                        <a
                            className="text-accent hover:text-accent underline underline-offset-2"
                            href="/legal/privacy"
                        >
                            {t("privacy-policy")}
                        </a>
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={fade(1.0)}
                    className="rounded-2xl border border-default app-card-soft p-6 text-center"
                >
                    <div className="text-sm text-secondary mb-4">
                        {t("no-account")}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <motion.div
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button size="sm" variant="social" asChild>
                                <a href="/auth/signup">{t("sign-up")}</a>
                            </Button>
                        </motion.div>
                        <motion.div
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button size="sm" variant="gradient" asChild>
                                <a href="/demo">{t("try-demo")}</a>
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>

            <ToastNotification message={toast} />
        </>
    );
}
