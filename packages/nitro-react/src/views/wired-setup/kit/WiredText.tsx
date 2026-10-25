/**
 * `wired_setup.uibuilder.presets.TextPreset` with `params.TextParam` - a text in the style's
 * `text_view` (or `text_bold_view`) template.
 *
 * The three `TextParam` modes decide how it takes its width:
 * - `multiline` (`MODE_MULTILINE`, Flash's default `TextParam.DEFAULT`): fills the width it is
 *   given and wraps, growing in height; `maxLines` and `align` apply here;
 * - `stretch` (`MODE_STRETCH`): one line as wide as the text - a static width, which is what
 *   lets it sit in front of an input in a row. `width` pins it (`TextPreset.width`, the
 *   `nameWidth` of the named inputs);
 * - `overflow` (`MODE_OVERFLOW`): one line filling the width, cut with `...` when too long.
 *
 * A wrapping text has to know its width before it can be laid out, so it renders one frame
 * after its container has been measured.
 */
import { Container } from 'pixi.js';
import { useState } from 'react';

import { Box, BoxLayout, useLayoutSize } from '#base/theme';

import { useWiredCaption } from './useWiredCaption';
import { useWiredDisabled, wiredDisabledAlpha } from './useWiredDisabled';
import { useWiredFillLayout } from './useWiredFillLayout';
import { useWiredTextFormat } from './useWiredTextFormat';
import { WiredFlashLabel } from './WiredFlashLabel';
import { useWiredStyle } from './WiredStyleContext';
import { limitWiredTextLines, truncateWiredText } from './wiredTextFormat';

export type WiredTextMode = 'stretch' | 'multiline' | 'overflow';

export interface WiredTextProps {
    /** A literal or Flash's `${localization.key}` form. */
    text: string;
    /** `TextParam.bold` - the `text_bold_view` template. */
    bold?: boolean;
    /** `TextParam.mode`. Default `multiline`, or `stretch` when `wrap` is `false`. */
    mode?: WiredTextMode;
    /** Shorthand for the two common modes: `false` is `stretch`. */
    wrap?: boolean;
    /** `TextParam.maxLines` (multiline). 0 - the default - is no limit. */
    maxLines?: number;
    /** `TextParam.underline`. */
    underline?: boolean;
    /** `TextParam.alignment` (multiline). */
    align?: 'left' | 'center' | 'right';
    /** `TextParam.fontSize`. */
    fontSize?: number;
    /** `TextParam.textColor` - a CSS colour, e.g. the style's `yellowTextColor`. `null` / absent keeps the template's. */
    color?: string | null;
    /** `TextPreset.width` - a fixed width for a `stretch` text. */
    width?: number;
    /** `halfBlend()` - drawn at half opacity. */
    halfBlend?: boolean;
    /** The text is Flash `htmlText` - see `WiredHtml`. */
    html?: boolean;
    /** `WiredUIPreset.disabled`. */
    disabled?: boolean;
    /** Extra layout for the text's box (an offset such as `marginTop`). */
    layout?: BoxLayout;
}

export const WiredText = ({ text, bold = false, mode, wrap = true, maxLines = 0, underline = false, align = 'left', fontSize, color, width, halfBlend = false, html = false, disabled = false, layout }: WiredTextProps) => {
    const style = useWiredStyle();
    const caption = useWiredCaption();
    const isDisabled = useWiredDisabled(disabled);
    const resolvedMode: WiredTextMode = mode ?? (wrap ? 'multiline' : 'stretch');
    const template = html ? style.templates.html : (bold ? style.templates.textBold : style.templates.text);
    const format = useWiredTextFormat(template, color, fontSize, underline);
    const fillLayout = useWiredFillLayout((resolvedMode === 'stretch') ? (width ?? 'content') : undefined);
    const [ node, setNode ] = useState<Container | null>(null);
    const measured = useLayoutSize(node);
    const alpha = wiredDisabledAlpha(isDisabled, halfBlend ? 0.5 : 1);
    const resolvedText = caption(text);

    if (resolvedMode === 'stretch') {
        return (
            <Box layout={{ flexDirection: 'row', minHeight: template.height, overflow: (width !== undefined) ? 'hidden' : undefined, ...fillLayout, ...layout }}>
                <WiredFlashLabel
                    text={resolvedText}
                    format={format}
                    html={html}
                    alpha={alpha}
                />
            </Box>
        );
    }

    const fieldWidth = Math.floor(measured.width);
    let shownText = resolvedText;

    if (fieldWidth > 0) {
        if (resolvedMode === 'overflow') shownText = truncateWiredText(resolvedText, format, fieldWidth);
        else if (!html) shownText = limitWiredTextLines(resolvedText, format, fieldWidth - 4, maxLines);
    }

    return (
        <Box
            ref={setNode}
            layout={{ flexDirection: 'row', minHeight: template.height, ...fillLayout, ...layout }}
        >
            {(fieldWidth > 0) && (
                <WiredFlashLabel
                    text={shownText}
                    format={format}
                    html={html}
                    wrapWidth={(resolvedMode === 'multiline') ? fieldWidth : undefined}
                    align={align}
                    alpha={alpha}
                />
            )}
        </Box>
    );
};
