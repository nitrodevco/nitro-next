import { useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, ButtonThick, Dropmenu, Frame, Region, ScrollArea, TextInput, ThemeText } from '#base/theme';

/** Generated from `3031_roc_create_room_xml` (layout "roc_create_room", 585x367) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RocCreateRoomLayoutProps {
    layout?: BoxLayout;
    onBackButton?: () => void;
    onCategoriesList?: () => void;
    onClose?: () => void;
    onCreateButton?: () => void;
    onTradeSettingsList?: () => void;
    onVisitorsList?: () => void;
}

export const RocCreateRoomLayout = ({ layout, onBackButton, onCategoriesList, onClose, onCreateButton, onTradeSettingsList, onVisitorsList }: RocCreateRoomLayoutProps) => {
    const t = useTranslation();
    const [ roomNameInputValue, setRoomNameInputValue ] = useState('');
    const [ roomDescInputValue, setRoomDescInputValue ] = useState('');

    return (
        <Frame
            variant="3"
            id="roc_create_room"
            name="roc_create_room"
            params={32769}
            caption={t('navigator.createroom.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 585, height: 367, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="room_settings_container"
                    params={16}
                    layout={{ position: 'absolute', left: 10, width: 255, top: 15, height: 315 }}
                >
                    <Region
                        name="create_room_caption"
                        params={1041}
                        layout={{ position: 'absolute', left: 0, width: 122, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={t('navigator.roomname')} />
                    </Region>
                    <TextInput
                        value={roomNameInputValue}
                        onChange={setRoomNameInputValue}
                        layout={{ position: 'absolute', left: 0, width: 240, top: 20, height: 19 }}
                    />
                    <Region
                        name="create_desc_caption"
                        params={1041}
                        layout={{ position: 'absolute', left: 0, width: 120, top: 50, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={t('navigator.roomdesc')} />
                    </Region>
                    <TextInput
                        value={roomDescInputValue}
                        onChange={setRoomDescInputValue}
                        multiline
                        layout={{ position: 'absolute', left: 0, width: 240, top: 70, height: 60 }}
                    />
                    <Region
                        name="create_category_caption"
                        params={1041}
                        layout={{ position: 'absolute', left: 0, width: 117, top: 140, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={t('navigator.category')} />
                    </Region>
                    <Dropmenu
                        variant="2"
                        name="categories_list"
                        params={17}
                        onPointerTap={onCategoriesList}
                        layout={{ position: 'absolute', left: 0, width: 240, top: 160, height: 21 }}
                    />
                    <Region
                        name="create_visitors_caption"
                        params={1041}
                        layout={{ position: 'absolute', left: 0, width: 132, top: 190, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={t('navigator.maxvisitors')} />
                    </Region>
                    <Dropmenu
                        variant="0"
                        name="visitors_list"
                        params={17}
                        onPointerTap={onVisitorsList}
                        layout={{ position: 'absolute', left: 0, width: 240, top: 210, height: 21 }}
                    />
                    <Region
                        name="create_trade_caption"
                        params={1041}
                        layout={{ position: 'absolute', left: 0, width: 145, top: 240, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={t('navigator.tradesettings')} />
                    </Region>
                    <Dropmenu
                        variant="0"
                        name="trade_settings_list"
                        params={17}
                        onPointerTap={onTradeSettingsList}
                        layout={{ position: 'absolute', left: 0, width: 240, top: 260, height: 21 }}
                    />
                    <ButtonThick
                        variant="0"
                        name="create_button"
                        params={132113}
                        onPointerTap={onCreateButton}
                        layout={{ position: 'absolute', left: 0, width: 100, top: 290, height: 21, minWidth: 100, maxWidth: 100 }}
                    >
                        {t('navigator.createroom.create')}
                    </ButtonThick>
                    <Button
                        variant="0"
                        name="back_button"
                        params={132177}
                        onPointerTap={onBackButton}
                        layout={{ position: 'absolute', left: 140, width: 100, top: 290, height: 21, minWidth: 100, maxWidth: 100 }}
                    >
                        {t('generic.cancel')}
                    </Button>
                </Region>
                <Region
                    name="room_layout_container"
                    params={16}
                    layout={{ position: 'absolute', left: 270, width: 300, top: 15, height: 315 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 0, width: 290, top: 20, height: 295 }}
                    >
                        <Region
                            name="layout_item_list"
                            params={2193}
                            layout={{ flexDirection: 'column', width: '100%' }}
                        />
                    </ScrollArea>
                    <Region
                        name="choose_layout_caption"
                        params={17}
                        layout={{ position: 'absolute', left: 0, width: 257, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={t('navigator.createroom.chooselayoutcaption')} />
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
