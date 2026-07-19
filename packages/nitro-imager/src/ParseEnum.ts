export const ParseEnum = <T extends string>(
    value: string | undefined,
    enumObj: Record<string, T>,
    fallback?: T
) => {
    if (value === undefined) return fallback;
    const values = Object.values(enumObj);
    return values.includes(value as T) ? (value as T) : fallback;
}