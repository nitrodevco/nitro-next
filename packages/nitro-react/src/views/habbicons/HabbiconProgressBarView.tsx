/**
 * `HabbiconProgressBarView` - one of `habbicon_view.xml`'s three progress bars
 * (`album_progress_bar`, `set_progress_bar`, each rail row's `set_row_progress_bar`), drawn as that
 * window of the layout on its own: its rounded `background`, and the `progress` container `render`
 * cuts at the filled width (hidden while empty), holding the `fill` `CAP_OVERSHOOT` pixels wider (so
 * its right end reads square until the bar is nearly full) in the fill colour, and the `highlight`
 * 2px inside it. Its owner draws it over the bar's own window, whose children it hides
 * (`hideHabbiconProgressBar`), so the bar animates without laying the whole hub out again.
 *
 * `setRatio(ratio, animate)` is the `ratio` prop: a new `resetKey` (a rebuilt album, another set)
 * or `animate` false snaps the bar, otherwise it glides there while the ticker runs its `update`
 * (see `habbiconProgressAnimation`). Flash only updates the bars while the hub is on the desktop;
 * here they only exist then.
 */
import { GetTicker } from '@nitrodevco/nitro-renderer';
import { Ticker } from 'pixi.js';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { findTemplateChild, TemplateWindow, useTemplate } from '#base/theme';

import { HabbiconProgressBar, habbiconProgressWidths } from './habbiconProgressAnimation';
import { HABBICON_VIEW_TEMPLATE } from './habbiconTemplate';

export interface HabbiconProgressBarViewProps {
    /** The bar's window in the layout. */
    part: 'album_progress_bar' | 'set_progress_bar' | 'set_row_progress_bar';
    ratio: number;
    animate: boolean;
    resetKey: string;
}

export const HabbiconProgressBarView = ({ part, ratio, animate, resetKey }: HabbiconProgressBarViewProps) => {
    const [ bar ] = useState(() => new HabbiconProgressBar(ratio));
    // What the bar shows, published after each change: the bar itself is mutable.
    const [ drawn, setDrawn ] = useState(() => ({ value: bar.value, color: bar.color, updating: bar.isUpdating }));
    const shown = useRef({ ratio, resetKey });
    const publish = useCallback(() => setDrawn({ value: bar.value, color: bar.color, updating: bar.isUpdating }), [ bar ]);

    useLayoutEffect(() => {
        const last = shown.current;

        if ((last.ratio === ratio) && (last.resetKey === resetKey)) return;

        shown.current = { ratio, resetKey };

        if ((last.resetKey !== resetKey) || !animate) bar.snap(ratio);
        else bar.setTarget(ratio);

        publish();
    }, [ ratio, resetKey, animate, bar, publish ]);

    // `_maxWidth = _container.width`: the bar's width in the layout.
    const template = useTemplate(HABBICON_VIEW_TEMPLATE);
    const widths = habbiconProgressWidths(drawn.value, (template && findTemplateChild(template.elements, part)?.width) ?? 0);

    useEffect(() => {
        if (!drawn.updating) return;

        const update = (ticker: Ticker) => {
            bar.update(ticker.deltaMS);
            publish();
        };

        GetTicker().add(update);

        return () => {
            GetTicker().remove(update);
        };
    }, [ drawn.updating, bar, publish ]);

    return (
        <TemplateWindow
            id={HABBICON_VIEW_TEMPLATE}
            part={part}
            bindings={{
                // `render`.
                progress: { visible: widths.progress > 0 },
                fill: { color: drawn.color },
            }}
            arrange={({ find }) => {
                find('progress')?.setWidth(widths.progress);
                find('fill')?.setWidth(widths.fill);
                find('highlight')?.setWidth(widths.highlight);
            }}
        />
    );
};
