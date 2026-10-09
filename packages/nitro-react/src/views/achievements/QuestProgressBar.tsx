/**
 * AS3 quest `ProgressBar`: the `habbo-quest-engine-com/ProgressBar` template its constructor adds to the
 * window it is given (`getXmlWindow("ProgressBar")`), at `location`, `_progressBarWidth + 10` wide.
 * `updateView` is the `arrange`: the track stretched to the width, the fill to the amount - animated
 * towards it and faded in as it goes - and the text centred over the track.
 */
import { useEffect, useRef, useState } from 'react';

import { Box, TemplateWindow, TemplateWindows } from '#base/theme';

interface QuestProgressBarProps {
    /** `location`, in the window the bar is added to. */
    x: number;
    y: number;
    /** `_progressBarWidth`. */
    width: number;
    /** `refresh` arguments: current and maximum amount, the level key and `scoreAtStartOfLevel`. */
    current: number;
    max: number;
    levelKey: number;
    scoreAtStartOfLevel: number;
    /** `_progressKey`'s text with the progress and limit `updateView` registers. */
    caption: (progress: number, limit: number) => string;
    /** `set visible`: the bar's `progress_bar_cont`. */
    visible?: boolean;
    /** `isUpdating` gone false: the fill has reached the amount (`DailyTaskView.update` waits for it). */
    onSettled?: () => void;
}

/** `ProgressBar.getProgressWidth`. */
const progressWidth = (width: number, amount: number, max: number) => (max > 0 ? Math.max(0, Math.round((width * amount) / max)) : 0);

/** `ProgressBar.PROGRESS_TEXT_X_OFFSET`. */
const PROGRESS_TEXT_X_OFFSET = 3;

/** `ProgressBar.CONTAINER_SPACING`: the container is this much wider than the track. */
const CONTAINER_SPACING = 10;

export const QuestProgressBar = ({ x, y, width, current, max, levelKey, scoreAtStartOfLevel, caption, visible = true, onSettled }: QuestProgressBarProps) => {
    const target = progressWidth(width, current, max);
    const [ shown, setShown ] = useState(target);
    const [ start, setStart ] = useState(target);
    const previous = useRef({ levelKey, max });
    const shownRef = useRef(shown);
    const onSettledRef = useRef(onSettled);

    useEffect(() => {
        shownRef.current = shown;
        onSettledRef.current = onSettled;
    });

    useEffect(() => {
        // `refresh`: a new level or maximum jumps to the target; otherwise the bar animates from where it is.
        const reset = previous.current.levelKey !== levelKey || previous.current.max !== max;

        previous.current = { levelKey, max };

        if (reset) {
            setShown(target);
            setStart(target);
            onSettledRef.current?.();

            return undefined;
        }

        setStart(shownRef.current);

        let frame = 0;
        let last = performance.now();
        let currentWidth = shownRef.current;
        const step = (now: number) => {
            // `updateView`: `max(1, dt / 32 * round(sqrt(|distance|)))` pixels a frame.
            const distance = target - currentWidth;
            const pixels = Math.max(1, ((now - last) / 32) * Math.round(Math.sqrt(Math.abs(distance))));

            last = now;
            currentWidth = distance > 0 ? Math.min(target, currentWidth + pixels) : Math.max(target, currentWidth - pixels);
            setShown(currentWidth);

            if (currentWidth !== target) frame = requestAnimationFrame(step);
            else onSettledRef.current?.();
        };

        if (currentWidth !== target) frame = requestAnimationFrame(step);
        else onSettledRef.current?.();

        return () => cancelAnimationFrame(frame);
    }, [ target, levelKey, max ]);

    const animating = shown !== target;
    const blend = animating && target !== start ? Math.min(1, Math.max(0, 1 - ((target - shown) / (target - start)))) : 1;
    const progress = animating ? Math.round((shown / width) * max) : current;

    const arrange = ({ find }: TemplateWindows) => {
        const container = find('progress_bar_cont');
        const track = find('bar_c');
        const trackEnd = find('bar_r');
        const background = find('bar_a_bkg');
        const fill = find('bar_a_c');
        const fillEnd = find('bar_a_r');
        const text = find('progress_txt');

        if (!container || !track || !trackEnd || !background || !fill || !fillEnd || !text) return;

        container.setWidth(width + CONTAINER_SPACING);
        track.setWidth(width);
        trackEnd.setX(width + fill.x);
        fill.setWidth(shown);
        fillEnd.setX(shown + fill.x);
        background.setWidth((fillEnd.x + fillEnd.width) - fill.x);
        text.setX(PROGRESS_TEXT_X_OFFSET + fill.x + ((width - text.width) / 2));
    };

    return (
        <Box layout={{ position: 'absolute', left: x, top: y }}>
            <TemplateWindow
                id="habbo-quest-engine-com/ProgressBar"
                bindings={{
                    progress_bar_cont: { visible },
                    bar_a_c: { alpha: blend },
                    progress_txt: { caption: caption(progress + scoreAtStartOfLevel, max + scoreAtStartOfLevel) },
                }}
                arrange={arrange}
            />
        </Box>
    );
};
