/**
 * What `VolterBlueWiredStyle`, `VolterGreenWiredStyle` and `VolterYellowWiredStyle` share: their
 * three templates (`wired_style_volter_blue|green|yellow_xml`) are one document apart from the
 * frame and the inner border, and the three classes differ in three colours.
 *
 * These are the light volters of the trading chests: dark text on a tinted panel inside an
 * inner border (`useInnerBorder`). Their classes do not override `softTextColor` or
 * `redTextColor`, which leaves the base class's 0 - no colour override. Their templates carry
 * no `asset_button`; the dark volter's is used.
 */
import { VOLTER_WIRED_STYLE } from './VolterWiredStyle';
import { WiredStyle, WiredStyleFrameTemplate, WiredStyleName } from './WiredStyle';

export interface VolterLightColors {
    name: Extract<WiredStyleName, 'volter_blue' | 'volter_green' | 'volter_yellow'>;
    frameColor: string;
    backgroundColor: string;
    advancedBackgroundColor: string;
    /** The template frame's Flash `style`: the yellow one takes the yellow frame skin. */
    frameVariant: string;
}

const LIGHT_TEXT_COLOR = '#222222';
const LIGHT_FILL_COLOR = '#ffeda5';

export const createVolterLightStyle = ({ name, frameColor, backgroundColor, advancedBackgroundColor, frameVariant }: VolterLightColors): WiredStyle => {
    const base = VOLTER_WIRED_STYLE.templates;
    const frame: WiredStyleFrameTemplate = { ...base.frame, variant: frameVariant, width: 256, color: frameColor };

    return {
        ...VOLTER_WIRED_STYLE,
        name,
        useInnerBorder: true,
        frameColor,
        backgroundColor,
        advancedBackgroundColor,
        softTextColor: null,
        redTextColor: null,
        templates: {
            ...base,
            ruler: { height: 1, lines: [ { color: '#222222', alpha: 1 } ] },
            text: { ...base.text, color: LIGHT_TEXT_COLOR },
            textBold: { ...base.textBold, color: LIGHT_TEXT_COLOR },
            html: { ...base.html, color: LIGHT_TEXT_COLOR },
            input: { ...base.input, textColor: LIGHT_TEXT_COLOR, backgroundColor: '#ffffff', fieldBorderColor: LIGHT_TEXT_COLOR },
            checkbox: { variant: '2', width: 17, height: 17 },
            radioButton: { variant: '2', width: 14, height: 17 },
            // The light templates leave the region's `background` off.
            expandCollapse: { ...base.expandCollapse, backgroundColor: null },
            iconButton: { ...base.iconButton, variant: '2' },
            button: { ...base.button, variant: '2' },
            miniButton: { kind: 'flat', width: 17, height: 17, borderColor: '#000000', fillColor: LIGHT_FILL_COLOR, iconWidth: 13, iconHeight: 15 },
            sourceTypeSelector: {
                kind: 'flat', height: 17, optionWidth: 13,
                borderColor: '#000000', backgroundColor: LIGHT_FILL_COLOR,
                assetPrefix: 'wired_icon_source_', iconTint: '#000000',
            },
            slider: { ...base.slider, baseTint: '#000000' },
            frame,
            quickMenu: {
                ...base.quickMenu,
                outerBorderColor: null, innerBorderColor: null, itemHoverColor: '#dddddd',
                checkbox: { variant: '2', width: 16, height: 16, x: 6, y: 3 },
                text: { ...base.quickMenu.text, color: LIGHT_TEXT_COLOR },
                spacerLineColor: '#999999',
            },
            innerBorder: { variant: '13', color: backgroundColor },
            border: { variant: '2', color: null },
            containerButton: { variant: '2' },
        },
    };
};
