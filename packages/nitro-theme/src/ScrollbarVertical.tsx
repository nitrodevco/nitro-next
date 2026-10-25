import { createScrollbar, ScrollbarProps } from './scrollbar';
import { ScrollbarSliderBarVertical } from './ScrollbarSliderBarVertical';
import { ScrollbarSliderButtonDown } from './ScrollbarSliderButtonDown';
import { ScrollbarSliderButtonUp } from './ScrollbarSliderButtonUp';
import { ScrollbarSliderTrackVertical } from './ScrollbarSliderTrackVertical';

export type ScrollbarVerticalProps = ScrollbarProps;

/** `scrollbar_vertical`: the up arrow, the track and its lift, the down arrow. */
export const ScrollbarVertical = createScrollbar('ScrollbarVertical', 'scrollbarVertical', 'vertical', {
    backward: ScrollbarSliderButtonUp,
    forward: ScrollbarSliderButtonDown,
    track: ScrollbarSliderTrackVertical,
    lift: ScrollbarSliderBarVertical,
});
