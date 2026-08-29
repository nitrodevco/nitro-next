import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Dropmenu, Frame, Icon, Region, ScrollArea, TabButton, TabContext, TextInput, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3015_grs_main_window_xml` (layout "grs_main_window", 325x474) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsMainWindowLayoutProps {
    captionLoadingText?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    tabbedview?: GrsMainWindowLayoutTabbedviewProps;
    visibleLoadingText?: boolean;
}

export const GrsMainWindowLayout = ({ captionLoadingText, layout, onClose, tabbedview, visibleLoadingText }: GrsMainWindowLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="0"
            id="grs_main_window"
            name="grs_main_window"
            caption={t('navigator.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 325, height: 474, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <GrsMainWindowLayoutTabbedview {...tabbedview} />
                {(visibleLoadingText ?? false) && (
                    <Region
                        name="loading_text"
                        layout={{ position: 'absolute', marginLeft: -29.5, marginRight: 29.5, width: 104, top: 210, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {captionLoadingText ?? t('navigator.loading')}
                    </Region>
                )}
            </Region>
        </Frame>
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
            backgroundColor="#ffffff"
            layout={{ width: 278, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `list_content` of GrsMainWindowLayout - configured through the parent's `listContent` prop. */
export interface GrsMainWindowLayoutListContentProps {
    captionNoRoomsFound?: string;
    captionNoRoomsFound2?: string;
    captionNoTagsFound?: string;
    itemsItemListOfficial?: ReactNode;
    layout?: BoxLayout;
}

export const GrsMainWindowLayoutListContent = ({ captionNoRoomsFound, captionNoRoomsFound2, captionNoTagsFound, itemsItemListOfficial, layout }: GrsMainWindowLayoutListContentProps) => {
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
                layout={{ position: 'absolute', left: 0, width: 295, top: 0, bottom: 0, justifyContent: 'center' }}
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
                layout={{ position: 'absolute', left: 0, width: 295, top: 0, bottom: 0, justifyContent: 'center' }}
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
                    layout={{ position: 'absolute', width: 295, top: 100, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionNoRoomsFound2 ?? t('navigator.noroomsfound')}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
            </Region>
            <Region
                name="popular_tags"
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, width: 295, top: 0, bottom: 0, justifyContent: 'center' }}
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
                layout={{ position: 'absolute', left: 0, width: 295, top: 0, bottom: 0 }}
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

/** Named region `custom_content` of GrsMainWindowLayout - configured through the parent's `customContent` prop. */
export interface GrsMainWindowLayoutCustomContentProps {
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

export const GrsMainWindowLayoutCustomContent = ({ layout, onCustomContent, onMeHeader, onMeSubNavi, onNextButton, onPrevButton, onRoomAdFilter, onRoomAdHeader, onRoomCompetitionsHeader, onRoomCtgFilter, onRoomsHeader, visibleMeHeader, visibleRoomAdHeader, visibleRoomsHeader }: GrsMainWindowLayoutCustomContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="custom_content"
            onPointerTap={onCustomContent}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 307, top: 0, height: 50, ...layout }}
        >
            {(visibleMeHeader ?? false) && (
                <Region
                    name="me_header"
                    onPointerTap={onMeHeader}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 307, top: 0, height: 20 }}
                >
                    <Dropmenu
                        variant="0"
                        name="meSubNavi"
                        onPointerTap={onMeSubNavi}
                        layout={{ position: 'absolute', left: 0, width: 293, top: 0, height: 20 }}
                    />
                </Region>
            )}
            {(visibleRoomsHeader ?? false) && (
                <Region
                    name="rooms_header"
                    onPointerTap={onRoomsHeader}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 307, top: 0, height: 20 }}
                >
                    <Dropmenu
                        variant="0"
                        name="roomCtgFilter"
                        onPointerTap={onRoomCtgFilter}
                        layout={{ position: 'absolute', left: 0, width: 293, top: 0, height: 20 }}
                    />
                </Region>
            )}
            {(visibleRoomAdHeader ?? false) && (
                <Region
                    name="room_ad_header"
                    onPointerTap={onRoomAdHeader}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 307, top: 0, height: 20 }}
                >
                    <Dropmenu
                        variant="0"
                        name="roomAdFilter"
                        onPointerTap={onRoomAdFilter}
                        layout={{ position: 'absolute', left: 0, width: 293, top: 0, height: 20 }}
                    />
                </Region>
            )}
            <Region
                name="room_competitions_header"
                onPointerTap={onRoomCompetitionsHeader}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 307, top: 0, height: 33, justifyContent: 'center' }}
            >
                <Region layout={{ position: 'absolute', marginLeft: -6, marginRight: 6, width: 295, top: 8, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
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
                    layout={{ position: 'absolute', left: 262, width: 30, top: 0, height: 30 }}
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

/** Named region `custom_footer` of GrsMainWindowLayout - configured through the parent's `customFooter` prop. */
export interface GrsMainWindowLayoutCustomFooterProps {
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
}

export const GrsMainWindowLayoutCustomFooter = ({ captionAdCaption, captionGetEventCaption, captionMoreRoomsCaption, layout, onAdCont, onAdFooter, onCreateRoomBut, onCustomFooter, onGetEventBut, onMeFooter, onRoomAdsFooter, srcCreateRoom }: GrsMainWindowLayoutCustomFooterProps) => {
    const t = useTranslation();

    return (
        <Region
            name="custom_footer"
            onPointerTap={onCustomFooter}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 307, bottom: 668, height: 0, ...layout }}
        >
            <Region
                name="me_footer"
                onPointerTap={onMeFooter}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 307, top: 0, height: 37 }}
            >
                <Border
                    variant="0"
                    name="more_rooms_container"
                    tintColor="#cccccc"
                    layout={{ position: 'absolute', left: 0, width: 294, top: 8, height: 29 }}
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
                        {captionMoreRoomsCaption ?? t('navigator.moreroomscaption')}
                    </Region>
                    <Button
                        variant="0"
                        name="create_room_but"
                        onPointerTap={onCreateRoomBut}
                        layout={{ position: 'absolute', left: 187, width: 102, top: 4, height: 21, minWidth: 102, maxWidth: 102 }}
                    >
                        {t('navigator.createroom')}
                    </Button>
                </Border>
            </Region>
            <Region
                name="ad_footer"
                onPointerTap={onAdFooter}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 307, top: 0, height: 85 }}
            >
                <Region
                    name="ad_caption"
                    layout={{ position: 'absolute', left: 6, width: 121, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionAdCaption ?? t('navigator.adcaption')}
                </Region>
                <Region
                    name="ad_cont"
                    backgroundColor="#ffffff"
                    onPointerTap={onAdCont}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 271, top: 16, height: 68 }}
                />
            </Region>
            <Region
                name="room_ads_footer"
                onPointerTap={onRoomAdsFooter}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 307, top: 0, height: 37 }}
            >
                <Border
                    variant="0"
                    name="link_to_navigator_container"
                    tintColor="#cccccc"
                    layout={{ position: 'absolute', left: 0, width: 294, top: 8, height: 29 }}
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
                        layout={{ position: 'absolute', left: 187, width: 102, top: 4, height: 21, minWidth: 102, maxWidth: 102 }}
                    >
                        {t('roomad.get.event')}
                    </Button>
                </Border>
            </Region>
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
            onPointerTap={onTabbedview}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 313, top: 0, bottom: 32, ...layout }}
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
                    name="navigator_tab_2"
                    onPointerTap={onNavigatorTab2}
                    layout={{ position: 'absolute', left: 123, width: 20, top: 0, height: 22 }}
                >
                    {t('navigator.tab.rooms')}
                </TabButton>
                <TabButton
                    variant="0"
                    name="navigator_tab_1"
                    onPointerTap={onNavigatorTab1}
                    layout={{ position: 'absolute', left: 244, width: 20, top: 0, height: 22 }}
                >
                    {t('navigator.tab.events')}
                </TabButton>
                <TabButton
                    variant="0"
                    name="navigator_tab_3"
                    onPointerTap={onNavigatorTab3}
                    layout={{ position: 'absolute', left: 369, width: 20, top: 0, height: 22 }}
                >
                    {t('navigator.tab.me')}
                </TabButton>
                <TabButton
                    variant="0"
                    name="navigator_tab_5"
                    onPointerTap={onNavigatorTab5}
                    layout={{ position: 'absolute', left: 473, width: 20, top: 0, height: 22 }}
                >
                    {t('navigator.tab.search')}
                </TabButton>
            </TabContext>
            <Border
                variant="0"
                name="search_header"
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
