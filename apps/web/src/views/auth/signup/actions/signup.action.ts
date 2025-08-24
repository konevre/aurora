"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

async function createSignupSchema() {
    const t = await getTranslations("ValidationErrors");

    return z
        .object({
            name: z
                .string()
                .min(2, { message: t("name-required") })
                .max(50, { message: t("name-too-long") }),
            email: z.email({ message: t("invalid-email") }),
            password: z
                .string()
                .min(8, { message: t("password-too-short") })
                .regex(/(?=.*[a-z])/, { message: t("password-lowercase") })
                .regex(/(?=.*[A-Z])/, { message: t("password-uppercase") })
                .regex(/(?=.*\d)/, { message: t("password-number") }),
            confirmPassword: z
                .string()
                .min(1, { message: t("confirm-password-required") }),
            agreeTerms: z.boolean().refine((val) => val === true, {
                message: t("agree-terms-required")
            }),
            newsletter: z.boolean().optional()
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: t("passwords-not-match"),
            path: ["confirmPassword"]
        });
}

export type SignupFormData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeTerms: boolean;
    newsletter?: boolean;
};

export type SignupFormState = {
    success?: boolean;
    message?: string;
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
        agreeTerms?: string[];
    };
    data?: SignupFormData;
};

export async function signupAction(
    prevState: SignupFormState,
    formData: FormData
): Promise<SignupFormState> {
    const t = await getTranslations("ValidationErrors");

    try {
        const rawData = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            confirmPassword: formData.get("confirmPassword") as string,
            agreeTerms: formData.get("agreeTerms") === "on",
            newsletter: formData.get("newsletter") === "on"
        };

        const signupSchema = await createSignupSchema();
        const validatedData = signupSchema.safeParse(rawData);

        console.log("\n\nVALIDATION ", validatedData);

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

        // TODO: Handle success
        console.log("Регистрация пользователя:", {
            name: validatedData.data.name,
            email: validatedData.data.email,
            newsletter: validatedData.data.newsletter
        });

        await new Promise((resolve) => setTimeout(resolve, 1000));

        redirect("/auth/signup/success");
    } catch (error) {
        console.error("Ошибка при регистрации:", error);

        return {
            success: false,
            message: t("signup-error"),
            errors: {},
            data: prevState.data
        };
    }
}
