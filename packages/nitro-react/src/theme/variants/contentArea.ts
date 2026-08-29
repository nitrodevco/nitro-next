import { ThemeVariant, ThemeVariants } from '../utils';
import { defineVariants } from './defineVariants';

/**
 * `ContentArea` variants - the frame styles whose content area it is. The element description
 * has no entries of its own for it: the frame's view template positions the content area, so
 * the variants only exist for the cascade to resolve (no art, no layout).
 */
export type ContentAreaVariant = ThemeVariant;

export const CONTENT_AREA_VARIANTS: ThemeVariants<ContentAreaVariant> = defineVariants<ContentAreaVariant>(undefined, {
    0: {},
    3: {},
});
