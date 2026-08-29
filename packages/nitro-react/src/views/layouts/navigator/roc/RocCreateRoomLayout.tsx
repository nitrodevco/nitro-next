import { useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, ButtonThick, Dropmenu, Frame, Region, ScrollArea, TextInput } from '#base/theme';

/** Generated from `3031_roc_create_room_xml` (layout "roc_create_room", 585x367) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RocCreateRoomLayoutProps {
    captionChooseLayoutCaption?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    roomSettingsContainer?: RocCreateRoomLayoutRoomSettingsContainerProps;
}

export const RocCreateRoomLayout = ({ captionChooseLayoutCaption, layout, onClose, roomSettingsContainer }: RocCreateRoomLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="roc_create_room"
            name="roc_create_room"
            caption={t('navigator.createroom.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 585, height: 367, ...layout }}
        >
            <RocCreateRoomLayoutRoomSettingsContainer {...roomSettingsContainer} />
            <Region
                name="room_layout_container"
                layout={{ position: 'absolute', left: 270, width: 300, top: 15, height: 315 }}
            >
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 0, right: 10, top: 20, bottom: 0 }}
                >
                    <Region
                        name="layout_item_list"
                        layout={{ flexDirection: 'column', width: '100%' }}
                    />
                </ScrollArea>
                {/* <scrollbar_vertical> for layout_item_list - rendered by that list's ScrollArea */}
                <Region
                    name="choose_layout_caption"
                    layout={{ position: 'absolute', left: 0, width: 257, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionChooseLayoutCaption ?? t('navigator.createroom.chooselayoutcaption')}
                </Region>
            </Region>
        </Frame>
    );
};

/** Named region `room_settings_container` of RocCreateRoomLayout - configured through the parent's `roomSettingsContainer` prop. */
export interface RocCreateRoomLayoutRoomSettingsContainerProps {
    captionCreateCategoryCaption?: string;
    captionCreateDescCaption?: string;
    captionCreateRoomCaption?: string;
    captionCreateTradeCaption?: string;
    captionCreateVisitorsCaption?: string;
    layout?: BoxLayout;
    onBackButton?: () => void;
    onCategoriesList?: () => void;
    onCreateButton?: () => void;
    onTradeSettingsList?: () => void;
    onVisitorsList?: () => void;
}

export const RocCreateRoomLayoutRoomSettingsContainer = ({ captionCreateCategoryCaption, captionCreateDescCaption, captionCreateRoomCaption, captionCreateTradeCaption, captionCreateVisitorsCaption, layout, onBackButton, onCategoriesList, onCreateButton, onTradeSettingsList, onVisitorsList }: RocCreateRoomLayoutRoomSettingsContainerProps) => {
    const t = useTranslation();
    const [ roomNameInputValue, setRoomNameInputValue ] = useState('');
    const [ roomDescInputValue, setRoomDescInputValue ] = useState('');

    return (
        <Region
            name="room_settings_container"
            layout={{ position: 'absolute', left: 10, width: 255, top: 15, height: 315, ...layout }}
        >
            <Region
                name="create_room_caption"
                layout={{ position: 'absolute', left: 0, width: 122, bottom: 302, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionCreateRoomCaption ?? t('navigator.roomname')}
            </Region>
            <TextInput
                value={roomNameInputValue}
                onChange={setRoomNameInputValue}
                layout={{ position: 'absolute', left: 0, right: 15, bottom: 276, height: 19 }}
            />
            <Region
                name="create_desc_caption"
                layout={{ position: 'absolute', left: 0, width: 120, bottom: 252, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionCreateDescCaption ?? t('navigator.roomdesc')}
            </Region>
            <TextInput
                value={roomDescInputValue}
                onChange={setRoomDescInputValue}
                multiline
                layout={{ position: 'absolute', left: 0, right: 15, bottom: 185, height: 60 }}
            />
            <Region
                name="create_category_caption"
                layout={{ position: 'absolute', left: 0, width: 117, bottom: 162, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionCreateCategoryCaption ?? t('navigator.category')}
            </Region>
            <Dropmenu
                variant="2"
                name="categories_list"
                onPointerTap={onCategoriesList}
                layout={{ position: 'absolute', left: 0, width: 240, top: 160, height: 21 }}
            />
            <Region
                name="create_visitors_caption"
                layout={{ position: 'absolute', left: 0, width: 132, bottom: 112, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionCreateVisitorsCaption ?? t('navigator.maxvisitors')}
            </Region>
            <Dropmenu
                variant="0"
                name="visitors_list"
                onPointerTap={onVisitorsList}
                layout={{ position: 'absolute', left: 0, width: 240, top: 210, height: 21 }}
            />
            <Region
                name="create_trade_caption"
                layout={{ position: 'absolute', left: 0, width: 145, bottom: 62, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionCreateTradeCaption ?? t('navigator.tradesettings')}
            </Region>
            <Dropmenu
                variant="0"
                name="trade_settings_list"
                onPointerTap={onTradeSettingsList}
                layout={{ position: 'absolute', left: 0, width: 240, top: 260, height: 21 }}
            />
            <ButtonThick
                variant="0"
                name="create_button"
                onPointerTap={onCreateButton}
                layout={{ position: 'absolute', left: 0, width: 100, bottom: 4, height: 21, minWidth: 100, maxWidth: 100 }}
            >
                {t('navigator.createroom.create')}
            </ButtonThick>
            <Button
                variant="0"
                name="back_button"
                onPointerTap={onBackButton}
                layout={{ position: 'absolute', right: 15, width: 100, bottom: 4, height: 21, minWidth: 100, maxWidth: 100 }}
            >
                {t('generic.cancel')}
            </Button>
        </Region>
    );
};
