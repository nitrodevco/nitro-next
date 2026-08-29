import { NineSlice } from '../layer';
import { ThemeVariant, ThemeVariants } from '../utils';
import { defineVariants } from './defineVariants';

/**
 * `TabContent` variants - the Flash `style` ids of `tab_content` elements: the element description's view/colour
 * (see ./elements.ts) merged with the art layers drawn here.
 */
export type TabContentVariant = ThemeVariant;

export const TAB_CONTENT_VARIANTS: ThemeVariants<TabContentVariant> = defineVariants<TabContentVariant>('tab_content', {
    // default
    0: {
        layer: NineSlice('border-0-default-src', 6, 6, 6, 6),
        layout: { padding: 6 },
    },
    // black
    1: {
        layer: NineSlice('border-1-default-src', 6, 6, 6, 6),
        layout: { padding: 6 },
    },
    // white
    2: {
        layer: NineSlice('border-2-default-src', 6, 6, 6, 6),
        layout: { padding: 6 },
    },
    // ubuntu
    3: {
        layer: NineSlice('tabcontent-3-default-src', 0, 15, 0, 2, { bottom: 0 }),
        layout: { paddingTop: 6, paddingLeft: 5, paddingRight: 5, paddingBottom: 2, marginTop: 2 },
    },
});
