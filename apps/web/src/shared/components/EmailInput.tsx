"use client";

import type React from "react";
import { Mail } from "lucide-react";
import { Input } from "@/shared/ui/input";

interface EmailInputProps {
    value?: string;
    defaultValue?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    autoComplete?: string;
    required?: boolean;
    error?: string | null;
    isValid?: boolean;
}

export function EmailInput({
    value,
    defaultValue,
    name = "email",
    label = "Email адрес",
    placeholder = "you@domain.com",
    autoComplete = "email",
    required = true,
    error,
    isValid = false
}: EmailInputProps) {
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
                <Mail className="pointer-events-none z-10 absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary group-focus-within:text-accent transition-colors" />
                <Input
                    id={name}
                    name={name}
                    value={value}
                    defaultValue={defaultValue}
                    type="email"
                    autoComplete={autoComplete}
                    variant="with-icon"
                    isValid={isValid}
                    hasError={hasError}
                    placeholder={placeholder}
                    required={required}
                />
            </div>
            {error && <p className="mt-1 text-sm text-error">{error}</p>}
        </div>
    );
}
