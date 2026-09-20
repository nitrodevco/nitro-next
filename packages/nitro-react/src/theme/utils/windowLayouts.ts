import type { BoxLayout } from '../Box';
import type { TextStyleKey } from './textStyles';

/**
 * The button window layouts of `HabboWindowManagerCom` (`habbo_window_layout_button_xml`,
 * `illumina_light_button_xml`, ...), the `window_layout` each `button` / `button_thick` row of
 * `habbo_element_description_xml` names. Every one is a single `_BTN_TEXT` label: its `margins`
 * are the space around the caption, the layout's own size is the smallest the button gets, and
 * its `text_style` / `text_color` style the caption. Keyed by the layout's `name`.
 *
 * Carried by hand; `scripts/drift/theme_skin.py` holds every entry against its XML and every
 * `Button` / `ButtonThick` variant against the layout its element row names.
 */
export const WINDOW_LAYOUTS = {
    habbo_window_layout_button: { width: 20, height: 22, margins: [ 8, 4, 8, 4 ], textStyle: 'text-style-button-regular' },
    habbo_window_layout_button_black: { width: 20, height: 22, margins: [ 8, 4, 8, 4 ], textStyle: 'text-style-button-regular', textColor: '#ffffff' },
    habbo_window_layout_button_thick: { width: 20, height: 22, margins: [ 8, 4, 8, 4 ], textStyle: 'text-style-button-bold' },
    habbo_window_layout_button_thick_black: { width: 20, height: 22, margins: [ 8, 4, 8, 4 ], textStyle: 'text-style-button-bold', textColor: '#ffffff' },
    habbo_window_layout_button_shiny: { width: 20, height: 22, margins: [ 8, 2, 8, 3 ], textStyle: 'text-style-button-shiny-regular' },
    habbo_window_layout_button_shiny_black: { width: 20, height: 28, margins: [ 10, 5, 10, 6 ], textStyle: 'text-style-button-shiny-regular', textColor: '#ffffff' },
    habbo_window_layout_button_shiny_thick: { width: 20, height: 22, margins: [ 10, 2, 10, 3 ], textStyle: 'text-style-button-shiny-bold' },
    habbo_window_layout_button_shiny_thick_black: { width: 20, height: 28, margins: [ 10, 5, 10, 6 ], textStyle: 'text-style-button-shiny-bold', textColor: '#ffffff' },
    illumina_light_button: { width: 48, height: 48, margins: [ 24, 14, 24, 14 ], textStyle: 'text-style-il-button' },
    illumina_light_button_plain: { width: 28, height: 28, margins: [ 13, 3, 13, 3 ], textStyle: 'text-style-il-button' },
    illumina_purple_button: { width: 48, height: 48, margins: [ 24, 14, 24, 14 ], textStyle: 'text-style-il-button-white' },
    illumina_purple_button_plain: { width: 28, height: 28, margins: [ 13, 3, 13, 3 ], textStyle: 'text-style-il-button-white' },
    illumina_dark_button: { width: 28, height: 28, margins: [ 13, 3, 13, 3 ], textStyle: 'text-style-id-button' },
} as const satisfies Record<string, { width: number; height: number; margins: readonly [ number, number, number, number ]; textStyle: TextStyleKey; textColor?: string }>;

export type WindowLayoutName = keyof typeof WINDOW_LAYOUTS;

/**
 * A button variant's layout, caption style and caption colour as its Flash window layout gives
 * them - spread into the variant after its art. A layout without a `text_color` leaves the
 * caption the text style's own colour.
 */
export const windowLayout = (name: WindowLayoutName): { layout: BoxLayout; textStyle: TextStyleKey; textColor?: string } => {
    const entry: { width: number; height: number; margins: readonly [ number, number, number, number ]; textStyle: TextStyleKey; textColor?: string } = WINDOW_LAYOUTS[name];
    const [ left, top, right, bottom ] = entry.margins;

    return {
        layout: { paddingLeft: left, paddingTop: top, paddingRight: right, paddingBottom: bottom, minWidth: entry.width, minHeight: entry.height },
        textStyle: entry.textStyle,
        ...(entry.textColor && { textColor: entry.textColor }),
    };
};
