import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { RoomInfoPopupBubbleLayoutEventInfoItem } from './RoomInfoPopupBubbleLayoutEventInfoItem';
import { RoomInfoPopupBubbleLayoutTagAndGroupInfoItem } from './RoomInfoPopupBubbleLayoutTagAndGroupInfoItem';

/** Row template `bottom_itemlist` of RoomInfoPopupBubbleLayout - pass real rows through its `items…` slot. */
export interface RoomInfoPopupBubbleLayoutBottomItemlistItemProps {
    itemsBottomItemlist?: ReactNode;
    layout?: BoxLayout;
}

export const RoomInfoPopupBubbleLayoutBottomItemlistItem = ({ itemsBottomItemlist, layout }: RoomInfoPopupBubbleLayoutBottomItemlistItemProps) => {
    return (
        <Region
            name="bottom_itemlist"
            layout={{ alignSelf: 'stretch', height: 80, flexShrink: 0, flexDirection: 'column', ...layout }}
        >
            {itemsBottomItemlist ?? (
                <>
                    <RoomInfoPopupBubbleLayoutTagAndGroupInfoItem />
                    <RoomInfoPopupBubbleLayoutEventInfoItem />
                </>
            )}
        </Region>
    );
};
