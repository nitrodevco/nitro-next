import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeText } from '#base/theme';

import { RoomToolsInfoLayoutTag1BorderItem } from './RoomToolsInfoLayoutTag1BorderItem';
import { RoomToolsInfoLayoutTag2BorderItem } from './RoomToolsInfoLayoutTag2BorderItem';

/** Named region `owner_name_and_tags` of RoomToolsInfoLayout - configured through the parent's `ownerNameAndTags` prop. */
export interface RoomToolsInfoLayoutOwnerNameAndTagsProps {
    captionRoomOwner?: string;
    itemsTags?: ReactNode;
    layout?: BoxLayout;
}

export const RoomToolsInfoLayoutOwnerNameAndTags = ({ captionRoomOwner, itemsTags, layout }: RoomToolsInfoLayoutOwnerNameAndTagsProps) => {
    return (
        <Region
            name="owner_name_and_tags"
            layout={{ position: 'absolute', left: 10, width: 126, top: 33, height: 44, maxWidth: 300, ...layout }}
        >
            <ThemeText
                text={captionRoomOwner ?? '...'}
                textStyle="text-style-u-headline-medium"
                textOptions={{ fill: '#999999' }}
                name="room_owner"
                layout={{ position: 'absolute', left: 0, top: 0, height: 21, maxWidth: 300 }}
            />
            <Region
                name="tags"
                layout={{ position: 'absolute', left: 0, top: 25, maxWidth: 230, flexDirection: 'row', gap: 4 }}
            >
                {itemsTags ?? (
                    <>
                        <RoomToolsInfoLayoutTag1BorderItem />
                        <RoomToolsInfoLayoutTag2BorderItem />
                    </>
                )}
            </Region>
        </Region>
    );
};
