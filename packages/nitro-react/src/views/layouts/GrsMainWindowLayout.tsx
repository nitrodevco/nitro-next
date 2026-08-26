import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Dropmenu, Frame, Icon, Region, ScrollArea, TabButton, TabContext, TextInput, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3015_grs_main_window_xml` (layout "grs_main_window", 325x474) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsMainWindowLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onCreateRoomBut?: () => void;
    onGetEventBut?: () => void;
    onMeSubNavi?: () => void;
    onNavigatorTab1?: () => void;
    onNavigatorTab2?: () => void;
    onNavigatorTab3?: () => void;
    onNavigatorTab4?: () => void;
    onNavigatorTab5?: () => void;
    onNextButton?: () => void;
    onPrevButton?: () => void;
    onRoomAdFilter?: () => void;
    onRoomCtgFilter?: () => void;
    onSearchBut?: () => void;
}

export const GrsMainWindowLayout = ({ layout, onClose, onCreateRoomBut, onGetEventBut, onMeSubNavi, onNavigatorTab1, onNavigatorTab2, onNavigatorTab3, onNavigatorTab4, onNavigatorTab5, onNextButton, onPrevButton, onRoomAdFilter, onRoomCtgFilter, onSearchBut }: GrsMainWindowLayoutProps) => {
    const t = useTranslation();
    const [ searchStrValue, setSearchStrValue ] = useState('');

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
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="tabbedview"
                    params={2065}
                    layout={{ position: 'absolute', left: 0, width: 313, top: 0, height: 442 }}
                >
                    <TabContext
                        variant="0"
                        name="tab_context"
                        params={2193}
                        layout={{ position: 'absolute', left: 0, width: 313, top: 0, height: 442 }}
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
                    <Region
                        name="tab_content"
                        params={2065}
                        layout={{ position: 'absolute', left: 10, width: 313, top: 60, height: 668 }}
                    >
                        <Region
                            name="list_content"
                            params={2048}
                            backgroundColor="#ffff00"
                            layout={{ position: 'absolute', left: 0, width: 295, top: 0, height: 380 }}
                        >
                            <Region
                                name="guest_rooms"
                                params={2064}
                                backgroundColor="#ffffff"
                                layout={{ position: 'absolute', left: 0, width: 295, top: 0, height: 380 }}
                            >
                                <ScrollArea
                                    orientation="vertical"
                                    layout={{ position: 'absolute', left: 0, width: 278, top: 0, height: 380 }}
                                >
                                    <Region
                                        name="item_list"
                                        params={2177}
                                        layout={{ flexDirection: 'column', width: '100%' }}
                                    />
                                </ScrollArea>
                                <Region
                                    name="no_rooms_found"
                                    params={786449}
                                    layout={{ position: 'absolute', left: 0, width: 295, top: 100, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('navigator.noroomsfound')}
                                        textOptions={{ align: 'center' }}
                                    />
                                </Region>
                            </Region>
                            <Region
                                name="room_ads"
                                params={2064}
                                backgroundColor="#ffffff"
                                layout={{ position: 'absolute', left: 0, width: 295, top: 0, height: 380 }}
                            >
                                <ScrollArea
                                    orientation="vertical"
                                    layout={{ position: 'absolute', left: 0, width: 278, top: 0, height: 380 }}
                                >
                                    <Region
                                        name="item_list"
                                        params={2177}
                                        layout={{ flexDirection: 'column', width: '100%' }}
                                    />
                                </ScrollArea>
                                <Region
                                    name="no_rooms_found"
                                    params={786449}
                                    layout={{ position: 'absolute', left: 0, width: 295, top: 100, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('navigator.noroomsfound')}
                                        textOptions={{ align: 'center' }}
                                    />
                                </Region>
                            </Region>
                            <Region
                                name="popular_tags"
                                params={2064}
                                backgroundColor="#ffffff"
                                layout={{ position: 'absolute', left: 0, width: 295, top: 0, height: 380 }}
                            >
                                <ScrollArea
                                    orientation="vertical"
                                    layout={{ position: 'absolute', left: 0, width: 278, top: 0, height: 380 }}
                                >
                                    <Region
                                        name="item_list"
                                        params={2177}
                                        layout={{ flexDirection: 'column', width: '100%' }}
                                    />
                                </ScrollArea>
                                <Region
                                    name="no_tags_found"
                                    params={786449}
                                    layout={{ position: 'absolute', left: 0, width: 295, top: 100, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('navigator.notagsfound')}
                                        textOptions={{ align: 'center' }}
                                    />
                                </Region>
                            </Region>
                            <Region
                                name="official_rooms"
                                params={2064}
                                backgroundColor="#ffffff"
                                layout={{ position: 'absolute', left: 0, width: 295, top: 0, height: 380 }}
                            >
                                <ScrollArea
                                    orientation="vertical"
                                    layout={{ position: 'absolute', left: 0, width: 278, top: 0, height: 380 }}
                                >
                                    <Region
                                        name="item_list_official"
                                        params={2177}
                                        layout={{ flexDirection: 'column', width: '100%' }}
                                    >
                                        <Region
                                            name="promoted_rooms"
                                            params={16}
                                            backgroundColor="#ffffff"
                                            layout={{ width: 278, height: 1, flexShrink: 0 }}
                                        />
                                    </Region>
                                </ScrollArea>
                            </Region>
                        </Region>
                        <Region
                            name="custom_content"
                            params={1}
                            layout={{ position: 'absolute', left: 0, width: 307, top: 0, height: 50 }}
                        >
                            <Region
                                name="me_header"
                                params={17}
                                visible={false}
                                layout={{ position: 'absolute', left: 0, width: 307, top: 0, height: 20 }}
                            >
                                <Dropmenu
                                    variant="0"
                                    name="meSubNavi"
                                    params={1}
                                    onPointerTap={onMeSubNavi}
                                    layout={{ position: 'absolute', left: 0, width: 293, top: 0, height: 20 }}
                                />
                            </Region>
                            <Region
                                name="rooms_header"
                                params={17}
                                visible={false}
                                layout={{ position: 'absolute', left: 0, width: 307, top: 0, height: 20 }}
                            >
                                <Dropmenu
                                    variant="0"
                                    name="roomCtgFilter"
                                    params={1}
                                    onPointerTap={onRoomCtgFilter}
                                    layout={{ position: 'absolute', left: 0, width: 293, top: 0, height: 20 }}
                                />
                            </Region>
                            <Region
                                name="room_ad_header"
                                params={17}
                                visible={false}
                                layout={{ position: 'absolute', left: 0, width: 307, top: 0, height: 20 }}
                            >
                                <Dropmenu
                                    variant="0"
                                    name="roomAdFilter"
                                    params={1}
                                    onPointerTap={onRoomAdFilter}
                                    layout={{ position: 'absolute', left: 0, width: 293, top: 0, height: 20 }}
                                />
                            </Region>
                            <Region
                                name="room_competitions_header"
                                params={17}
                                layout={{ position: 'absolute', left: 0, width: 307, top: 0, height: 33 }}
                            >
                                <Region
                                    params={786449}
                                    layout={{ position: 'absolute', left: 0, width: 295, top: 8, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
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
                        </Region>
                        <Region
                            name="custom_footer"
                            params={1025}
                            layout={{ position: 'absolute', left: 0, width: 307, top: 0, height: 0 }}
                        >
                            <Region
                                name="me_footer"
                                params={17}
                                layout={{ position: 'absolute', left: 0, width: 307, top: 0, height: 37 }}
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
                                        src={undefined}
                                        layout={{ position: 'absolute', left: 4, width: 23, top: 3, height: 23 }}
                                    />
                                    <Region
                                        name="more_rooms_caption"
                                        params={16}
                                        layout={{ position: 'absolute', left: 32, width: 146, top: 8, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText text={t('navigator.moreroomscaption')} />
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
                            <Region
                                name="ad_footer"
                                params={17}
                                layout={{ position: 'absolute', left: 0, width: 307, top: 0, height: 85 }}
                            >
                                <Region
                                    name="ad_caption"
                                    params={16}
                                    layout={{ position: 'absolute', left: 6, width: 121, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text={t('navigator.adcaption')} />
                                </Region>
                                <Region
                                    name="ad_cont"
                                    params={17}
                                    backgroundColor="#ffffff"
                                    layout={{ position: 'absolute', left: 0, width: 271, top: 16, height: 68 }}
                                />
                            </Region>
                            <Region
                                name="room_ads_footer"
                                params={17}
                                layout={{ position: 'absolute', left: 0, width: 307, top: 0, height: 37 }}
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
                                            text={t('roomad.get.event.caption')}
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
                        </Region>
                    </Region>
                </Region>
                <Region
                    name="loading_text"
                    params={786432}
                    visible={false}
                    layout={{ position: 'absolute', left: 81, width: 104, top: 210, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={t('navigator.loading')} />
                </Region>
            </Region>
        </Frame>
    );
};
