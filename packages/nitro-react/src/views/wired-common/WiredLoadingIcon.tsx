/**
 * `com.sulake.habbo.utils.LoadingIcon` on the `searching_icon` of the paged wired windows: a
 * 15x15 `<icon>` that steps through `icon_set` styles 23-26 every 160 ms while it is visible.
 * As in Flash the frame it stopped on is kept, so the next run picks up from there.
 *
 * Flash keeps this icon in each window's header (`variables_management_overview_xml` at
 * 667,50; `transaction_overview_xml` at 777,20), so the window places it; `visible` is
 * "a page has been requested and has not arrived".
 */
import { useEffect, useState } from 'react';

import { BoxLayout, Icon } from '#base/theme';

/** `LoadingIcon.FRAMES`. */
const FRAMES = [ 23, 24, 25, 26 ];
const FRAME_MS = 160;

export interface WiredLoadingIconProps {
    /** `LoadingIcon.setVisible`. */
    visible: boolean;
    layout?: BoxLayout;
}

export const WiredLoadingIcon = ({ visible, layout }: WiredLoadingIconProps) => {
    const [ frame, setFrame ] = useState(0);

    // LoadingIcon.onTimer
    useEffect(() => {
        if (!visible) return;

        const timer = setInterval(() => setFrame(current => ((current + 1) % FRAMES.length)), FRAME_MS);

        return () => clearInterval(timer);
    }, [ visible ]);

    if (!visible) return null;

    return (
        <Icon
            variant={FRAMES[frame]}
            layout={{ width: 15, height: 15, flexShrink: 0, ...layout }}
        />
    );
};
