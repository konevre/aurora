import { Request } from "express";

export function jwtFromCookie(
    cookieName: string
): (req: Request) => string | null {
    return (req: Request): string | null => {
        if (!req) return null;

        const signedToken = (req as any).signedCookies?.[cookieName];
        if (typeof signedToken === "string" && signedToken.length > 0)
            return signedToken;

        const token = (req as any).cookies?.[cookieName];
        return typeof token === "string" && token.length > 0 ? token : null;
    };
}
