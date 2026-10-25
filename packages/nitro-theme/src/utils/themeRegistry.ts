/**
 * The theme every themed component reads its variant from - `theme-variants.json`, registered
 * once by `preloadThemeAssets` (or by Nitro Studio's preview, with its edits over it).
 */
import type { VariantCascadeMap } from '../cascade/VariantCascadeMap';
import type { SpriteFrame } from './spriteFrame';
import type { AnyThemeVariant, ThemeVariants } from './ThemeVariant';

/**
 * `theme-variants.json`, as the window manager library's bundle carries it: every variant of every theme component,
 * what each cascades to its children, and the icon set's rects. Nitro Studio builds it from the
 * client release's window manager library - each variant from its row in the element description,
 * the window layout that row names and its skin - with the port's rules over it, and packs it beside
 * the sprites its texture keys name (`server/theme/clientTheme.ts` there).
 */
export interface ThemeVariantsData {
    version: 1;
    /** By cascade key (`frame`, `closeButton`), then variant id - the Flash `style`. */
    variants: Record<string, ThemeVariants<AnyThemeVariant>>;
    /** By cascade key, then variant id: the variant each child cascade key takes under it. */
    cascade: Record<string, Record<string, VariantCascadeMap>>;
    /** `<icon style="N">`'s rect in the `icon-set-src` sheet, by style (`habbo_skin_icon_set_xml`). */
    icons?: Record<string, SpriteFrame>;
    /** Texture keys drawn from a sprite of another name - a hotel's own art standing in for the client's. */
    textures?: Record<string, string>;
}

const EMPTY: ThemeVariants<AnyThemeVariant> = {};

let theme: ThemeVariantsData = { version: 1, variants: {}, cascade: {} };

/** The theme the chrome draws. Set once by `preloadThemeAssets`, before anything renders; the studio's preview sets its edits. */
export const registerThemeVariants = (data: ThemeVariantsData): void => {
    theme = data;
};

/** The whole theme as registered - for a tool drawing its own changes over it (Nitro Studio's preview). */
export const themeVariantsData = (): ThemeVariantsData => theme;

/** Every variant of one theme component, by variant id; empty until the theme has loaded (`preloadThemeAssets`). */
export const themeVariantsOf = <T extends AnyThemeVariant>(cascadeKey: string): ThemeVariants<T> => (theme.variants[cascadeKey] ?? EMPTY) as ThemeVariants<T>;

/** One variant of one theme component, or `undefined` when the theme has no such variant. */
export const themeVariantOf = <T extends AnyThemeVariant>(cascadeKey: string, variant: string): T | undefined => themeVariantsOf<T>(cascadeKey)[variant];

/** What a variant cascades to its children, by their cascade keys. */
export const themeCascadeOf = (cascadeKey: string, variant: string): VariantCascadeMap | undefined => theme.cascade[cascadeKey]?.[variant];

/** `<icon style="N">`'s rect in the icon set sheet. */
export const themeIconFrame = (style: string): SpriteFrame | undefined => theme.icons?.[style];

/** The texture keys that name another sprite than their own (`textures`). */
export const themeTextureAliases = (): Record<string, string> => theme.textures ?? {};
