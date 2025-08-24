"use server";

import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { z } from "zod";

import { request, tryCatch } from "@/shared/api";

async function createSigninSchema() {
    const t = await getTranslations("ValidationErrors");

    return z.object({
        emailOrUsername: z
            .string()
            .min(2, { message: t("email-or-username-required") })
            .max(50, { message: t("email-or-username-too-long") }),
        password: z
            .string()
            .min(8, { message: t("password-too-short") })
            .regex(/(?=.*[a-z])/, { message: t("password-lowercase") })
            .regex(/(?=.*[A-Z])/, { message: t("password-uppercase") })
            .regex(/(?=.*\d)/, { message: t("password-number") })
    });
}

export type SigninFormData = {
    emailOrUsername: string;
    password: string;
};

export type SigninFormState = {
    success?: boolean;
    message?: string;
    errors?: {
        emailOrUsername?: string[];
        password?: string[];
    };
    data?: SigninFormData;
};

export async function signinAction(
    prevState: SigninFormState,
    formData: FormData
): Promise<SigninFormState> {
    const t = await getTranslations("ValidationErrors");

    try {
        const rawData = {
            emailOrUsername: formData.get("emailOrUsername") as string,
            password: formData.get("password") as string
        };

        const signinSchema = await createSigninSchema();
        const validatedData = signinSchema.safeParse(rawData);

        if (!validatedData.success) {
            const flattened = z.flattenError(validatedData.error);
            const errors = flattened.fieldErrors;
            return {
                success: false,
                message: t("form-errors"),
                errors,
                data: rawData
            };
        }

        const [error] = await tryCatch(
            request.post("/api/auth/signin", {
                json: validatedData.data
            })
        );

        if (error) {
            return {
                success: false,
                message: t(error.message),
                errors: {},
                data: prevState.data
            };
        }
    } catch (error) {
        console.error(
            `❌: Sign In action error: ${error instanceof Error ? error.message : "Unknown error"}`
        );

        return {
            success: false,
            message: t("signin-error"),
            errors: {},
            data: prevState.data
        };
    }

    // Can't place in try/catch because internally it throws an error
    redirect("/auth/signin/success");
}
