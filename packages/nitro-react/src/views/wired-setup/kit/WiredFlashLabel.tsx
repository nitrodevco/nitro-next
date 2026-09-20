/**
 * One text field of the wired kit, drawn from a Flash text format rather than from a
 * `textStyle` key, because the wired templates and `TextParam` combine a style with a bold
 * flag, a font size, an underline and a colour (see `wiredTextFormat`). It renders the way
 * `ThemeText` does - `renderFlashTextCanvas`, the browser's text when the exact renderer cannot
 * take the string - on both render targets. Internal to the kit: views use `WiredText` and
 * `WiredHtml`.
 */
import { useMemo } from 'react';

import { BoxLayout, FlashTextDom, FlashTextFormat, FlashTextPixi, FlashTextRun, getRenderMode, parseFlashTextMarkup, renderBrowserTextCanvas, renderFlashTextCanvas } from '#base/theme';

export interface WiredFlashLabelProps {
    text: string;
    format: FlashTextFormat;
    /** The text is Flash `htmlText` (`<b>`, `<i>`, `<u>`, `<font color>`, `<br>`). */
    html?: boolean;
    /** Wraps to this field width (gutters included) and makes the bitmap that wide. */
    wrapWidth?: number;
    align?: 'left' | 'center' | 'right';
    alpha?: number;
    layout?: BoxLayout;
}

export const WiredFlashLabel = ({ text, format, html = false, wrapWidth, align = 'left', alpha, layout }: WiredFlashLabelProps) => {
    const rendered = useMemo(() => {
        if (!text.length) return null;

        const runs: FlashTextRun[] = html ? parseFlashTextMarkup(text, format) : [ { text, format } ];
        const options = (wrapWidth !== undefined)
            ? { wordWrap: true, wrapWidth: Math.max(1, wrapWidth - 4), width: Math.max(1, wrapWidth), breakWords: true, align }
            : { align };

        return renderFlashTextCanvas(runs, format, options) ?? renderBrowserTextCanvas(runs, options);
    }, [ text, format, html, wrapWidth, align ]);

    if (!rendered) return null;

    if (getRenderMode() === 'dom') {
        return (
            <FlashTextDom
                rendered={rendered}
                alpha={alpha}
                layout={layout}
            />
        );
    }

    return (
        <FlashTextPixi
            rendered={rendered}
            alpha={alpha}
            layout={layout}
        />
    );
};
