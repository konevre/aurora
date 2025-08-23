import * as React from "react";

import { cn } from "@/shared/lib";

interface CustomInputProps extends React.ComponentProps<"input"> {
    isValid?: boolean;
    hasError?: boolean;
    variant?: "default" | "with-icon";
}

function Input({
    className,
    type,
    isValid,
    hasError,
    variant = "default",
    ...props
}: CustomInputProps) {
    const baseStyles =
        variant === "with-icon"
            ? "w-full rounded-xl app-input pl-11 pr-4 py-3.5 outline-none placeholder:text-secondary transition-all duration-200 backdrop-blur-sm"
            : "w-full rounded-xl app-input px-4 py-3.5 outline-none placeholder:text-secondary transition-all duration-200 backdrop-blur-sm";

    const focusStyles =
        "focus:[box-shadow:0_0_0_3px_var(--ring)] focus:border-[color:var(--border-focus)]";

    const validationStyles = cn(
        isValid ? "border-[color:rgba(52,211,153,0.5)]" : "",
        hasError ? "border-error" : ""
    );

    return (
        <input
            type={type}
            data-slot="input"
            className={cn(baseStyles, focusStyles, validationStyles, className)}
            {...props}
        />
    );
}

export { Input };
