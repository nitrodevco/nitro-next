export const ParseIntInRange = (
    value: string | undefined,
    min: number,
    max: number,
    fallback: number
) => {
    const parsed = Number(value);
    if (value === undefined || !Number.isInteger(parsed) || parsed < min || parsed > max) {
        return fallback;
    }
    return parsed;
}