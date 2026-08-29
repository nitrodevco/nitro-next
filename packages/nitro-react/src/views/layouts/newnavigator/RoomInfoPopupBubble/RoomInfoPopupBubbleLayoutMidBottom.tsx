import { BoxLayout, Region } from '#base/theme';

import { RoomInfoPopupBubbleLayoutMidBottomItemlist, RoomInfoPopupBubbleLayoutMidBottomItemlistProps } from './RoomInfoPopupBubbleLayoutMidBottomItemlist';

/** Named region `midBottom` of RoomInfoPopupBubbleLayout - configured through the parent's `midBottom` prop. */
export interface RoomInfoPopupBubbleLayoutMidBottomProps {
    layout?: BoxLayout;
    midBottomItemlist?: RoomInfoPopupBubbleLayoutMidBottomItemlistProps;
}

export const RoomInfoPopupBubbleLayoutMidBottom = ({ layout, midBottomItemlist }: RoomInfoPopupBubbleLayoutMidBottomProps) => {
    return (
        <Region
            name="midBottom"
            layout={{ position: 'absolute', right: 8, width: 170, top: 0, bottom: 0, ...layout }}
        >
            <RoomInfoPopupBubbleLayoutMidBottomItemlist {...midBottomItemlist} />
        </Region>
    );
};
