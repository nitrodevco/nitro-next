import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Dropmenu, Frame, Icon, Region, ScrollArea, TabButton, TabContext, TextInput, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3041_grs_main_window_new_xml` (layout "grs_main_window_new", 400x474) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsMainWindowNewLayoutProps {
    captionLoadingText?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    tabbedview?: GrsMainWindowNewLayoutTabbedviewProps;
    visibleLoadingText?: boolean;
}

export const GrsMainWindowNewLayout = ({ captionLoadingText, layout, onClose, tabbedview, visibleLoadingText }: GrsMainWindowNewLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="0"
            id="grs_main_window"
            name="grs_main_window"
            caption={t('navigator.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 400, height: 474, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <GrsMainWindowNewLayoutTabbedview {...tabbedview} />
                {(visibleLoadingText ?? false) && (
                    <Region
                        name="loading_text"
                        layout={{ position: 'absolute', marginLeft: -67, marginRight: 67, width: 104, top: 210, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionLoadingText ?? t('navigator.loading')} />
                    </Region>
                )}
            </Region>
        </Frame>
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
            backgroundColor="#ffffff"
            layout={{ width: 353, height: 1, flexShrink: 0, ...layout }}
        />
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
            backgroundColor="#ffffff"
            layout={{ width: 353, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `list_content` of GrsMainWindowNewLayout - configured through the parent's `listContent` prop. */
export interface GrsMainWindowNewLayoutListContentProps {
    captionNoRoomsFound?: string;
    captionNoRoomsFound2?: string;
    captionNoTagsFound?: string;
    itemsItemListCategory?: ReactNode;
    itemsItemListOfficial?: ReactNode;
    layout?: BoxLayout;
    visiblePopularTags?: boolean;
}

export const GrsMainWindowNewLayoutListContent = ({ captionNoRoomsFound, captionNoRoomsFound2, captionNoTagsFound, itemsItemListCategory, itemsItemListOfficial, layout, visiblePopularTags }: GrsMainWindowNewLayoutListContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="list_content"
            backgroundColor="#ffff00"
            layout={{ position: 'absolute', left: 0, width: 370, top: 0, bottom: 288, ...layout }}
        >
            <Region
                name="guest_rooms"
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, width: 370, top: 0, bottom: 0, justifyContent: 'center' }}
            >
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 0, right: 17, top: 0, bottom: 0 }}
                >
                    <Region
                        name="item_list"
                        layout={{ flexDirection: 'column', width: '100%' }}
                    />
                </ScrollArea>
                {/* <scrollbar_vertical> for item_list - rendered by that list's ScrollArea */}
                <Region
                    name="no_rooms_found"
                    layout={{ position: 'absolute', marginLeft: -37.5, marginRight: 37.5, width: 295, top: 100, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
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
                layout={{ position: 'absolute', left: 0, width: 395, top: 0, bottom: 0, justifyContent: 'center' }}
            >
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 0, right: 17, top: 0, bottom: 0 }}
                >
                    <Region
                        name="item_list"
                        layout={{ flexDirection: 'column', width: '100%' }}
                    />
                </ScrollArea>
                {/* <scrollbar_vertical> for item_list - rendered by that list's ScrollArea */}
                <Region
                    name="no_rooms_found"
                    layout={{ position: 'absolute', marginLeft: -50, marginRight: 50, width: 295, top: 100, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionNoRoomsFound2 ?? t('navigator.noroomsfound')}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
            </Region>
            {(visiblePopularTags ?? false) && (
                <Region
                    name="popular_tags"
                    backgroundColor="#ffffff"
                    layout={{ position: 'absolute', left: 0, width: 395, top: 0, bottom: 0, justifyContent: 'center' }}
                >
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 0, right: 17, top: 0, bottom: 0 }}
                    >
                        <Region
                            name="item_list"
                            layout={{ flexDirection: 'column', width: '100%' }}
                        />
                    </ScrollArea>
                    {/* <scrollbar_vertical> for item_list - rendered by that list's ScrollArea */}
                    <Region
                        name="no_tags_found"
                        layout={{ position: 'absolute', marginLeft: -50, marginRight: 50, width: 295, top: 100, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionNoTagsFound ?? t('navigator.notagsfound')}
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                </Region>
            )}
            <Region
                name="categories_container"
                layout={{ position: 'absolute', left: 0, width: 395, top: 0, bottom: 0 }}
            >
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 0, right: 17, top: 0, bottom: 0 }}
                >
                    <Region
                        name="item_list_category"
                        layout={{ flexDirection: 'column', width: '100%' }}
                    >
                        {itemsItemListCategory ?? (
                            <GrsMainWindowNewLayoutTopCategoriesItem />
                        )}
                    </Region>
                </ScrollArea>
                {/* <scrollbar_vertical> for item_list_category - rendered by that list's ScrollArea */}
            </Region>
            <Region
                name="official_rooms"
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, width: 370, top: 0, bottom: 0 }}
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
                            <GrsMainWindowNewLayoutPromotedRoomsItem />
                        )}
                    </Region>
                </ScrollArea>
                {/* <scrollbar_vertical> for item_list_official - rendered by that list's ScrollArea */}
            </Region>
        </Region>
    );
};

/** Named region `custom_content` of GrsMainWindowNewLayout - configured through the parent's `customContent` prop. */
export interface GrsMainWindowNewLayoutCustomContentProps {
    layout?: BoxLayout;
    onCustomContent?: () => void;
    onMeHeader?: () => void;
    onMeSubNavi?: () => void;
    onNextButton?: () => void;
    onPrevButton?: () => void;
    onRoomAdFilter?: () => void;
    onRoomAdHeader?: () => void;
    onRoomCompetitionsHeader?: () => void;
    onRoomCtgFilter?: () => void;
    onRoomsHeader?: () => void;
    visibleMeHeader?: boolean;
    visibleRoomAdHeader?: boolean;
    visibleRoomsHeader?: boolean;
}

export const GrsMainWindowNewLayoutCustomContent = ({ layout, onCustomContent, onMeHeader, onMeSubNavi, onNextButton, onPrevButton, onRoomAdFilter, onRoomAdHeader, onRoomCompetitionsHeader, onRoomCtgFilter, onRoomsHeader, visibleMeHeader, visibleRoomAdHeader, visibleRoomsHeader }: GrsMainWindowNewLayoutCustomContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="custom_content"
            onPointerTap={onCustomContent}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 382, top: 0, height: 50, ...layout }}
        >
            {(visibleMeHeader ?? false) && (
                <Region
                    name="me_header"
                    onPointerTap={onMeHeader}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 382, top: 0, height: 20 }}
                >
                    <Dropmenu
                        variant="0"
                        name="meSubNavi"
                        onPointerTap={onMeSubNavi}
                        layout={{ position: 'absolute', left: 0, width: 368, top: 0, height: 20 }}
                    />
                </Region>
            )}
            {(visibleRoomsHeader ?? false) && (
                <Region
                    name="rooms_header"
                    onPointerTap={onRoomsHeader}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 382, top: 0, height: 20 }}
                >
                    <Dropmenu
                        variant="0"
                        name="roomCtgFilter"
                        onPointerTap={onRoomCtgFilter}
                        layout={{ position: 'absolute', left: 0, width: 368, top: 0, height: 20 }}
                    />
                </Region>
            )}
            {(visibleRoomAdHeader ?? false) && (
                <Region
                    name="room_ad_header"
                    onPointerTap={onRoomAdHeader}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 382, top: 0, height: 20 }}
                >
                    <Dropmenu
                        variant="0"
                        name="roomAdFilter"
                        onPointerTap={onRoomAdFilter}
                        layout={{ position: 'absolute', left: 0, width: 368, top: 0, height: 20 }}
                    />
                </Region>
            )}
            <Region
                name="room_competitions_header"
                onPointerTap={onRoomCompetitionsHeader}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 382, top: 0, height: 33, justifyContent: 'center' }}
            >
                <Region layout={{ position: 'absolute', marginLeft: -5, marginRight: 5, width: 370, top: 8, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <ThemeText
                        text={t('navigator.roomcompetitionspager')}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <ContainerButton
                    variant="0"
                    name="prev_button"
                    onPointerTap={onPrevButton}
                    layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
                >
                    <Icon
                        variant="4"
                        tintColor="#000000"
                        layout={{ position: 'absolute', left: 12, width: 5, top: 10, height: 9 }}
                    />
                </ContainerButton>
                <ContainerButton
                    variant="0"
                    name="next_button"
                    onPointerTap={onNextButton}
                    layout={{ position: 'absolute', left: 315, width: 30, top: 0, height: 30 }}
                >
                    <Icon
                        variant="5"
                        tintColor="#000000"
                        layout={{ position: 'absolute', left: 12, width: 5, top: 10, height: 9 }}
                    />
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Named region `custom_footer` of GrsMainWindowNewLayout - configured through the parent's `customFooter` prop. */
export interface GrsMainWindowNewLayoutCustomFooterProps {
    captionAdCaption?: string;
    captionGetEventCaption?: string;
    captionMoreRoomsCaption?: string;
    layout?: BoxLayout;
    onAdCont?: () => void;
    onAdFooter?: () => void;
    onCreateRoomBut?: () => void;
    onCustomFooter?: () => void;
    onGetEventBut?: () => void;
    onMeFooter?: () => void;
    onRoomAdsFooter?: () => void;
    srcCreateRoom?: string;
    visibleAdCaption?: boolean;
}

export const GrsMainWindowNewLayoutCustomFooter = ({ captionAdCaption, captionGetEventCaption, captionMoreRoomsCaption, layout, onAdCont, onAdFooter, onCreateRoomBut, onCustomFooter, onGetEventBut, onMeFooter, onRoomAdsFooter, srcCreateRoom, visibleAdCaption }: GrsMainWindowNewLayoutCustomFooterProps) => {
    const t = useTranslation();

    return (
        <Region
            name="custom_footer"
            onPointerTap={onCustomFooter}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 382, bottom: 668, height: 0, ...layout }}
        >
            <Region
                name="me_footer"
                onPointerTap={onMeFooter}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 382, top: 0, height: 37 }}
            >
                <Border
                    variant="0"
                    name="more_rooms_container"
                    tintColor="#cccccc"
                    layout={{ position: 'absolute', left: 0, width: 369, top: 8, height: 29 }}
                >
                    <ThemeImage
                        name="create_room"
                        src={srcCreateRoom}
                        layout={{ position: 'absolute', left: 4, width: 23, top: 3, height: 23 }}
                    />
                    <Region
                        name="more_rooms_caption"
                        layout={{ position: 'absolute', left: 32, width: 146, top: 8, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionMoreRoomsCaption ?? t('navigator.moreroomscaption')} />
                    </Region>
                    <Button
                        variant="0"
                        name="create_room_but"
                        onPointerTap={onCreateRoomBut}
                        layout={{ position: 'absolute', left: 245, width: 102, top: 4, height: 21, minWidth: 102, maxWidth: 102 }}
                    >
                        {t('navigator.createroom')}
                    </Button>
                </Border>
            </Region>
            <Region
                name="ad_footer"
                onPointerTap={onAdFooter}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 382, top: 0, height: 85 }}
            >
                {(visibleAdCaption ?? false) && (
                    <Region
                        name="ad_caption"
                        layout={{ position: 'absolute', left: 6, width: 121, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionAdCaption ?? t('navigator.adcaption')} />
                    </Region>
                )}
                <Region
                    name="ad_cont"
                    backgroundColor="#ffffff"
                    onPointerTap={onAdCont}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 346, top: 16, height: 68 }}
                />
            </Region>
            <Region
                name="room_ads_footer"
                onPointerTap={onRoomAdsFooter}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 382, top: 0, height: 37 }}
            >
                <Border
                    variant="0"
                    name="link_to_navigator_container"
                    tintColor="#cccccc"
                    layout={{ position: 'absolute', left: 0, width: 369, top: 8, height: 29 }}
                >
                    <Region
                        name="get_event_caption"
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
                        onPointerTap={onGetEventBut}
                        layout={{ position: 'absolute', left: 245, width: 102, top: 4, height: 21, minWidth: 102, maxWidth: 102 }}
                    >
                        {t('roomad.get.event')}
                    </Button>
                </Border>
            </Region>
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
            onPointerTap={onTabbedview}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 388, top: 0, bottom: 32, ...layout }}
        >
            <TabContext
                variant="0"
                name="tab_context"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <TabButton
                    variant="0"
                    name="navigator_tab_4"
                    onPointerTap={onNavigatorTab4}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 22 }}
                >
                    {t('navigator.tab.special')}
                </TabButton>
                <TabButton
                    variant="0"
                    name="navigator_tab_6"
                    onPointerTap={onNavigatorTab6}
                    layout={{ position: 'absolute', left: 123, width: 20, top: 0, height: 22 }}
                >
                    {t('navigator.tab.categories')}
                </TabButton>
                <TabButton
                    variant="0"
                    name="navigator_tab_2"
                    onPointerTap={onNavigatorTab2}
                    layout={{ position: 'absolute', left: 266, width: 20, top: 0, height: 22 }}
                >
                    {t('navigator.tab.rooms')}
                </TabButton>
                <TabButton
                    variant="0"
                    name="navigator_tab_1"
                    onPointerTap={onNavigatorTab1}
                    layout={{ position: 'absolute', left: 387, width: 20, top: 0, height: 22 }}
                >
                    {t('navigator.tab.events')}
                </TabButton>
                <TabButton
                    variant="0"
                    name="navigator_tab_3"
                    onPointerTap={onNavigatorTab3}
                    layout={{ position: 'absolute', left: 512, width: 20, top: 0, height: 22 }}
                >
                    {t('navigator.tab.me')}
                </TabButton>
                <TabButton
                    variant="0"
                    name="navigator_tab_5"
                    onPointerTap={onNavigatorTab5}
                    layout={{ position: 'absolute', left: 616, width: 20, top: 0, height: 22 }}
                >
                    {t('navigator.tab.search')}
                </TabButton>
            </TabContext>
            <Border
                variant="0"
                name="search_header"
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
                    onPointerTap={onSearchBut}
                    layout={{ position: 'absolute', left: 300, width: 65, top: 3, height: 21, minWidth: 65, maxWidth: 65 }}
                >
                    {t('generic.search')}
                </Button>
                <Dropmenu
                    variant="2"
                    name="search_type"
                    onPointerTap={onSearchType}
                    layout={{ position: 'absolute', left: 5, width: 80, top: 4, height: 20 }}
                />
            </Border>
            <GrsMainWindowNewLayoutTabContent {...tabContent} />
        </Region>
    );
};
