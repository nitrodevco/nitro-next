import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region, ScrollArea, ThemeText } from '#base/theme';

import { RocCreateRoomLayoutRoomSettingsContainer, RocCreateRoomLayoutRoomSettingsContainerProps } from './RocCreateRoomLayoutRoomSettingsContainer';

/** Generated from `3031_roc_create_room_xml` (layout "roc_create_room", 585x367) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RocCreateRoomLayoutProps {
    captionChooseLayoutCaption?: string;
    itemsLayoutItemList?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
    roomSettingsContainer?: RocCreateRoomLayoutRoomSettingsContainerProps;
}

export const RocCreateRoomLayout = ({ captionChooseLayoutCaption, itemsLayoutItemList, layout, onClose, roomSettingsContainer }: RocCreateRoomLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="roc_create_room"
            name="roc_create_room"
            caption={t('navigator.createroom.title')}
            tintColor="#418db0"
            onClose={onClose}
            resizeDirection="y"
            layout={{ width: 585, height: 367, minWidth: 600, maxWidth: 585, minHeight: 367, ...layout }}
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
                    >
                        {itemsLayoutItemList}
                    </Region>
                </ScrollArea>
                {/* <scrollbar_vertical> for layout_item_list - rendered by that list's ScrollArea */}
                <ThemeText
                    text={captionChooseLayoutCaption ?? t('navigator.createroom.chooselayoutcaption')}
                    name="choose_layout_caption"
                    layout={{ position: 'absolute', left: 0, width: 257, top: 0, height: 13 }}
                />
            </Region>
        </Frame>
    );
};
