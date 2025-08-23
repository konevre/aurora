"use client";

import { motion, AnimatePresence } from "framer-motion";
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
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-xl bg-slate-800/90 backdrop-blur-xl px-6 py-4 border border-slate-700/50 shadow-2xl shadow-slate-950/50 text-sm text-slate-100 max-w-sm mx-4"
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
