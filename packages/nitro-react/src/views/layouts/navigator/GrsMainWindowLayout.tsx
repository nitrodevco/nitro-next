import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Dropmenu, Frame, Icon, Region, ScrollArea, TabButton, TabContext, TextInput, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3015_grs_main_window_xml` (layout "grs_main_window", 325x474) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsMainWindowLayoutProps {
    captionLoadingText?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    tabbedview?: GrsMainWindowLayoutTabbedviewProps;
}

export const GrsMainWindowLayout = ({ captionLoadingText, layout, onClose, tabbedview }: GrsMainWindowLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="0"
            id="grs_main_window"
            name="grs_main_window"
            tags={[ 'FIT:navigator' ]}
            params={98337}
            caption={t('navigator.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 325, height: 474, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <GrsMainWindowLayoutTabbedview {...tabbedview} />
                <Region
                    name="loading_text"
                    params={786432}
                    visible={false}
                    layout={{ position: 'absolute', marginLeft: -29.5, marginRight: 29.5, width: 104, top: 210, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionLoadingText ?? t('navigator.loading')} />
                </Region>
            </Region>
        </Frame>
    );
};

/** Named region `item_list` of GrsMainWindowLayout - configured through the parent's `itemList` prop. */
export interface GrsMainWindowLayoutItemListProps {
    layout?: BoxLayout;
}

export const GrsMainWindowLayoutItemList = ({ layout }: GrsMainWindowLayoutItemListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, right: 17, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="item_list"
                params={2177}
                layout={{ flexDirection: 'column', width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `guest_rooms` of GrsMainWindowLayout - configured through the parent's `guestRooms` prop. */
export interface GrsMainWindowLayoutGuestRoomsProps {
    captionNoRoomsFound?: string;
    itemList?: GrsMainWindowLayoutItemListProps;
    layout?: BoxLayout;
}

export const GrsMainWindowLayoutGuestRooms = ({ captionNoRoomsFound, itemList, layout }: GrsMainWindowLayoutGuestRoomsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="guest_rooms"
            params={2064}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 295, top: 0, bottom: 0, justifyContent: 'center', ...layout }}
        >
            <GrsMainWindowLayoutItemList {...itemList} />
            {/* <scrollbar_vertical> for item_list - rendered by that list's ScrollArea */}
            <Region
                name="no_rooms_found"
                params={786449}
                layout={{ position: 'absolute', width: 295, top: 100, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionNoRoomsFound ?? t('navigator.noroomsfound')}
                    textOptions={{ align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `item_list` of GrsMainWindowLayout - configured through the parent's `itemList` prop. */
export interface GrsMainWindowLayoutItemList2Props {
    layout?: BoxLayout;
}

export const GrsMainWindowLayoutItemList2 = ({ layout }: GrsMainWindowLayoutItemList2Props) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, right: 17, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="item_list"
                params={2177}
                layout={{ flexDirection: 'column', width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `room_ads` of GrsMainWindowLayout - configured through the parent's `roomAds` prop. */
export interface GrsMainWindowLayoutRoomAdsProps {
    captionNoRoomsFound?: string;
    itemList?: GrsMainWindowLayoutItemList2Props;
    layout?: BoxLayout;
}

export const GrsMainWindowLayoutRoomAds = ({ captionNoRoomsFound, itemList, layout }: GrsMainWindowLayoutRoomAdsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="room_ads"
            params={2064}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 295, top: 0, bottom: 0, justifyContent: 'center', ...layout }}
        >
            <GrsMainWindowLayoutItemList2 {...itemList} />
            {/* <scrollbar_vertical> for item_list - rendered by that list's ScrollArea */}
            <Region
                name="no_rooms_found"
                params={786449}
                layout={{ position: 'absolute', width: 295, top: 100, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionNoRoomsFound ?? t('navigator.noroomsfound')}
                    textOptions={{ align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `item_list` of GrsMainWindowLayout - configured through the parent's `itemList` prop. */
export interface GrsMainWindowLayoutItemList3Props {
    layout?: BoxLayout;
}

export const GrsMainWindowLayoutItemList3 = ({ layout }: GrsMainWindowLayoutItemList3Props) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, right: 17, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="item_list"
                params={2177}
                layout={{ flexDirection: 'column', width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `popular_tags` of GrsMainWindowLayout - configured through the parent's `popularTags` prop. */
export interface GrsMainWindowLayoutPopularTagsProps {
    captionNoTagsFound?: string;
    itemList?: GrsMainWindowLayoutItemList3Props;
    layout?: BoxLayout;
}

export const GrsMainWindowLayoutPopularTags = ({ captionNoTagsFound, itemList, layout }: GrsMainWindowLayoutPopularTagsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="popular_tags"
            params={2064}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 295, top: 0, bottom: 0, justifyContent: 'center', ...layout }}
        >
            <GrsMainWindowLayoutItemList3 {...itemList} />
            {/* <scrollbar_vertical> for item_list - rendered by that list's ScrollArea */}
            <Region
                name="no_tags_found"
                params={786449}
                layout={{ position: 'absolute', width: 295, top: 100, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionNoTagsFound ?? t('navigator.notagsfound')}
                    textOptions={{ align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `promoted_rooms` of GrsMainWindowLayout - pass real rows through its `items…` slot. */
export interface GrsMainWindowLayoutPromotedRoomsItemProps {
    layout?: BoxLayout;
}

export const GrsMainWindowLayoutPromotedRoomsItem = ({ layout }: GrsMainWindowLayoutPromotedRoomsItemProps) => {
    return (
        <Region
            name="promoted_rooms"
            params={16}
            backgroundColor="#ffffff"
            layout={{ width: 278, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `item_list_official` of GrsMainWindowLayout - configured through the parent's `itemListOfficial` prop. */
export interface GrsMainWindowLayoutItemListOfficialProps {
    itemsItemListOfficial?: ReactNode;
    layout?: BoxLayout;
}

export const GrsMainWindowLayoutItemListOfficial = ({ itemsItemListOfficial, layout }: GrsMainWindowLayoutItemListOfficialProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, right: 17, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="item_list_official"
                params={2177}
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsItemListOfficial ?? (
                    <GrsMainWindowLayoutPromotedRoomsItem />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `official_rooms` of GrsMainWindowLayout - configured through the parent's `officialRooms` prop. */
export interface GrsMainWindowLayoutOfficialRoomsProps {
    itemListOfficial?: GrsMainWindowLayoutItemListOfficialProps;
    layout?: BoxLayout;
}

export const GrsMainWindowLayoutOfficialRooms = ({ itemListOfficial, layout }: GrsMainWindowLayoutOfficialRoomsProps) => {
    return (
        <Region
            name="official_rooms"
            params={2064}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 295, top: 0, bottom: 0, ...layout }}
        >
            <GrsMainWindowLayoutItemListOfficial {...itemListOfficial} />
            {/* <scrollbar_vertical> for item_list_official - rendered by that list's ScrollArea */}
        </Region>
    );
};

/** Named region `list_content` of GrsMainWindowLayout - configured through the parent's `listContent` prop. */
export interface GrsMainWindowLayoutListContentProps {
    guestRooms?: GrsMainWindowLayoutGuestRoomsProps;
    layout?: BoxLayout;
    officialRooms?: GrsMainWindowLayoutOfficialRoomsProps;
    popularTags?: GrsMainWindowLayoutPopularTagsProps;
    roomAds?: GrsMainWindowLayoutRoomAdsProps;
}

export const GrsMainWindowLayoutListContent = ({ guestRooms, layout, officialRooms, popularTags, roomAds }: GrsMainWindowLayoutListContentProps) => {
    return (
        <Region
            name="list_content"
            params={2048}
            backgroundColor="#ffff00"
            layout={{ position: 'absolute', left: 0, width: 295, top: 0, bottom: 288, ...layout }}
        >
            <GrsMainWindowLayoutGuestRooms {...guestRooms} />
            <GrsMainWindowLayoutRoomAds {...roomAds} />
            <GrsMainWindowLayoutPopularTags {...popularTags} />
            <GrsMainWindowLayoutOfficialRooms {...officialRooms} />
        </Region>
    );
};

/** Named region `me_header` of GrsMainWindowLayout - configured through the parent's `meHeader` prop. */
export interface GrsMainWindowLayoutMeHeaderProps {
    layout?: BoxLayout;
    onMeHeader?: () => void;
    onMeSubNavi?: () => void;
    visibleMeHeader?: boolean;
}

export const GrsMainWindowLayoutMeHeader = ({ layout, onMeHeader, onMeSubNavi, visibleMeHeader }: GrsMainWindowLayoutMeHeaderProps) => {
    return (
        <Region
            name="me_header"
            params={17}
            visible={visibleMeHeader ?? false}
            onPointerTap={onMeHeader}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 307, top: 0, height: 20, ...layout }}
        >
            <Dropmenu
                variant="0"
                name="meSubNavi"
                params={1}
                onPointerTap={onMeSubNavi}
                layout={{ position: 'absolute', left: 0, width: 293, top: 0, height: 20 }}
            />
        </Region>
    );
};

/** Named region `rooms_header` of GrsMainWindowLayout - configured through the parent's `roomsHeader` prop. */
export interface GrsMainWindowLayoutRoomsHeaderProps {
    layout?: BoxLayout;
    onRoomCtgFilter?: () => void;
    onRoomsHeader?: () => void;
    visibleRoomsHeader?: boolean;
}

export const GrsMainWindowLayoutRoomsHeader = ({ layout, onRoomCtgFilter, onRoomsHeader, visibleRoomsHeader }: GrsMainWindowLayoutRoomsHeaderProps) => {
    return (
        <Region
            name="rooms_header"
            params={17}
            visible={visibleRoomsHeader ?? false}
            onPointerTap={onRoomsHeader}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 307, top: 0, height: 20, ...layout }}
        >
            <Dropmenu
                variant="0"
                name="roomCtgFilter"
                params={1}
                onPointerTap={onRoomCtgFilter}
                layout={{ position: 'absolute', left: 0, width: 293, top: 0, height: 20 }}
            />
        </Region>
    );
};

/** Named region `room_ad_header` of GrsMainWindowLayout - configured through the parent's `roomAdHeader` prop. */
export interface GrsMainWindowLayoutRoomAdHeaderProps {
    layout?: BoxLayout;
    onRoomAdFilter?: () => void;
    onRoomAdHeader?: () => void;
    visibleRoomAdHeader?: boolean;
}

export const GrsMainWindowLayoutRoomAdHeader = ({ layout, onRoomAdFilter, onRoomAdHeader, visibleRoomAdHeader }: GrsMainWindowLayoutRoomAdHeaderProps) => {
    return (
        <Region
            name="room_ad_header"
            params={17}
            visible={visibleRoomAdHeader ?? false}
            onPointerTap={onRoomAdHeader}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 307, top: 0, height: 20, ...layout }}
        >
            <Dropmenu
                variant="0"
                name="roomAdFilter"
                params={1}
                onPointerTap={onRoomAdFilter}
                layout={{ position: 'absolute', left: 0, width: 293, top: 0, height: 20 }}
            />
        </Region>
    );
};

/** Named region `room_competitions_header` of GrsMainWindowLayout - configured through the parent's `roomCompetitionsHeader` prop. */
export interface GrsMainWindowLayoutRoomCompetitionsHeaderProps {
    layout?: BoxLayout;
    onNextButton?: () => void;
    onPrevButton?: () => void;
    onRoomCompetitionsHeader?: () => void;
}

export const GrsMainWindowLayoutRoomCompetitionsHeader = ({ layout, onNextButton, onPrevButton, onRoomCompetitionsHeader }: GrsMainWindowLayoutRoomCompetitionsHeaderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="room_competitions_header"
            params={17}
            onPointerTap={onRoomCompetitionsHeader}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 307, top: 0, height: 33, justifyContent: 'center', ...layout }}
        >
            <Region
                params={786449}
                layout={{ position: 'absolute', marginLeft: -6, marginRight: 6, width: 295, top: 8, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={t('navigator.roomcompetitionspager')}
                    textOptions={{ align: 'center' }}
                />
            </Region>
            <ContainerButton
                variant="0"
                name="prev_button"
                params={17}
                onPointerTap={onPrevButton}
                layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
            >
                <Icon
                    variant="4"
                    params={16}
                    tintColor="#000000"
                    layout={{ position: 'absolute', left: 12, width: 5, top: 10, height: 9 }}
                />
            </ContainerButton>
            <ContainerButton
                variant="0"
                name="next_button"
                params={17}
                onPointerTap={onNextButton}
                layout={{ position: 'absolute', left: 262, width: 30, top: 0, height: 30 }}
            >
                <Icon
                    variant="5"
                    params={16}
                    tintColor="#000000"
                    layout={{ position: 'absolute', left: 12, width: 5, top: 10, height: 9 }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Named region `custom_content` of GrsMainWindowLayout - configured through the parent's `customContent` prop. */
export interface GrsMainWindowLayoutCustomContentProps {
    layout?: BoxLayout;
    meHeader?: GrsMainWindowLayoutMeHeaderProps;
    onCustomContent?: () => void;
    roomAdHeader?: GrsMainWindowLayoutRoomAdHeaderProps;
    roomCompetitionsHeader?: GrsMainWindowLayoutRoomCompetitionsHeaderProps;
    roomsHeader?: GrsMainWindowLayoutRoomsHeaderProps;
}

export const GrsMainWindowLayoutCustomContent = ({ layout, meHeader, onCustomContent, roomAdHeader, roomCompetitionsHeader, roomsHeader }: GrsMainWindowLayoutCustomContentProps) => {
    return (
        <Region
            name="custom_content"
            params={1}
            onPointerTap={onCustomContent}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 307, top: 0, height: 50, ...layout }}
        >
            <GrsMainWindowLayoutMeHeader {...meHeader} />
            <GrsMainWindowLayoutRoomsHeader {...roomsHeader} />
            <GrsMainWindowLayoutRoomAdHeader {...roomAdHeader} />
            <GrsMainWindowLayoutRoomCompetitionsHeader {...roomCompetitionsHeader} />
        </Region>
    );
};

/** Named region `me_footer` of GrsMainWindowLayout - configured through the parent's `meFooter` prop. */
export interface GrsMainWindowLayoutMeFooterProps {
    captionMoreRoomsCaption?: string;
    layout?: BoxLayout;
    onCreateRoomBut?: () => void;
    onMeFooter?: () => void;
    srcCreateRoom?: string;
}

export const GrsMainWindowLayoutMeFooter = ({ captionMoreRoomsCaption, layout, onCreateRoomBut, onMeFooter, srcCreateRoom }: GrsMainWindowLayoutMeFooterProps) => {
    const t = useTranslation();

    return (
        <Region
            name="me_footer"
            params={17}
            onPointerTap={onMeFooter}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 307, top: 0, height: 37, ...layout }}
        >
            <Border
                variant="0"
                name="more_rooms_container"
                params={17}
                tintColor="#cccccc"
                layout={{ position: 'absolute', left: 0, width: 294, top: 8, height: 29 }}
            >
                <ThemeImage
                    name="create_room"
                    params={16}
                    src={srcCreateRoom}
                    layout={{ position: 'absolute', left: 4, width: 23, top: 3, height: 23 }}
                />
                <Region
                    name="more_rooms_caption"
                    params={16}
                    layout={{ position: 'absolute', left: 32, width: 146, top: 8, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionMoreRoomsCaption ?? t('navigator.moreroomscaption')} />
                </Region>
                <Button
                    variant="0"
                    name="create_room_but"
                    params={131089}
                    onPointerTap={onCreateRoomBut}
                    layout={{ position: 'absolute', left: 187, width: 102, top: 4, height: 21, minWidth: 102, maxWidth: 102 }}
                >
                    {t('navigator.createroom')}
                </Button>
            </Border>
        </Region>
    );
};

/** Named region `ad_cont` of GrsMainWindowLayout - configured through the parent's `adCont` prop. */
export interface GrsMainWindowLayoutAdContProps {
    layout?: BoxLayout;
    onAdCont?: () => void;
}

export const GrsMainWindowLayoutAdCont = ({ layout, onAdCont }: GrsMainWindowLayoutAdContProps) => {
    return (
        <Region
            name="ad_cont"
            params={17}
            backgroundColor="#ffffff"
            onPointerTap={onAdCont}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 271, top: 16, height: 68, ...layout }}
        />
    );
};

/** Named region `ad_footer` of GrsMainWindowLayout - configured through the parent's `adFooter` prop. */
export interface GrsMainWindowLayoutAdFooterProps {
    adCont?: GrsMainWindowLayoutAdContProps;
    captionAdCaption?: string;
    layout?: BoxLayout;
    onAdFooter?: () => void;
}

export const GrsMainWindowLayoutAdFooter = ({ adCont, captionAdCaption, layout, onAdFooter }: GrsMainWindowLayoutAdFooterProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ad_footer"
            params={17}
            onPointerTap={onAdFooter}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 307, top: 0, height: 85, ...layout }}
        >
            <Region
                name="ad_caption"
                params={16}
                layout={{ position: 'absolute', left: 6, width: 121, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionAdCaption ?? t('navigator.adcaption')} />
            </Region>
            <GrsMainWindowLayoutAdCont {...adCont} />
        </Region>
    );
};

/** Named region `room_ads_footer` of GrsMainWindowLayout - configured through the parent's `roomAdsFooter` prop. */
export interface GrsMainWindowLayoutRoomAdsFooterProps {
    captionGetEventCaption?: string;
    layout?: BoxLayout;
    onGetEventBut?: () => void;
    onRoomAdsFooter?: () => void;
}

export const GrsMainWindowLayoutRoomAdsFooter = ({ captionGetEventCaption, layout, onGetEventBut, onRoomAdsFooter }: GrsMainWindowLayoutRoomAdsFooterProps) => {
    const t = useTranslation();

    return (
        <Region
            name="room_ads_footer"
            params={17}
            onPointerTap={onRoomAdsFooter}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 307, top: 0, height: 37, ...layout }}
        >
            <Border
                variant="0"
                name="link_to_navigator_container"
                params={17}
                tintColor="#cccccc"
                layout={{ position: 'absolute', left: 0, width: 294, top: 8, height: 29 }}
            >
                <Region
                    name="get_event_caption"
                    params={16}
                    layout={{ position: 'absolute', left: 5, width: 150, top: 8, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionGetEventCaption ?? t('roomad.get.event.caption')}
                        textStyle="text-style-il-regular"
                    />
                </Region>
                <Button
                    variant="0"
                    name="get_event_but"
                    params={131089}
                    onPointerTap={onGetEventBut}
                    layout={{ position: 'absolute', left: 187, width: 102, top: 4, height: 21, minWidth: 102, maxWidth: 102 }}
                >
                    {t('roomad.get.event')}
                </Button>
            </Border>
        </Region>
    );
};

/** Named region `custom_footer` of GrsMainWindowLayout - configured through the parent's `customFooter` prop. */
export interface GrsMainWindowLayoutCustomFooterProps {
    adFooter?: GrsMainWindowLayoutAdFooterProps;
    layout?: BoxLayout;
    meFooter?: GrsMainWindowLayoutMeFooterProps;
    onCustomFooter?: () => void;
    roomAdsFooter?: GrsMainWindowLayoutRoomAdsFooterProps;
}

export const GrsMainWindowLayoutCustomFooter = ({ adFooter, layout, meFooter, onCustomFooter, roomAdsFooter }: GrsMainWindowLayoutCustomFooterProps) => {
    return (
        <Region
            name="custom_footer"
            params={1025}
            onPointerTap={onCustomFooter}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 307, bottom: 668, height: 0, ...layout }}
        >
            <GrsMainWindowLayoutMeFooter {...meFooter} />
            <GrsMainWindowLayoutAdFooter {...adFooter} />
            <GrsMainWindowLayoutRoomAdsFooter {...roomAdsFooter} />
        </Region>
    );
};

/** Named region `tab_content` of GrsMainWindowLayout - configured through the parent's `tabContent` prop. */
export interface GrsMainWindowLayoutTabContentProps {
    customContent?: GrsMainWindowLayoutCustomContentProps;
    customFooter?: GrsMainWindowLayoutCustomFooterProps;
    layout?: BoxLayout;
    listContent?: GrsMainWindowLayoutListContentProps;
    onTabContent?: () => void;
}

export const GrsMainWindowLayoutTabContent = ({ customContent, customFooter, layout, listContent, onTabContent }: GrsMainWindowLayoutTabContentProps) => {
    return (
        <Region
            name="tab_content"
            params={2065}
            onPointerTap={onTabContent}
            cursor="pointer"
            layout={{ position: 'absolute', left: 10, width: 313, top: 60, bottom: -286, ...layout }}
        >
            <GrsMainWindowLayoutListContent {...listContent} />
            <GrsMainWindowLayoutCustomContent {...customContent} />
            <GrsMainWindowLayoutCustomFooter {...customFooter} />
        </Region>
    );
};

/** Named region `tabbedview` of GrsMainWindowLayout - configured through the parent's `tabbedview` prop. */
export interface GrsMainWindowLayoutTabbedviewProps {
    layout?: BoxLayout;
    onNavigatorTab1?: () => void;
    onNavigatorTab2?: () => void;
    onNavigatorTab3?: () => void;
    onNavigatorTab4?: () => void;
    onNavigatorTab5?: () => void;
    onSearchBut?: () => void;
    onTabbedview?: () => void;
    tabContent?: GrsMainWindowLayoutTabContentProps;
}

export const GrsMainWindowLayoutTabbedview = ({ layout, onNavigatorTab1, onNavigatorTab2, onNavigatorTab3, onNavigatorTab4, onNavigatorTab5, onSearchBut, onTabbedview, tabContent }: GrsMainWindowLayoutTabbedviewProps) => {
    const t = useTranslation();
    const [ searchStrValue, setSearchStrValue ] = useState('');

    return (
        <Region
            name="tabbedview"
            params={2065}
            onPointerTap={onTabbedview}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 313, top: 0, bottom: 32, ...layout }}
        >
            <TabContext
                variant="0"
                name="tab_context"
                params={2193}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <TabButton
                    variant="0"
                    name="navigator_tab_4"
                    tags={[ 'FIT:navigatorSpecialTab' ]}
                    params={131089}
                    onPointerTap={onNavigatorTab4}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 22 }}
                >
                    {t('navigator.tab.special')}
                </TabButton>
                <TabButton
                    variant="0"
                    name="navigator_tab_2"
                    tags={[ 'FIT:navigatorRoomsTab' ]}
                    params={131089}
                    onPointerTap={onNavigatorTab2}
                    layout={{ position: 'absolute', left: 123, width: 20, top: 0, height: 22 }}
                >
                    {t('navigator.tab.rooms')}
                </TabButton>
                <TabButton
                    variant="0"
                    name="navigator_tab_1"
                    tags={[ 'FIT:navigatorEventsTab' ]}
                    params={131089}
                    onPointerTap={onNavigatorTab1}
                    layout={{ position: 'absolute', left: 244, width: 20, top: 0, height: 22 }}
                >
                    {t('navigator.tab.events')}
                </TabButton>
                <TabButton
                    variant="0"
                    name="navigator_tab_3"
                    tags={[ 'FIT:navigatorMeTab' ]}
                    params={131089}
                    onPointerTap={onNavigatorTab3}
                    layout={{ position: 'absolute', left: 369, width: 20, top: 0, height: 22 }}
                >
                    {t('navigator.tab.me')}
                </TabButton>
                <TabButton
                    variant="0"
                    name="navigator_tab_5"
                    tags={[ 'FIT:navigatorSearchTab' ]}
                    params={131089}
                    onPointerTap={onNavigatorTab5}
                    layout={{ position: 'absolute', left: 473, width: 20, top: 0, height: 22 }}
                >
                    {t('navigator.tab.search')}
                </TabButton>
            </TabContext>
            <Border
                variant="0"
                name="search_header"
                params={17}
                tintColor="#cccccc"
                layout={{ position: 'absolute', left: 9, width: 294, top: 26, height: 30 }}
            >
                <TextInput
                    value={searchStrValue}
                    onChange={setSearchStrValue}
                    backgroundColor="#ffffff"
                    layout={{ position: 'absolute', left: 5, width: 216, top: 5, height: 16 }}
                />
                <Button
                    variant="0"
                    name="search_but"
                    tags={[ 'FIT:navigatorSearchButton' ]}
                    params={131089}
                    onPointerTap={onSearchBut}
                    layout={{ position: 'absolute', left: 225, width: 65, top: 3, height: 21, minWidth: 65, maxWidth: 65 }}
                >
                    {t('generic.search')}
                </Button>
            </Border>
            <GrsMainWindowLayoutTabContent {...tabContent} />
        </Region>
    );
};
