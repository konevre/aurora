import { getRequestConfig } from "next-intl/server";

type MessagesDictionary = Record<string, string>;

export default getRequestConfig(async () => {
    const locale = "en";

    const messagesModule: unknown = await import(
        `../../messages/${locale}.json`
    );
    const messages = (messagesModule as { default: MessagesDictionary })
        .default;

    return {
        locale,
        messages
    };
});
