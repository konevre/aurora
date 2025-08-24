/**
 * Wraps a promise in a try/catch block and returns the result or the error
 * @param promise - The promise to execute
 * @returns A tuple with the error or null and the result or the error
 * @example
 * const [error, result] = await tryCatch(fetch("https://api.example.com"));
 * if (error) {
 *     console.error(error);
 * } else {
 *     console.log(result);
 * }
 */
export async function tryCatch<T>(
    promise: Promise<T>
): Promise<[error: null, result: T] | [error: Error]> {
    try {
        const result = await promise;
        return [null, result];
    } catch (error) {
        return [error as Error];
    }
}

export type TryCatchResult<T> = [error: null, result: T] | [error: Error];
