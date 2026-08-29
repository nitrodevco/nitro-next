import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ScrollArea, ThemeText } from '#base/theme';

import { GrsMainWindowLayoutPromotedRoomsItem } from './GrsMainWindowLayoutPromotedRoomsItem';

/** Named region `list_content` of GrsMainWindowLayout - configured through the parent's `listContent` prop. */
export interface GrsMainWindowLayoutListContentProps {
    captionNoRoomsFound?: string;
    captionNoTagsFound?: string;
    captionRoomAdsNoRoomsFound?: string;
    itemsItemList?: ReactNode;
    itemsItemList2?: ReactNode;
    itemsItemList3?: ReactNode;
    itemsItemListOfficial?: ReactNode;
    layout?: BoxLayout;
}

export const GrsMainWindowLayoutListContent = ({ captionNoRoomsFound, captionNoTagsFound, captionRoomAdsNoRoomsFound, itemsItemList, itemsItemList2, itemsItemList3, itemsItemListOfficial, layout }: GrsMainWindowLayoutListContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="list_content"
            backgroundColor="#ffff00"
            layout={{ position: 'absolute', left: 0, width: 295, top: 0, bottom: 288, ...layout }}
        >
            <Region
                name="guest_rooms"
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center' }}
            >
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 0, right: 17, top: 0, bottom: 0 }}
                >
                    <Region
                        name="item_list"
                        layout={{ flexDirection: 'column', width: '100%' }}
                    >
                        {itemsItemList}
                    </Region>
                </ScrollArea>
                {/* <scrollbar_vertical> for item_list - rendered by that list's ScrollArea */}
                <Region
                    name="no_rooms_found"
                    layout={{ position: 'absolute', width: 295, top: 100, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionNoRoomsFound ?? t('navigator.noroomsfound')}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
            </Region>
            <Region
                name="room_ads"
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center' }}
            >
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 0, right: 17, top: 0, bottom: 0 }}
                >
                    <Region
                        name="item_list"
                        layout={{ flexDirection: 'column', width: '100%' }}
                    >
                        {itemsItemList2}
                    </Region>
                </ScrollArea>
                {/* <scrollbar_vertical> for item_list - rendered by that list's ScrollArea */}
                <Region
                    name="no_rooms_found"
                    layout={{ position: 'absolute', width: 295, top: 100, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionRoomAdsNoRoomsFound ?? t('navigator.noroomsfound')}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
            </Region>
            <Region
                name="popular_tags"
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center' }}
            >
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 0, right: 17, top: 0, bottom: 0 }}
                >
                    <Region
                        name="item_list"
                        layout={{ flexDirection: 'column', width: '100%' }}
                    >
                        {itemsItemList3}
                    </Region>
                </ScrollArea>
                {/* <scrollbar_vertical> for item_list - rendered by that list's ScrollArea */}
                <Region
                    name="no_tags_found"
                    layout={{ position: 'absolute', width: 295, top: 100, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionNoTagsFound ?? t('navigator.notagsfound')}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
            </Region>
            <Region
                name="official_rooms"
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 0, right: 17, top: 0, bottom: 0 }}
                >
                    <Region
                        name="item_list_official"
                        layout={{ flexDirection: 'column', width: '100%' }}
                    >
                        {itemsItemListOfficial ?? (
                            <GrsMainWindowLayoutPromotedRoomsItem />
                        )}
                    </Region>
                </ScrollArea>
                {/* <scrollbar_vertical> for item_list_official - rendered by that list's ScrollArea */}
            </Region>
        </Region>
    );
};
