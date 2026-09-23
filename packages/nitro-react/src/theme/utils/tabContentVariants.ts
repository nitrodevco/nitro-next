/**
 * The `tab_content` band's art and where it sits - shared by `TabContent`, which is the band a
 * view fills, and by `TabContext`, whose own window layout holds one whether a view fills it or
 * not (`habbo_window_layout_tab_context(_3)`).
 */
import { NineSlice } from '../layer/NineSliceLayer';
import { ThemeVariant, ThemeVariants } from './ThemeVariant';

export type TabContentVariant = ThemeVariant;

/** `TabContent` variants - the `type="tab_content"` rows of `habbo_element_description_xml`. */
export const TAB_CONTENT_VARIANTS: ThemeVariants<TabContentVariant> = {
    // default
    0: {
        layer: NineSlice('border-0-default-src', 6, 6, 6, 6),
        layout: { padding: 6, marginTop: 2 },
    },
    // black
    1: {
        layer: NineSlice('border-1-default-src', 6, 6, 6, 6),
        layout: { padding: 6, marginTop: 2 },
    },
    // white
    2: {
        layer: NineSlice('border-2-default-src', 6, 6, 6, 6),
        layout: { padding: 6 },
    },
    // ubuntu
    3: {
        layer: NineSlice('tabcontent-3-default-src', 0, 15, 0, 2, { bottom: 0 }),
        // Never shorter than its own top slice: the sheet's first two rows are the line under the
        // tabs (black over white, then the panel's #eceae0), and a band squeezed below 15 draws
        // that edge compressed instead of drawn - which is what a 2px band has to show.
        layout: { paddingTop: 6, paddingLeft: 5, paddingRight: 5, paddingBottom: 2, marginTop: 2, minHeight: 15 },
    },
};

/**
 * Where the band starts in the tab context's own box: `habbo_window_layout_tab_context`'s
 * `tab_content` is at `y="20"` and `_3`'s at `y="30"`, each stretching with the context. A context
 * no taller than its buttons therefore shows only the band's top edge - which is the line across
 * the bottom of a tab strip, and what a context that draws no band at all was missing.
 */
export const TAB_CONTENT_TOP: Record<string, number> = { 0: 20, 1: 20, 2: 20, 3: 30 };

/** The band's art alone, for a context drawing it under its buttons. */
export const tabContentLayer = (variant: string) => TAB_CONTENT_VARIANTS[variant]?.layer;
