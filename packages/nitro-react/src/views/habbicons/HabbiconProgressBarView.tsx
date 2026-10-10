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
import { useEffect, useState } from 'react';

import { findTemplateChild, TemplateWindow, useTemplate } from '#base/theme';

import { createHabbiconProgress, getHabbiconProgressWidths, isHabbiconProgressSettled, setHabbiconProgressTarget, snapHabbiconProgress, stepHabbiconProgress } from './habbiconProgressAnimation';
import { HABBICON_VIEW_TEMPLATE } from './habbiconTemplate';

export interface HabbiconProgressBarViewProps {
    /** The bar's window in the layout. */
    part: 'album_progress_bar' | 'set_progress_bar' | 'set_row_progress_bar';
    ratio: number;
    animate: boolean;
    resetKey: string;
}

export const HabbiconProgressBarView = ({ part, ratio, animate, resetKey }: HabbiconProgressBarViewProps) => {
    const [ anim, setAnim ] = useState(() => createHabbiconProgress(ratio));
    const [ shown, setShown ] = useState({ ratio, resetKey });

    if ((shown.ratio !== ratio) || (shown.resetKey !== resetKey)) {
        const snap = (shown.resetKey !== resetKey) || !animate;

        setShown({ ratio, resetKey });
        setAnim(previous => (snap ? snapHabbiconProgress(previous, ratio) : setHabbiconProgressTarget(previous, ratio)));
    }

    const settled = isHabbiconProgressSettled(anim);
    // `_maxWidth = _container.width`: the bar's width in the layout.
    const template = useTemplate(HABBICON_VIEW_TEMPLATE);
    const widths = getHabbiconProgressWidths(anim, (template && findTemplateChild(template.elements, part)?.width) ?? 0);

    useEffect(() => {
        if (settled) return;

        const update = (ticker: Ticker) => setAnim(previous => stepHabbiconProgress(previous, ticker.deltaMS));

        GetTicker().add(update);

        return () => {
            GetTicker().remove(update);
        };
    }, [ settled ]);

    return (
        <TemplateWindow
            id={HABBICON_VIEW_TEMPLATE}
            part={part}
            bindings={{
                // `render`.
                progress: { visible: widths.progress > 0 },
                fill: { color: anim.colorValue },
            }}
            arrange={({ find }) => {
                find('progress')?.setWidth(widths.progress);
                find('fill')?.setWidth(widths.fill);
                find('highlight')?.setWidth(widths.highlight);
            }}
        />
    );
};
