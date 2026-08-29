import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ScrollArea, TextInput } from '#base/theme';

/** Generated from `3068_iro_room_filter_framed_xml` (layout "iro_room_filter_framed", 250x230) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IroRoomFilterFramedLayoutProps {
    itemsBadwordsItemlist?: ReactNode;
    layout?: BoxLayout;
    onBadwordAddBtn?: () => void;
    onBadwordRemoveBtn?: () => void;
    onClose?: () => void;
}

export const IroRoomFilterFramedLayout = ({ itemsBadwordsItemlist, layout, onBadwordAddBtn, onBadwordRemoveBtn, onClose }: IroRoomFilterFramedLayoutProps) => {
    const t = useTranslation();
    const [ roomfilterAddwordTxtValue, setRoomfilterAddwordTxtValue ] = useState('');

    return (
        <Frame
            variant="3"
            id="event_window"
            name="event_window"
            caption={t('navigator.roomsettings.roomfilter')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 250, height: 230, minWidth: 250, minHeight: 230, ...layout }}
        >
            <Border
                variant="0"
                name="roomfilter_addword_border"
                layout={{ position: 'absolute', left: 5, width: 130, top: 8, height: 30 }}
            >
                <TextInput
                    value={roomfilterAddwordTxtValue}
                    onChange={setRoomfilterAddwordTxtValue}
                    layout={{ position: 'absolute', left: 5, right: 10, top: 6, bottom: 7, maxWidth: 115 }}
                />
            </Border>
            <Border
                variant="0"
                name="roomfilter_badwords_border"
                layout={{ position: 'absolute', left: 5, right: -2, top: 50, height: 100 }}
            >
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 3, right: 6, top: 4, bottom: 1 }}
                >
                    <Region
                        name="badwords_itemlist"
                        layout={{ flexDirection: 'column', width: '100%' }}
                    >
                        {itemsBadwordsItemlist}
                    </Region>
                </ScrollArea>
                {/* <scrollbar_vertical> for badwords_itemlist - rendered by that list's ScrollArea */}
            </Border>
            <Button
                variant="3"
                name="badword_remove_btn"
                onPointerTap={onBadwordRemoveBtn}
                layout={{ position: 'absolute', left: 140, width: 286, bottom: 4, height: 30 }}
            >
                {t('navigator.roomsettings.roomfilter.removeword')}
            </Button>
            <Button
                variant="3"
                name="badword_add_btn"
                onPointerTap={onBadwordAddBtn}
                layout={{ position: 'absolute', left: 140, width: 264, top: 8, height: 30 }}
            >
                {t('navigator.roomsettings.roomfilter.addword')}
            </Button>
        </Frame>
    );
};
