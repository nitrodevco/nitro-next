/**
 * `HabbiconProgressBarView` - the three progress bars of `habbicon_view.xml` (`album_progress_bar`
 * 304x18, `set_progress_bar` 154x16, each rail row's `set_row_progress_bar` 69x12): a rounded
 * `background` shape, and over it the `progress` container cut at the bar's filled width, holding
 * the rounded `fill` shape `CAP_OVERSHOOT` pixels wider (so its right end reads square until the bar
 * is nearly full) and the additive `highlight` gradient 2px inside it.
 *
 * `setRatio(ratio, animate)` is the `ratio` prop: a new `resetKey` (a rebuilt album, another set)
 * or `animate` false snaps the bar, otherwise it glides there while the ticker runs its `update`
 * (see `habbiconProgressAnimation`). Flash only updates the bars while the hub is on the desktop;
 * here they only exist then.
 */
import { GetTicker } from '@nitrodevco/nitro-renderer';
import { Ticker } from 'pixi.js';
import { useEffect, useState } from 'react';

import { BoxLayout, Gradient, Region, Shape } from '#base/theme';

import { createHabbiconProgress, getHabbiconProgressWidths, HabbiconProgressBarGeometry, isHabbiconProgressSettled, setHabbiconProgressTarget, snapHabbiconProgress, stepHabbiconProgress } from './habbiconProgressAnimation';

export interface HabbiconProgressBarViewProps {
    ratio: number;
    animate: boolean;
    resetKey: string;
    geometry: HabbiconProgressBarGeometry;
    layout?: BoxLayout;
}

export const HabbiconProgressBarView = ({ ratio, animate, resetKey, geometry, layout }: HabbiconProgressBarViewProps) => {
    const [ anim, setAnim ] = useState(() => createHabbiconProgress(ratio));
    const [ shown, setShown ] = useState({ ratio, resetKey });

    if ((shown.ratio !== ratio) || (shown.resetKey !== resetKey)) {
        const snap = (shown.resetKey !== resetKey) || !animate;

        setShown({ ratio, resetKey });
        setAnim(previous => (snap ? snapHabbiconProgress(previous, ratio) : setHabbiconProgressTarget(previous, ratio)));
    }

    const settled = isHabbiconProgressSettled(anim);

    useEffect(() => {
        if (settled) return;

        const update = (ticker: Ticker) => setAnim(previous => stepHabbiconProgress(previous, ticker.deltaMS));

        GetTicker().add(update);

        return () => {
            GetTicker().remove(update);
        };
    }, [ settled ]);

    const widths = getHabbiconProgressWidths(anim, geometry.width);
    const fillColor = `#${anim.colorValue.toString(16).padStart(6, '0')}`;

    return (
        <Region layout={{ position: 'absolute', width: geometry.width, height: geometry.height, ...layout }}>
            <Shape
                shape="round_rectangle"
                color={geometry.backgroundColor}
                strokeThickness={1}
                radius={geometry.radius}
                layout={{ position: 'absolute', left: 0, top: 0, width: geometry.width, height: geometry.height }}
            />
            {(widths.progress > 0) && (
                <Region layout={{ position: 'absolute', left: 0, top: 0, width: widths.progress, height: geometry.height, overflow: 'hidden' }}>
                    <Shape
                        shape="round_rectangle"
                        color={fillColor}
                        strokeThickness={1}
                        radius={geometry.radius}
                        layout={{ position: 'absolute', left: 0, top: 0, width: widths.fill, height: geometry.height }}
                    />
                    <Gradient
                        alpha={geometry.highlightAlpha}
                        blendMode="add"
                        layout={{ position: 'absolute', left: 1, top: 1, width: widths.highlight, height: geometry.highlightHeight }}
                    />
                </Region>
            )}
        </Region>
    );
};
