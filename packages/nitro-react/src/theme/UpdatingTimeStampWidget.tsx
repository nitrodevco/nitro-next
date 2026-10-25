/**
 * The window manager's `updating_timestamp` widget - `com.sulake.habbo.window.widgets.UpdatingTimeStampWidget`:
 * a style 100 label in `0x555555` whose caption is how long ago `timeStamp` was -
 * `FriendlyTime.getFriendlyTime` with the `.ago` texts, from 1 of a unit - set when the widget is made
 * or given a new time, and again on every tick of one timer all of them share, once a minute.
 */
import { BoxLayout, ThemeText } from '@nitrodevco/nitro-theme';

import { useTranslation } from '#base/context/system';
import { useClock } from '#base/hooks';
import { GetFriendlyTime } from '#base/utils';

/** `UPDATE_TIMER`'s delay. */
const UPDATE_MS = 60000;
/** `§_-yk§.textColor = 5592405`. */
const TEXT_COLOR = '#555555';

// A widget made, or given a new time, reads the time then (`reset` / `set timeStamp`): `useClock`
// reads it afresh when it subscribes.
/** `Date.now()`, as the shared minute timer last read it. */
const useMinuteClock = () => useClock('epoch', UPDATE_MS);

export interface UpdatingTimeStampWidgetProps {
    /** `timeStamp`: the time, in ms since the epoch, it counts from. */
    timeStamp: number;
    /** `align`: the label's text format alignment. */
    align?: 'left' | 'center' | 'right';
    layout?: BoxLayout;
}

export const UpdatingTimeStampWidget = ({ timeStamp, align, layout }: UpdatingTimeStampWidgetProps) => {
    const t = useTranslation();
    const clock = useMinuteClock();
    const seconds = Math.max(0, (clock - Math.abs(timeStamp)) / 1000);

    return (
        <ThemeText
            text={GetFriendlyTime(t, seconds, '.ago', 1)}
            textStyle="il_regular"
            textOptions={{ fill: TEXT_COLOR, align }}
            verticalAlign="top"
            layout={layout}
        />
    );
};
