/**
 * The variants a theme component hands down to the components inside it, by their cascade keys -
 * a Flash window layout naming its children's `style`s (`theme-variants.json`'s `cascade`).
 */
export type VariantCascadeMap = Partial<Record<string, string>>;
