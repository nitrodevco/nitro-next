import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { RoomInfoPopupBubbleLayoutBottomItemlistItem } from './RoomInfoPopupBubbleLayoutBottomItemlistItem';
import { RoomInfoPopupBubbleLayoutHeaderItem } from './RoomInfoPopupBubbleLayoutHeaderItem';
import { RoomInfoPopupBubbleLayoutNewMidItem } from './RoomInfoPopupBubbleLayoutNewMidItem';
import { RoomInfoPopupBubbleLayoutRoomGroupOwnerContainerItem } from './RoomInfoPopupBubbleLayoutRoomGroupOwnerContainerItem';

/** Named region `main_content` of RoomInfoPopupBubbleLayout - configured through the parent's `mainContent` prop. */
export interface RoomInfoPopupBubbleLayoutMainContentProps {
    itemsMainContent?: ReactNode;
    layout?: BoxLayout;
}

export const RoomInfoPopupBubbleLayoutMainContent = ({ itemsMainContent, layout }: RoomInfoPopupBubbleLayoutMainContentProps) => {
    return (
        <Region
            name="main_content"
            layout={{ position: 'absolute', left: 11, width: 345, top: -21, height: 324, flexDirection: 'column', gap: 3, ...layout }}
        >
            {itemsMainContent ?? (
                <>
                    <RoomInfoPopupBubbleLayoutHeaderItem />
                    <RoomInfoPopupBubbleLayoutRoomGroupOwnerContainerItem />
                    <RoomInfoPopupBubbleLayoutNewMidItem />
                    <RoomInfoPopupBubbleLayoutBottomItemlistItem />
                </>
            )}
        </Region>
    );
};
