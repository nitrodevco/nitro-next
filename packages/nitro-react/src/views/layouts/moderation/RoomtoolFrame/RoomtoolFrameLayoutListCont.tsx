import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { RoomtoolFrameLayoutActContItem } from './RoomtoolFrameLayoutActContItem';
import { RoomtoolFrameLayoutEventContItem } from './RoomtoolFrameLayoutEventContItem';
import { RoomtoolFrameLayoutEventSpacingItem } from './RoomtoolFrameLayoutEventSpacingItem';
import { RoomtoolFrameLayoutFooterContItem } from './RoomtoolFrameLayoutFooterContItem';
import { RoomtoolFrameLayoutInfoContItem } from './RoomtoolFrameLayoutInfoContItem';
import { RoomtoolFrameLayoutMessageInputItem } from './RoomtoolFrameLayoutMessageInputItem';
import { RoomtoolFrameLayoutMsgTemplatesSelectItem } from './RoomtoolFrameLayoutMsgTemplatesSelectItem';
import { RoomtoolFrameLayoutRoomContItem } from './RoomtoolFrameLayoutRoomContItem';
import { RoomtoolFrameLayoutSpacingItem } from './RoomtoolFrameLayoutSpacingItem';
import { RoomtoolFrameLayoutSpacingItem2 } from './RoomtoolFrameLayoutSpacingItem2';
import { RoomtoolFrameLayoutSpacingItem3 } from './RoomtoolFrameLayoutSpacingItem3';
import { RoomtoolFrameLayoutSpacingItem4 } from './RoomtoolFrameLayoutSpacingItem4';
import { RoomtoolFrameLayoutSpacingItem5 } from './RoomtoolFrameLayoutSpacingItem5';
import { RoomtoolFrameLayoutSpacingItem6 } from './RoomtoolFrameLayoutSpacingItem6';

/** Named region `list_cont` of RoomtoolFrameLayout - configured through the parent's `listCont` prop. */
export interface RoomtoolFrameLayoutListContProps {
    itemsListCont?: ReactNode;
    layout?: BoxLayout;
}

export const RoomtoolFrameLayoutListCont = ({ itemsListCont, layout }: RoomtoolFrameLayoutListContProps) => {
    return (
        <Region
            name="list_cont"
            layout={{ position: 'absolute', left: 0, width: 230, top: 0, height: 405, flexDirection: 'column', ...layout }}
        >
            {itemsListCont ?? (
                <>
                    <RoomtoolFrameLayoutRoomContItem />
                    <RoomtoolFrameLayoutSpacingItem />
                    <RoomtoolFrameLayoutInfoContItem />
                    <RoomtoolFrameLayoutEventSpacingItem />
                    <RoomtoolFrameLayoutEventContItem />
                    <RoomtoolFrameLayoutSpacingItem2 />
                    <RoomtoolFrameLayoutActContItem />
                    <RoomtoolFrameLayoutSpacingItem3 />
                    <RoomtoolFrameLayoutMsgTemplatesSelectItem />
                    <RoomtoolFrameLayoutSpacingItem4 />
                    <RoomtoolFrameLayoutMessageInputItem />
                    <RoomtoolFrameLayoutSpacingItem5 />
                    <RoomtoolFrameLayoutSpacingItem6 />
                    <RoomtoolFrameLayoutFooterContItem />
                </>
            )}
        </Region>
    );
};
