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
            ? "w-full rounded-xl bg-slate-700/30 border border-slate-600/50 pl-11 pr-4 py-3.5 outline-none placeholder:text-slate-500 transition-all duration-200 backdrop-blur-sm"
            : "w-full rounded-xl bg-slate-700/30 border border-slate-600/50 px-4 py-3.5 outline-none placeholder:text-slate-500 transition-all duration-200 backdrop-blur-sm";

    const focusStyles =
        "focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 focus:bg-slate-700/50";

    const validationStyles = cn(
        isValid ? "border-emerald-400/50" : "",
        hasError ? "border-red-400/50" : ""
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
