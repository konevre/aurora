"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";

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
        console.log("Вход пользователя:", {
            emailOrUsername: validatedData.data.emailOrUsername
        });

        await new Promise((resolve) => setTimeout(resolve, 1000));

        redirect("/auth/signin/success");
    } catch (error) {
        console.error("Ошибка при входе:", error);

        return {
            success: false,
            message: t("signin-error"),
            errors: {},
            data: prevState.data
        };
    }
}
