import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:[box-shadow:0_0_0_3px_var(--ring)] aria-invalid:[box-shadow:0_0_0_3px_color-mix(in_oklab,var(--destructive)_20%,transparent)]",
    {
        variants: {
            variant: {
                default:
                    "bg-[var(--primary)] text-[color:var(--primary-foreground)] shadow-sm hover:opacity-90",
                gradient: "btn-gradient",
                social: "btn-social"
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
