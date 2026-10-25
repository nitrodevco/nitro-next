/** AS3 `int(String)` of a widget parameter: the leading integer, 0 for anything that is none. */
export const hotelViewInt = (value: string | undefined) => parseInt(value ?? '', 10) | 0;
