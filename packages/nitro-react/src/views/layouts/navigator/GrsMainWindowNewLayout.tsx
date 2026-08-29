import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Dropmenu, Frame, Icon, Region, ScrollArea, TabButton, TabContext, TextInput, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3041_grs_main_window_new_xml` (layout "grs_main_window_new", 400x474) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsMainWindowNewLayoutProps {
    captionLoadingText?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    tabbedview?: GrsMainWindowNewLayoutTabbedviewProps;
}

export const GrsMainWindowNewLayout = ({ captionLoadingText, layout, onClose, tabbedview }: GrsMainWindowNewLayoutProps) => {
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
            layout={{ width: 400, height: 474, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <GrsMainWindowNewLayoutTabbedview {...tabbedview} />
                <Region
                    name="loading_text"
                    params={786432}
                    visible={false}
                    layout={{ position: 'absolute', marginLeft: -67, marginRight: 67, width: 104, top: 210, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionLoadingText ?? t('navigator.loading')} />
                </Region>
            </Region>
        </Frame>
    );
};

/** Named region `item_list` of GrsMainWindowNewLayout - configured through the parent's `itemList` prop. */
export interface GrsMainWindowNewLayoutItemListProps {
    layout?: BoxLayout;
}

export const GrsMainWindowNewLayoutItemList = ({ layout }: GrsMainWindowNewLayoutItemListProps) => {
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

/** Named region `guest_rooms` of GrsMainWindowNewLayout - configured through the parent's `guestRooms` prop. */
export interface GrsMainWindowNewLayoutGuestRoomsProps {
    captionNoRoomsFound?: string;
    itemList?: GrsMainWindowNewLayoutItemListProps;
    layout?: BoxLayout;
}

export const GrsMainWindowNewLayoutGuestRooms = ({ captionNoRoomsFound, itemList, layout }: GrsMainWindowNewLayoutGuestRoomsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="guest_rooms"
            params={2064}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 370, top: 0, bottom: 0, justifyContent: 'center', ...layout }}
        >
            <GrsMainWindowNewLayoutItemList {...itemList} />
            {/* <scrollbar_vertical> for item_list - rendered by that list's ScrollArea */}
            <Region
                name="no_rooms_found"
                params={786449}
                layout={{ position: 'absolute', marginLeft: -37.5, marginRight: 37.5, width: 295, top: 100, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionNoRoomsFound ?? t('navigator.noroomsfound')}
                    textOptions={{ align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `item_list` of GrsMainWindowNewLayout - configured through the parent's `itemList` prop. */
export interface GrsMainWindowNewLayoutItemList2Props {
    layout?: BoxLayout;
}

export const GrsMainWindowNewLayoutItemList2 = ({ layout }: GrsMainWindowNewLayoutItemList2Props) => {
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

/** Named region `room_ads` of GrsMainWindowNewLayout - configured through the parent's `roomAds` prop. */
export interface GrsMainWindowNewLayoutRoomAdsProps {
    captionNoRoomsFound?: string;
    itemList?: GrsMainWindowNewLayoutItemList2Props;
    layout?: BoxLayout;
}

export const GrsMainWindowNewLayoutRoomAds = ({ captionNoRoomsFound, itemList, layout }: GrsMainWindowNewLayoutRoomAdsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="room_ads"
            params={2064}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 395, top: 0, bottom: 0, justifyContent: 'center', ...layout }}
        >
            <GrsMainWindowNewLayoutItemList2 {...itemList} />
            {/* <scrollbar_vertical> for item_list - rendered by that list's ScrollArea */}
            <Region
                name="no_rooms_found"
                params={786449}
                layout={{ position: 'absolute', marginLeft: -50, marginRight: 50, width: 295, top: 100, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionNoRoomsFound ?? t('navigator.noroomsfound')}
                    textOptions={{ align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `item_list` of GrsMainWindowNewLayout - configured through the parent's `itemList` prop. */
export interface GrsMainWindowNewLayoutItemList3Props {
    layout?: BoxLayout;
}

export const GrsMainWindowNewLayoutItemList3 = ({ layout }: GrsMainWindowNewLayoutItemList3Props) => {
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

/** Named region `popular_tags` of GrsMainWindowNewLayout - configured through the parent's `popularTags` prop. */
export interface GrsMainWindowNewLayoutPopularTagsProps {
    captionNoTagsFound?: string;
    itemList?: GrsMainWindowNewLayoutItemList3Props;
    layout?: BoxLayout;
    visiblePopularTags?: boolean;
}

export const GrsMainWindowNewLayoutPopularTags = ({ captionNoTagsFound, itemList, layout, visiblePopularTags }: GrsMainWindowNewLayoutPopularTagsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="popular_tags"
            params={2064}
            visible={visiblePopularTags ?? false}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 395, top: 0, bottom: 0, justifyContent: 'center', ...layout }}
        >
            <GrsMainWindowNewLayoutItemList3 {...itemList} />
            {/* <scrollbar_vertical> for item_list - rendered by that list's ScrollArea */}
            <Region
                name="no_tags_found"
                params={786449}
                layout={{ position: 'absolute', marginLeft: -50, marginRight: 50, width: 295, top: 100, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionNoTagsFound ?? t('navigator.notagsfound')}
                    textOptions={{ align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `top_categories` of GrsMainWindowNewLayout - pass real rows through its `items…` slot. */
export interface GrsMainWindowNewLayoutTopCategoriesItemProps {
    layout?: BoxLayout;
}

export const GrsMainWindowNewLayoutTopCategoriesItem = ({ layout }: GrsMainWindowNewLayoutTopCategoriesItemProps) => {
    return (
        <Region
            name="top_categories"
            params={16}
            backgroundColor="#ffffff"
            layout={{ width: 353, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `item_list_category` of GrsMainWindowNewLayout - configured through the parent's `itemListCategory` prop. */
export interface GrsMainWindowNewLayoutItemListCategoryProps {
    itemsItemListCategory?: ReactNode;
    layout?: BoxLayout;
}

export const GrsMainWindowNewLayoutItemListCategory = ({ itemsItemListCategory, layout }: GrsMainWindowNewLayoutItemListCategoryProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, right: 17, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="item_list_category"
                params={2177}
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsItemListCategory ?? (
                    <GrsMainWindowNewLayoutTopCategoriesItem />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `categories_container` of GrsMainWindowNewLayout - configured through the parent's `categoriesContainer` prop. */
export interface GrsMainWindowNewLayoutCategoriesContainerProps {
    itemListCategory?: GrsMainWindowNewLayoutItemListCategoryProps;
    layout?: BoxLayout;
}

export const GrsMainWindowNewLayoutCategoriesContainer = ({ itemListCategory, layout }: GrsMainWindowNewLayoutCategoriesContainerProps) => {
    return (
        <Region
            name="categories_container"
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 395, top: 0, bottom: 0, ...layout }}
        >
            <GrsMainWindowNewLayoutItemListCategory {...itemListCategory} />
            {/* <scrollbar_vertical> for item_list_category - rendered by that list's ScrollArea */}
        </Region>
    );
};

/** Row template `promoted_rooms` of GrsMainWindowNewLayout - pass real rows through its `items…` slot. */
export interface GrsMainWindowNewLayoutPromotedRoomsItemProps {
    layout?: BoxLayout;
}

export const GrsMainWindowNewLayoutPromotedRoomsItem = ({ layout }: GrsMainWindowNewLayoutPromotedRoomsItemProps) => {
    return (
        <Region
            name="promoted_rooms"
            params={16}
            backgroundColor="#ffffff"
            layout={{ width: 353, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `item_list_official` of GrsMainWindowNewLayout - configured through the parent's `itemListOfficial` prop. */
export interface GrsMainWindowNewLayoutItemListOfficialProps {
    itemsItemListOfficial?: ReactNode;
    layout?: BoxLayout;
}

export const GrsMainWindowNewLayoutItemListOfficial = ({ itemsItemListOfficial, layout }: GrsMainWindowNewLayoutItemListOfficialProps) => {
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
                    <GrsMainWindowNewLayoutPromotedRoomsItem />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `official_rooms` of GrsMainWindowNewLayout - configured through the parent's `officialRooms` prop. */
export interface GrsMainWindowNewLayoutOfficialRoomsProps {
    itemListOfficial?: GrsMainWindowNewLayoutItemListOfficialProps;
    layout?: BoxLayout;
}

export const GrsMainWindowNewLayoutOfficialRooms = ({ itemListOfficial, layout }: GrsMainWindowNewLayoutOfficialRoomsProps) => {
    return (
        <Region
            name="official_rooms"
            params={2064}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 370, top: 0, bottom: 0, ...layout }}
        >
            <GrsMainWindowNewLayoutItemListOfficial {...itemListOfficial} />
            {/* <scrollbar_vertical> for item_list_official - rendered by that list's ScrollArea */}
        </Region>
    );
};

/** Named region `list_content` of GrsMainWindowNewLayout - configured through the parent's `listContent` prop. */
export interface GrsMainWindowNewLayoutListContentProps {
    categoriesContainer?: GrsMainWindowNewLayoutCategoriesContainerProps;
    guestRooms?: GrsMainWindowNewLayoutGuestRoomsProps;
    layout?: BoxLayout;
    officialRooms?: GrsMainWindowNewLayoutOfficialRoomsProps;
    popularTags?: GrsMainWindowNewLayoutPopularTagsProps;
    roomAds?: GrsMainWindowNewLayoutRoomAdsProps;
}

export const GrsMainWindowNewLayoutListContent = ({ categoriesContainer, guestRooms, layout, officialRooms, popularTags, roomAds }: GrsMainWindowNewLayoutListContentProps) => {
    return (
        <Region
            name="list_content"
            params={2048}
            backgroundColor="#ffff00"
            layout={{ position: 'absolute', left: 0, width: 370, top: 0, bottom: 288, ...layout }}
        >
            <GrsMainWindowNewLayoutGuestRooms {...guestRooms} />
            <GrsMainWindowNewLayoutRoomAds {...roomAds} />
            <GrsMainWindowNewLayoutPopularTags {...popularTags} />
            <GrsMainWindowNewLayoutCategoriesContainer {...categoriesContainer} />
            <GrsMainWindowNewLayoutOfficialRooms {...officialRooms} />
        </Region>
    );
};

/** Named region `me_header` of GrsMainWindowNewLayout - configured through the parent's `meHeader` prop. */
export interface GrsMainWindowNewLayoutMeHeaderProps {
    layout?: BoxLayout;
    onMeHeader?: () => void;
    onMeSubNavi?: () => void;
    visibleMeHeader?: boolean;
}

export const GrsMainWindowNewLayoutMeHeader = ({ layout, onMeHeader, onMeSubNavi, visibleMeHeader }: GrsMainWindowNewLayoutMeHeaderProps) => {
    return (
        <Region
            name="me_header"
            params={17}
            visible={visibleMeHeader ?? false}
            onPointerTap={onMeHeader}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 382, top: 0, height: 20, ...layout }}
        >
            <Dropmenu
                variant="0"
                name="meSubNavi"
                params={1}
                onPointerTap={onMeSubNavi}
                layout={{ position: 'absolute', left: 0, width: 368, top: 0, height: 20 }}
            />
        </Region>
    );
};

/** Named region `rooms_header` of GrsMainWindowNewLayout - configured through the parent's `roomsHeader` prop. */
export interface GrsMainWindowNewLayoutRoomsHeaderProps {
    layout?: BoxLayout;
    onRoomCtgFilter?: () => void;
    onRoomsHeader?: () => void;
    visibleRoomsHeader?: boolean;
}

export const GrsMainWindowNewLayoutRoomsHeader = ({ layout, onRoomCtgFilter, onRoomsHeader, visibleRoomsHeader }: GrsMainWindowNewLayoutRoomsHeaderProps) => {
    return (
        <Region
            name="rooms_header"
            params={17}
            visible={visibleRoomsHeader ?? false}
            onPointerTap={onRoomsHeader}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 382, top: 0, height: 20, ...layout }}
        >
            <Dropmenu
                variant="0"
                name="roomCtgFilter"
                params={1}
                onPointerTap={onRoomCtgFilter}
                layout={{ position: 'absolute', left: 0, width: 368, top: 0, height: 20 }}
            />
        </Region>
    );
};

/** Named region `room_ad_header` of GrsMainWindowNewLayout - configured through the parent's `roomAdHeader` prop. */
export interface GrsMainWindowNewLayoutRoomAdHeaderProps {
    layout?: BoxLayout;
    onRoomAdFilter?: () => void;
    onRoomAdHeader?: () => void;
    visibleRoomAdHeader?: boolean;
}

export const GrsMainWindowNewLayoutRoomAdHeader = ({ layout, onRoomAdFilter, onRoomAdHeader, visibleRoomAdHeader }: GrsMainWindowNewLayoutRoomAdHeaderProps) => {
    return (
        <Region
            name="room_ad_header"
            params={17}
            visible={visibleRoomAdHeader ?? false}
            onPointerTap={onRoomAdHeader}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 382, top: 0, height: 20, ...layout }}
        >
            <Dropmenu
                variant="0"
                name="roomAdFilter"
                params={1}
                onPointerTap={onRoomAdFilter}
                layout={{ position: 'absolute', left: 0, width: 368, top: 0, height: 20 }}
            />
        </Region>
    );
};

/** Named region `room_competitions_header` of GrsMainWindowNewLayout - configured through the parent's `roomCompetitionsHeader` prop. */
export interface GrsMainWindowNewLayoutRoomCompetitionsHeaderProps {
    layout?: BoxLayout;
    onNextButton?: () => void;
    onPrevButton?: () => void;
    onRoomCompetitionsHeader?: () => void;
}

export const GrsMainWindowNewLayoutRoomCompetitionsHeader = ({ layout, onNextButton, onPrevButton, onRoomCompetitionsHeader }: GrsMainWindowNewLayoutRoomCompetitionsHeaderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="room_competitions_header"
            params={17}
            onPointerTap={onRoomCompetitionsHeader}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 382, top: 0, height: 33, justifyContent: 'center', ...layout }}
        >
            <Region
                params={786449}
                layout={{ position: 'absolute', marginLeft: -5, marginRight: 5, width: 370, top: 8, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
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
                layout={{ position: 'absolute', left: 315, width: 30, top: 0, height: 30 }}
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

/** Named region `custom_content` of GrsMainWindowNewLayout - configured through the parent's `customContent` prop. */
export interface GrsMainWindowNewLayoutCustomContentProps {
    layout?: BoxLayout;
    meHeader?: GrsMainWindowNewLayoutMeHeaderProps;
    onCustomContent?: () => void;
    roomAdHeader?: GrsMainWindowNewLayoutRoomAdHeaderProps;
    roomCompetitionsHeader?: GrsMainWindowNewLayoutRoomCompetitionsHeaderProps;
    roomsHeader?: GrsMainWindowNewLayoutRoomsHeaderProps;
}

export const GrsMainWindowNewLayoutCustomContent = ({ layout, meHeader, onCustomContent, roomAdHeader, roomCompetitionsHeader, roomsHeader }: GrsMainWindowNewLayoutCustomContentProps) => {
    return (
        <Region
            name="custom_content"
            params={1}
            onPointerTap={onCustomContent}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 382, top: 0, height: 50, ...layout }}
        >
            <GrsMainWindowNewLayoutMeHeader {...meHeader} />
            <GrsMainWindowNewLayoutRoomsHeader {...roomsHeader} />
            <GrsMainWindowNewLayoutRoomAdHeader {...roomAdHeader} />
            <GrsMainWindowNewLayoutRoomCompetitionsHeader {...roomCompetitionsHeader} />
        </Region>
    );
};

/** Named region `me_footer` of GrsMainWindowNewLayout - configured through the parent's `meFooter` prop. */
export interface GrsMainWindowNewLayoutMeFooterProps {
    captionMoreRoomsCaption?: string;
    layout?: BoxLayout;
    onCreateRoomBut?: () => void;
    onMeFooter?: () => void;
    srcCreateRoom?: string;
}

export const GrsMainWindowNewLayoutMeFooter = ({ captionMoreRoomsCaption, layout, onCreateRoomBut, onMeFooter, srcCreateRoom }: GrsMainWindowNewLayoutMeFooterProps) => {
    const t = useTranslation();

    return (
        <Region
            name="me_footer"
            params={17}
            onPointerTap={onMeFooter}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 382, top: 0, height: 37, ...layout }}
        >
            <Border
                variant="0"
                name="more_rooms_container"
                params={17}
                tintColor="#cccccc"
                layout={{ position: 'absolute', left: 0, width: 369, top: 8, height: 29 }}
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
                    layout={{ position: 'absolute', left: 245, width: 102, top: 4, height: 21, minWidth: 102, maxWidth: 102 }}
                >
                    {t('navigator.createroom')}
                </Button>
            </Border>
        </Region>
    );
};

/** Named region `ad_cont` of GrsMainWindowNewLayout - configured through the parent's `adCont` prop. */
export interface GrsMainWindowNewLayoutAdContProps {
    layout?: BoxLayout;
    onAdCont?: () => void;
}

export const GrsMainWindowNewLayoutAdCont = ({ layout, onAdCont }: GrsMainWindowNewLayoutAdContProps) => {
    return (
        <Region
            name="ad_cont"
            params={17}
            backgroundColor="#ffffff"
            onPointerTap={onAdCont}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 346, top: 16, height: 68, ...layout }}
        />
    );
};

/** Named region `ad_footer` of GrsMainWindowNewLayout - configured through the parent's `adFooter` prop. */
export interface GrsMainWindowNewLayoutAdFooterProps {
    adCont?: GrsMainWindowNewLayoutAdContProps;
    captionAdCaption?: string;
    layout?: BoxLayout;
    onAdFooter?: () => void;
}

export const GrsMainWindowNewLayoutAdFooter = ({ adCont, captionAdCaption, layout, onAdFooter }: GrsMainWindowNewLayoutAdFooterProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ad_footer"
            params={17}
            onPointerTap={onAdFooter}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 382, top: 0, height: 85, ...layout }}
        >
            <Region
                name="ad_caption"
                params={16}
                visible={false}
                layout={{ position: 'absolute', left: 6, width: 121, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionAdCaption ?? t('navigator.adcaption')} />
            </Region>
            <GrsMainWindowNewLayoutAdCont {...adCont} />
        </Region>
    );
};

/** Named region `room_ads_footer` of GrsMainWindowNewLayout - configured through the parent's `roomAdsFooter` prop. */
export interface GrsMainWindowNewLayoutRoomAdsFooterProps {
    captionGetEventCaption?: string;
    layout?: BoxLayout;
    onGetEventBut?: () => void;
    onRoomAdsFooter?: () => void;
}

export const GrsMainWindowNewLayoutRoomAdsFooter = ({ captionGetEventCaption, layout, onGetEventBut, onRoomAdsFooter }: GrsMainWindowNewLayoutRoomAdsFooterProps) => {
    const t = useTranslation();

    return (
        <Region
            name="room_ads_footer"
            params={17}
            onPointerTap={onRoomAdsFooter}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 382, top: 0, height: 37, ...layout }}
        >
            <Border
                variant="0"
                name="link_to_navigator_container"
                params={17}
                tintColor="#cccccc"
                layout={{ position: 'absolute', left: 0, width: 369, top: 8, height: 29 }}
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
                    layout={{ position: 'absolute', left: 245, width: 102, top: 4, height: 21, minWidth: 102, maxWidth: 102 }}
                >
                    {t('roomad.get.event')}
                </Button>
            </Border>
        </Region>
    );
};

/** Named region `custom_footer` of GrsMainWindowNewLayout - configured through the parent's `customFooter` prop. */
export interface GrsMainWindowNewLayoutCustomFooterProps {
    adFooter?: GrsMainWindowNewLayoutAdFooterProps;
    layout?: BoxLayout;
    meFooter?: GrsMainWindowNewLayoutMeFooterProps;
    onCustomFooter?: () => void;
    roomAdsFooter?: GrsMainWindowNewLayoutRoomAdsFooterProps;
}

export const GrsMainWindowNewLayoutCustomFooter = ({ adFooter, layout, meFooter, onCustomFooter, roomAdsFooter }: GrsMainWindowNewLayoutCustomFooterProps) => {
    return (
        <Region
            name="custom_footer"
            params={1025}
            onPointerTap={onCustomFooter}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 382, bottom: 668, height: 0, ...layout }}
        >
            <GrsMainWindowNewLayoutMeFooter {...meFooter} />
            <GrsMainWindowNewLayoutAdFooter {...adFooter} />
            <GrsMainWindowNewLayoutRoomAdsFooter {...roomAdsFooter} />
        </Region>
    );
};

/** Named region `tab_content` of GrsMainWindowNewLayout - configured through the parent's `tabContent` prop. */
export interface GrsMainWindowNewLayoutTabContentProps {
    customContent?: GrsMainWindowNewLayoutCustomContentProps;
    customFooter?: GrsMainWindowNewLayoutCustomFooterProps;
    layout?: BoxLayout;
    listContent?: GrsMainWindowNewLayoutListContentProps;
    onTabContent?: () => void;
}

export const GrsMainWindowNewLayoutTabContent = ({ customContent, customFooter, layout, listContent, onTabContent }: GrsMainWindowNewLayoutTabContentProps) => {
    return (
        <Region
            name="tab_content"
            params={2065}
            onPointerTap={onTabContent}
            cursor="pointer"
            layout={{ position: 'absolute', left: 10, width: 388, top: 60, bottom: -286, ...layout }}
        >
            <GrsMainWindowNewLayoutListContent {...listContent} />
            <GrsMainWindowNewLayoutCustomContent {...customContent} />
            <GrsMainWindowNewLayoutCustomFooter {...customFooter} />
        </Region>
    );
};

/** Named region `tabbedview` of GrsMainWindowNewLayout - configured through the parent's `tabbedview` prop. */
export interface GrsMainWindowNewLayoutTabbedviewProps {
    layout?: BoxLayout;
    onNavigatorTab1?: () => void;
    onNavigatorTab2?: () => void;
    onNavigatorTab3?: () => void;
    onNavigatorTab4?: () => void;
    onNavigatorTab5?: () => void;
    onNavigatorTab6?: () => void;
    onSearchBut?: () => void;
    onSearchType?: () => void;
    onTabbedview?: () => void;
    tabContent?: GrsMainWindowNewLayoutTabContentProps;
}

export const GrsMainWindowNewLayoutTabbedview = ({ layout, onNavigatorTab1, onNavigatorTab2, onNavigatorTab3, onNavigatorTab4, onNavigatorTab5, onNavigatorTab6, onSearchBut, onSearchType, onTabbedview, tabContent }: GrsMainWindowNewLayoutTabbedviewProps) => {
    const t = useTranslation();
    const [ searchStrValue, setSearchStrValue ] = useState('');

    return (
        <Region
            name="tabbedview"
            params={2065}
            onPointerTap={onTabbedview}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 388, top: 0, bottom: 32, ...layout }}
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
                    name="navigator_tab_6"
                    tags={[ 'FIT:navigatorCategoryTab' ]}
                    params={131089}
                    onPointerTap={onNavigatorTab6}
                    layout={{ position: 'absolute', left: 123, width: 20, top: 0, height: 22 }}
                >
                    {t('navigator.tab.categories')}
                </TabButton>
                <TabButton
                    variant="0"
                    name="navigator_tab_2"
                    tags={[ 'FIT:navigatorRoomsTab' ]}
                    params={131089}
                    onPointerTap={onNavigatorTab2}
                    layout={{ position: 'absolute', left: 266, width: 20, top: 0, height: 22 }}
                >
                    {t('navigator.tab.rooms')}
                </TabButton>
                <TabButton
                    variant="0"
                    name="navigator_tab_1"
                    tags={[ 'FIT:navigatorEventsTab' ]}
                    params={131089}
                    onPointerTap={onNavigatorTab1}
                    layout={{ position: 'absolute', left: 387, width: 20, top: 0, height: 22 }}
                >
                    {t('navigator.tab.events')}
                </TabButton>
                <TabButton
                    variant="0"
                    name="navigator_tab_3"
                    tags={[ 'FIT:navigatorMeTab' ]}
                    params={131089}
                    onPointerTap={onNavigatorTab3}
                    layout={{ position: 'absolute', left: 512, width: 20, top: 0, height: 22 }}
                >
                    {t('navigator.tab.me')}
                </TabButton>
                <TabButton
                    variant="0"
                    name="navigator_tab_5"
                    tags={[ 'FIT:navigatorSearchTab' ]}
                    params={131089}
                    onPointerTap={onNavigatorTab5}
                    layout={{ position: 'absolute', left: 616, width: 20, top: 0, height: 22 }}
                >
                    {t('navigator.tab.search')}
                </TabButton>
            </TabContext>
            <Border
                variant="0"
                name="search_header"
                params={17}
                tintColor="#cccccc"
                layout={{ position: 'absolute', left: 9, width: 369, top: 26, height: 30 }}
            >
                <TextInput
                    value={searchStrValue}
                    onChange={setSearchStrValue}
                    backgroundColor="#ffffff"
                    layout={{ position: 'absolute', left: 90, width: 201, top: 5, height: 17 }}
                />
                <Button
                    variant="0"
                    name="search_but"
                    tags={[ 'FIT:navigatorSearchButton' ]}
                    params={131089}
                    onPointerTap={onSearchBut}
                    layout={{ position: 'absolute', left: 300, width: 65, top: 3, height: 21, minWidth: 65, maxWidth: 65 }}
                >
                    {t('generic.search')}
                </Button>
                <Dropmenu
                    variant="2"
                    name="search_type"
                    tags={[ 'FIT:navigatorSearchType' ]}
                    params={17}
                    onPointerTap={onSearchType}
                    layout={{ position: 'absolute', left: 5, width: 80, top: 4, height: 20 }}
                />
            </Border>
            <GrsMainWindowNewLayoutTabContent {...tabContent} />
        </Region>
    );
};
