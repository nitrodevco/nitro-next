import { createScrollbar, ScrollbarProps } from './scrollbar';
import { ScrollbarSliderBarHorizontal } from './ScrollbarSliderBarHorizontal';
import { ScrollbarSliderButtonLeft } from './ScrollbarSliderButtonLeft';
import { ScrollbarSliderButtonRight } from './ScrollbarSliderButtonRight';
import { ScrollbarSliderTrackHorizontal } from './ScrollbarSliderTrackHorizontal';

export type ScrollbarHorizontalProps = ScrollbarProps;

/** `scrollbar_horizontal`: the left arrow, the track and its lift, the right arrow. */
export const ScrollbarHorizontal = createScrollbar('ScrollbarHorizontal', 'scrollbarHorizontal', 'horizontal', {
    backward: ScrollbarSliderButtonLeft,
    forward: ScrollbarSliderButtonRight,
    track: ScrollbarSliderTrackHorizontal,
    lift: ScrollbarSliderBarHorizontal,
});
