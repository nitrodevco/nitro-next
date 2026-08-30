import { useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, ButtonThick, Dropmenu, Region, TextInput, ThemeText } from '#base/theme';

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
            <ThemeText
                text={captionCreateRoomCaption ?? t('navigator.roomname')}
                name="create_room_caption"
                layout={{ position: 'absolute', left: 0, width: 122, bottom: 302, height: 13 }}
            />
            <TextInput
                value={roomNameInputValue}
                onChange={setRoomNameInputValue}
                layout={{ position: 'absolute', left: 0, right: 15, bottom: 276, height: 19 }}
            />
            <ThemeText
                text={captionCreateDescCaption ?? t('navigator.roomdesc')}
                name="create_desc_caption"
                layout={{ position: 'absolute', left: 0, width: 120, bottom: 252, height: 13 }}
            />
            <TextInput
                value={roomDescInputValue}
                onChange={setRoomDescInputValue}
                multiline
                layout={{ position: 'absolute', left: 0, right: 15, bottom: 185, height: 60 }}
            />
            <ThemeText
                text={captionCreateCategoryCaption ?? t('navigator.category')}
                name="create_category_caption"
                layout={{ position: 'absolute', left: 0, width: 117, bottom: 162, height: 13 }}
            />
            <Dropmenu
                variant="2"
                name="categories_list"
                onPointerTap={onCategoriesList}
                layout={{ position: 'absolute', left: 0, width: 240, top: 160, height: 21 }}
            />
            <ThemeText
                text={captionCreateVisitorsCaption ?? t('navigator.maxvisitors')}
                name="create_visitors_caption"
                layout={{ position: 'absolute', left: 0, width: 132, bottom: 112, height: 13 }}
            />
            <Dropmenu
                variant="0"
                name="visitors_list"
                onPointerTap={onVisitorsList}
                layout={{ position: 'absolute', left: 0, width: 240, top: 210, height: 21 }}
            />
            <ThemeText
                text={captionCreateTradeCaption ?? t('navigator.tradesettings')}
                name="create_trade_caption"
                layout={{ position: 'absolute', left: 0, width: 145, bottom: 62, height: 13 }}
            />
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
