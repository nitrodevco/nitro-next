import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { RoomInfoPopupBubbleLayoutRoomNameDescOwnerContainerItem } from './RoomInfoPopupBubbleLayoutRoomNameDescOwnerContainerItem';
import { RoomInfoPopupBubbleLayoutRoomThumbnailContainerItem } from './RoomInfoPopupBubbleLayoutRoomThumbnailContainerItem';

/** Row template `header_top` of RoomInfoPopupBubbleLayout - pass real rows through its `items…` slot. */
export interface RoomInfoPopupBubbleLayoutHeaderTopItemProps {
    itemsHeaderTop?: ReactNode;
    layout?: BoxLayout;
}

export const RoomInfoPopupBubbleLayoutHeaderTopItem = ({ itemsHeaderTop, layout }: RoomInfoPopupBubbleLayoutHeaderTopItemProps) => {
    return (
        <Region
            name="header_top"
            layout={{ width: 329, height: 112, flexShrink: 0, flexDirection: 'row', ...layout }}
        >
            {itemsHeaderTop ?? (
                <>
                    <RoomInfoPopupBubbleLayoutRoomThumbnailContainerItem />
                    <RoomInfoPopupBubbleLayoutRoomNameDescOwnerContainerItem />
                </>
            )}
        </Region>
    );
};
