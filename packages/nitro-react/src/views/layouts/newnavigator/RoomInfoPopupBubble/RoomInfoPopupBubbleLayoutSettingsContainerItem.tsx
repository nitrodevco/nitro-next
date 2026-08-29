import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `settings_container` of RoomInfoPopupBubbleLayout - pass real rows through its `items…` slot. */
export interface RoomInfoPopupBubbleLayoutSettingsContainerItemProps {
    layout?: BoxLayout;
    onSettingsRegion?: () => void;
    srcSettingsIcon?: string;
    visibleSettingsIcon?: boolean;
    visibleSettingsRegion?: boolean;
}

export const RoomInfoPopupBubbleLayoutSettingsContainerItem = ({ layout, onSettingsRegion, srcSettingsIcon, visibleSettingsIcon, visibleSettingsRegion }: RoomInfoPopupBubbleLayoutSettingsContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="settings_container"
            layout={{ width: 170, height: 20, flexShrink: 0, ...layout }}
        >
            {(visibleSettingsRegion ?? true) && (
                <Region
                    name="settings_region"
                    onPointerTap={onSettingsRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                >
                    {(visibleSettingsIcon ?? true) && (
                        <ThemeImage
                            name="settings_icon"
                            src={srcSettingsIcon ?? layoutImage('newnavigator_room_settings_icon.png')}
                            layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                        />
                    )}
                </Region>
            )}
            <Region layout={{ position: 'absolute', left: 20, width: 235, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                {t('navigator.room.popup.info.room.settings')}
            </Region>
        </Region>
    );
};
