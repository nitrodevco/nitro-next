/**
 * Tells a bundle asset name from a url. A name is a flat `<component>-<file>` token - no scheme,
 * no path separator, no extension - which nothing the client passes as a url ever is
 * (`https://...`, `//images.habbo.com/...`, `/assets/...`, `data:`, `blob:`).
 */
export const isAssetName = (value: string | undefined): value is string => !!value && !/[:/.]/.test(value);
