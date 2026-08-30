import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { RoomToolsToolbarLayoutButtonAchievementsItem } from './RoomToolsToolbarLayoutButtonAchievementsItem';
import { RoomToolsToolbarLayoutButtonCameraItem } from './RoomToolsToolbarLayoutButtonCameraItem';
import { RoomToolsToolbarLayoutButtonChatHistoryItem } from './RoomToolsToolbarLayoutButtonChatHistoryItem';
import { RoomToolsToolbarLayoutButtonLikeItem } from './RoomToolsToolbarLayoutButtonLikeItem';
import { RoomToolsToolbarLayoutButtonSettingsItem } from './RoomToolsToolbarLayoutButtonSettingsItem';
import { RoomToolsToolbarLayoutButtonShareItem } from './RoomToolsToolbarLayoutButtonShareItem';
import { RoomToolsToolbarLayoutButtonZoomItem } from './RoomToolsToolbarLayoutButtonZoomItem';
import { RoomToolsToolbarLayoutCntHistoryItem } from './RoomToolsToolbarLayoutCntHistoryItem';

/** Named region `itemlist_buttons` of RoomToolsToolbarLayout - configured through the parent's `itemlistButtons` prop. */
export interface RoomToolsToolbarLayoutItemlistButtonsProps {
    captionZoomText?: string;
    itemsItemlistButtons?: ReactNode;
    layout?: BoxLayout;
    onZoomInBtn?: () => void;
    onZoomOutBtn?: () => void;
}

export const RoomToolsToolbarLayoutItemlistButtons = ({ captionZoomText, itemsItemlistButtons, layout, onZoomInBtn, onZoomOutBtn }: RoomToolsToolbarLayoutItemlistButtonsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="itemlist_buttons"
            layout={{ position: 'absolute', left: 24, top: 6, minWidth: 140, flexDirection: 'column', ...layout }}
        >
            {itemsItemlistButtons ?? (
                <>
                    <RoomToolsToolbarLayoutButtonZoomItem />
                    <RoomToolsToolbarLayoutButtonAchievementsItem />
                    <RoomToolsToolbarLayoutButtonSettingsItem />
                    <RoomToolsToolbarLayoutButtonChatHistoryItem />
                    <RoomToolsToolbarLayoutButtonLikeItem />
                    <RoomToolsToolbarLayoutButtonCameraItem />
                    <RoomToolsToolbarLayoutButtonShareItem />
                    <RoomToolsToolbarLayoutCntHistoryItem />
                </>
            )}
            <Region layout={{ width: 130, height: 30, flexShrink: 0 }}>
                <ThemeText
                    text={captionZoomText ?? t('room.zoom.text')}
                    textOptions={{ fill: '#cccccc' }}
                    name="zoom_text"
                    layout={{ position: 'absolute', left: 6, width: 90, top: 4, height: 14, maxWidth: 90 }}
                />
                <Region
                    backgroundColor="#707070"
                    layout={{ position: 'absolute', left: 3, width: 125, top: 26, height: 1 }}
                />
                <Region
                    name="zoom_in_btn"
                    tooltip={t('room.zoom.zoom_in.tooltip')}
                    dynamicStyle="button"
                    onPointerTap={onZoomInBtn}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 87, width: 18, top: 3, height: 19 }}
                >
                    <ThemeImage
                        src={layoutImage('roomtools_zoom_in.png')}
                        layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18 }}
                    />
                </Region>
                <Region
                    name="zoom_out_btn"
                    tooltip={t('room.zoom.zoom_out.tooltip')}
                    dynamicStyle="button"
                    onPointerTap={onZoomOutBtn}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 107, width: 18, top: 3, height: 19 }}
                >
                    <ThemeImage
                        src={layoutImage('roomtools_zoom_out.png')}
                        layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
