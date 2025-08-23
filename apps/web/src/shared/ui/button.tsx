import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
                gradient:
                    "h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none",
                social: "h-11 rounded-xl border border-slate-600/50 bg-slate-700/20 hover:bg-slate-700/40 backdrop-blur-sm text-slate-300 hover:text-slate-100 hover:border-slate-500/50"
            },
            size: {
                default: "h-11 w-full px-4 py-2 has-[>svg]:px-3",
                sm: "h-10 w-full px-4 py-2 has-[>svg]:px-3",
                lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
                xl: "h-12 w-full px-6 has-[>svg]:px-4",
                icon: "size-9"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    }
);

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    } & Record<string, any>) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

export { Button, buttonVariants };
