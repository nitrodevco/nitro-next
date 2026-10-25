/**
 * A number that travels to its target over a fixed time instead of jumping there - the one piece
 * the client's slides share. Flash drove them three ways: `BottomBarLeft` from a 60 fps `Timer`
 * (`onAnimationTimer`), `RoomToolsToolbarCtrl` from the room engine's update (`update`), and
 * `RoomToolsInfoCtrl` through `com.sulake.core.window.motion` (`Queue(EaseOut(MoveTo(...)))`).
 * All three are "elapsed / duration, eased, between where it was and where it goes", so here they
 * are one hook that counts the shared ticker's `deltaMS`.
 *
 * A new target mid-way starts a new run from wherever the value has got to, as `MoveTo.start`
 * reads the window's current x and `RoomToolsToolbarCtrl.beginAnimation` its current offset. The
 * first render takes the target as it is - nothing slides in on mount - unless `initial` says
 * where the value starts from.
 */
import { GetTicker } from '@nitrodevco/nitro-renderer';
import { Ticker } from 'pixi.js';
import { useEffect, useState } from 'react';

/** Maps a run's elapsed fraction (0 to 1) onto how far along the value is. */
export type TweenEase = (progress: number) => number;

/** `BottomBarLeft.onAnimationTimer` and `RoomToolsToolbarCtrl.update`: `1 - pow(1 - t, 3)`. */
export const easeOutCubic: TweenEase = progress => 1 - Math.pow(1 - progress, 3);

/**
 * `com.sulake.core.window.motion.EaseOut.update`: `pow(t, 1 / rate)`. At the rate of 1 every
 * caller passes, that is a straight line.
 */
export const motionEaseOut = (rate: number): TweenEase => progress => Math.pow(progress, 1 / rate);

/**
 * `EaseOut(..., 1)`: a rate of 1, which is linear. Built here rather than by the caller, so a view
 * never calls into this module while it loads - `#base/hooks` and the views import each other, and
 * a module-level `motionEaseOut(1)` in a view can run before this file has been evaluated.
 */
export const motionEaseOutRate1: TweenEase = motionEaseOut(1);

interface TweenState {
    from: number;
    to: number;
    value: number;
    /** Bumped for every new target, so a tick from a run that was replaced changes nothing. */
    run: number;
}

/**
 * `target`, reached over `durationMs` along `ease`. Pass a module-level `ease`: a run restarts
 * when it changes. While the returned value is not yet `target`, the slide is under way; a value
 * that mounts somewhere other than its target (`initial`) slides there straight away.
 */
export const useTween = (target: number, durationMs: number, ease: TweenEase, initial: number = target): number => {
    const [ tween, setTween ] = useState<TweenState>({ from: initial, to: initial, value: initial, run: 0 });

    // A new target starts from where the value is now - adjusted during render, not in an effect.
    if (target !== tween.to) setTween({ from: tween.value, to: target, value: tween.value, run: tween.run + 1 });

    const { from, to, run } = tween;

    useEffect(() => {
        if (from === to) return;

        let elapsed = 0;

        const tick = (ticker: Ticker) => {
            elapsed += ticker.deltaMS;

            const progress = (durationMs > 0) ? Math.min(1, elapsed / durationMs) : 1;
            const value = (progress >= 1) ? to : (from + ((to - from) * ease(progress)));

            setTween(previous => ((previous.run === run) ? { ...previous, value } : previous));

            if (progress >= 1) GetTicker().remove(tick);
        };

        GetTicker().add(tick);

        return () => {
            GetTicker().remove(tick);
        };
    }, [ from, to, run, durationMs, ease ]);

    return tween.value;
};
