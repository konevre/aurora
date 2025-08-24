"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

interface ToastNotificationProps {
    message?: string | null;
    isVisible?: boolean;
}

export function ToastNotification({
    message,
    isVisible = !!message
}: ToastNotificationProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 50, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 50, opacity: 0, scale: 0.9 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-xl px-6 py-4 text-sm max-w-sm mx-4"
                    style={{
                        backgroundColor: "var(--card-bg-strong)",
                        border: "1px solid var(--border-default)",
                        boxShadow: "0 30px 60px var(--shadow-card)",
                        color: "var(--heading)"
                    }}
                >
                    <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-400" />
                        {message}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
