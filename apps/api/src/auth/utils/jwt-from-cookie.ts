import type { Request } from "express";

export function jwtFromCookie(cookieName: string) {
    return (req: Request): string | null => {
        if (!req) return null;

        const signed: string | undefined = (
            req.signedCookies as Record<string, string> | undefined
        )?.[cookieName];
        if (signed && signed.length > 0) return signed;

        const raw: string | undefined = (
            req.cookies as Record<string, string> | undefined
        )?.[cookieName];
        return raw && raw.length > 0 ? raw : null;
    };
}
