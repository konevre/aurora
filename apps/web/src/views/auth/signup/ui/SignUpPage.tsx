"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Chrome, Github, Sparkles, UserPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useActionState, useState } from "react";

import { EmailInput } from "@/shared/components/EmailInput";
import { PasswordInput } from "@/shared/components/PasswordInput";
import { TermsCheckboxes } from "@/shared/components/TermsCheckboxes";
import { ToastNotification } from "@/shared/components/ToastNotification";
import { UsernameInput } from "@/shared/components/UsernameInput";
import { Button } from "@/shared/ui/button";
import {
    signupAction,
    type SignupFormState
} from "@/views/auth/signup/actions/signup.action";

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

const initialState: SignupFormState = {
    success: false,
    message: "",
    errors: {},
    data: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
        newsletter: true
    }
};

export function SignUpPage() {
    const [toast, setToast] = useState<string | null>(null);
    const [state, formAction, isPending] = useActionState(
        signupAction,
        initialState
    );

    const t = useTranslations("SignUpPage");

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
                    className="rounded-2xl border border-default app-card p-8"
                >
                    <motion.div
                        variants={fade(0.1)}
                        className="text-center mb-8"
                    >
                        <div className="inline-flex items-center gap-2 text-secondary mb-2">
                            <Sparkles className="h-5 w-5 text-accent" />
                            <span className="text-sm font-medium">
                                {t("join-aurora")}
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold text-logo-gradient">
                            {t("create-account")}
                        </h1>
                        <p className="text-secondary text-sm mt-2">
                            {t("start-journey")}
                        </p>
                    </motion.div>

                    <form action={formAction} className="space-y-5">
                        <AnimatePresence>
                            {state.message && (
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
                                    {state.message}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.div variants={fade(0.2)}>
                            <UsernameInput
                                placeholder={t("full-name-placeholder")}
                                name="name"
                                label={t("full-name")}
                                defaultValue={state.data?.name}
                                error={state.errors?.name?.[0]}
                            />
                        </motion.div>

                        <motion.div variants={fade(0.3)}>
                            <EmailInput
                                placeholder="you@domain.com"
                                name="email"
                                label={t("email-address")}
                                defaultValue={state.data?.email}
                                error={state.errors?.email?.[0]}
                            />
                        </motion.div>

                        <motion.div variants={fade(0.4)}>
                            <PasswordInput
                                placeholder="••••••••"
                                name="password"
                                label={t("password")}
                                error={state.errors?.password?.[0]}
                                showStrengthMeter={true}
                            />
                        </motion.div>

                        <motion.div variants={fade(0.5)}>
                            <PasswordInput
                                placeholder="••••••••"
                                name="confirmPassword"
                                label={t("confirm-password")}
                                variant="confirm"
                                error={state.errors?.confirmPassword?.[0]}
                                showStrengthMeter={false}
                            />
                        </motion.div>

                        <TermsCheckboxes
                            agreeTerms={state.data?.agreeTerms}
                            newsletter={state.data?.newsletter}
                            agreeTermsError={state.errors?.agreeTerms?.[0]}
                        />

                        <motion.div
                            variants={fade(0.7)}
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
                                {isPending
                                    ? t("creating-account")
                                    : t("create-account")}
                            </Button>
                        </motion.div>

                        <motion.div
                            variants={fade(0.8)}
                            className="relative py-4"
                        >
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-default"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="app-card-soft backdrop-blur-sm px-4 text-secondary font-medium">
                                    {t("or-register-with")}
                                </span>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={fade(0.9)}
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
                </motion.div>

                <motion.div
                    variants={fade(1.0)}
                    className="rounded-2xl border border-default app-card-soft p-6 text-center"
                >
                    <div className="text-sm text-secondary mb-4">
                        {t("already-have-account")}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <motion.div
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button size="sm" variant="social" asChild>
                                <a href="/auth/login">{t("login")}</a>
                            </Button>
                        </motion.div>
                        <motion.div
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button size="sm" variant="gradient" asChild>
                                <a href="/demo">
                                    {t("try-demo")}
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>

            <ToastNotification message={toast} />
        </>
    );
}
