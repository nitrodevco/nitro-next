/**
 * `wired_setup.uibuilder.presets.HtmlPreset` with `params.HtmlTextParam` - a text in the
 * style's `text_html` template whose content is Flash `htmlText` (`<b>`, `<i>`, `<u>`,
 * `<font color="#rrggbb">`, `<br>`).
 *
 * `HtmlTextParam.selectable` has no counterpart: a text drawn into the canvas cannot be
 * selected, so the prop is accepted for the ports' sake and changes nothing.
 */
import { BoxLayout } from '#base/theme';

import { WiredText, WiredTextMode } from './WiredText';

export interface WiredHtmlProps {
    /** A literal or Flash's `${localization.key}` form, as `htmlText`. */
    text: string;
    /** `HtmlTextParam.mode`. Default `multiline` (`HtmlTextParam.DEFAULT`). */
    mode?: WiredTextMode;
    /** `HtmlTextParam.selectable`. */
    selectable?: boolean;
    /** `TextParam.textColor`. */
    color?: string | null;
    disabled?: boolean;
    layout?: BoxLayout;
}

export const WiredHtml = ({ text, mode = 'multiline', color, disabled, layout }: WiredHtmlProps) => (
    <WiredText
        text={text}
        mode={mode}
        color={color}
        disabled={disabled}
        html
        layout={layout}
    />
);
