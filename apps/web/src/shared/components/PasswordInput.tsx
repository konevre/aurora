"use client";

import type React from "react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { useTranslations } from "next-intl";

interface PasswordInputProps {
    value?: string;
    defaultValue?: string;
    name?: string;
    showPassword?: boolean;
    onToggleShowPassword?: () => void;
    label: string;
    placeholder?: string;
    autoComplete?: string;
    required?: boolean;
    error?: string | null;
    isValid?: boolean;
    variant?: "password" | "confirm"; // режим работы компонента
    showStrengthMeter?: boolean; // показывать ли индикатор силы пароля
}

// Тип для внешнего управления состоянием
export type PasswordInputControlledProps = Omit<
    PasswordInputProps,
    "showPassword" | "onToggleShowPassword"
> & {
    showPassword: boolean;
    onToggleShowPassword: () => void;
};

export function PasswordInput({
    value,
    defaultValue,
    name = "password",
    showPassword: externalShowPassword,
    onToggleShowPassword: externalToggle,
    label,
    placeholder = "••••••••",
    autoComplete = "new-password",
    required = true,
    error,
    isValid = false,
    variant = "password",
    showStrengthMeter = true
}: PasswordInputProps) {
    const t = useTranslations("SignUpPage");

    const [internalShowPassword, setInternalShowPassword] = useState(false);
    const showPassword =
        externalShowPassword !== undefined
            ? externalShowPassword
            : internalShowPassword;
    const onToggleShowPassword =
        externalToggle ??
        (() => setInternalShowPassword(!internalShowPassword));

    const isConfirmMode = variant === "confirm";

    // Расчет силы пароля только для основного режима
    const passwordStrength = useMemo(() => {
        if (isConfirmMode || !value) return 0;
        let strength = 0;
        if (value.length >= 8) strength += 25;
        if (/[a-z]/.test(value)) strength += 25;
        if (/[A-Z]/.test(value)) strength += 25;
        if (/\d/.test(value)) strength += 25;
        return strength;
    }, [value, isConfirmMode]);

    const getStrengthColor = (strength: number) => {
        if (strength < 25) return "bg-red-500";
        if (strength < 50) return "bg-orange-500";
        if (strength < 75) return "bg-yellow-500";
        return "bg-emerald-500";
    };

    const getStrengthText = (strength: number) => {
        if (strength < 25) return t("weak");
        if (strength < 50) return t("medium");
        if (strength < 75) return t("good");
        return t("excellent");
    };

    const hasError = !!error;

    return (
        <div>
            <label
                htmlFor={name}
                className="block text-sm font-medium text-secondary mb-2"
            >
                {label}
            </label>
            <div className="relative group">
                <Lock className="pointer-events-none z-10 absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary group-focus-within:text-accent transition-colors" />
                <Input
                    id={name}
                    name={name}
                    value={value}
                    defaultValue={defaultValue}
                    type={showPassword ? "text" : "password"}
                    autoComplete={autoComplete}
                    variant="with-icon"
                    isValid={isValid}
                    hasError={hasError}
                    className="pr-12"
                    placeholder={placeholder}
                    required={required}
                />
                <motion.button
                    type="button"
                    onClick={onToggleShowPassword}
                    className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-heading transition-colors p-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                    ) : (
                        <Eye className="h-5 w-5" />
                    )}
                </motion.button>
            </div>

            {error && <p className="mt-1 text-sm text-error">{error}</p>}

            {/* Отображение силы пароля только для основного режима */}
            {showStrengthMeter && value && !isConfirmMode && (
                <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                        <div
                            className="flex-1 h-1.5 rounded-full overflow-hidden"
                            style={{ backgroundColor: "var(--progress-bg)" }}
                        >
                            <motion.div
                                className={`h-full transition-all duration-300 ${getStrengthColor(passwordStrength)}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${passwordStrength}%` }}
                            />
                        </div>
                        <span className="text-xs text-secondary">
                            {getStrengthText(passwordStrength)}
                        </span>
                    </div>
                    <div className="text-xs text-secondary">
                        {t("password-strength-description")}
                    </div>
                </div>
            )}
        </div>
    );
}
