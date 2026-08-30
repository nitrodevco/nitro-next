import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Dropmenu, Region, ThemeText } from '#base/theme';

import { WiredMenuViewLayoutModifySettingsContainer, WiredMenuViewLayoutModifySettingsContainerProps } from './WiredMenuViewLayoutModifySettingsContainer';
import { WiredMenuViewLayoutReadSettingsContainer, WiredMenuViewLayoutReadSettingsContainerProps } from './WiredMenuViewLayoutReadSettingsContainer';

/** Named region `room_settings_container` of WiredMenuViewLayout - configured through the parent's `roomSettingsContainer` prop. */
export interface WiredMenuViewLayoutRoomSettingsContainerProps {
    captionTitle?: string;
    layout?: BoxLayout;
    modifySettingsContainer?: WiredMenuViewLayoutModifySettingsContainerProps;
    onReloadRoomBtn?: () => void;
    onRollBackBtn?: () => void;
    onTimezonePicker?: () => void;
    readSettingsContainer?: WiredMenuViewLayoutReadSettingsContainerProps;
}

export const WiredMenuViewLayoutRoomSettingsContainer = ({ captionTitle, layout, modifySettingsContainer, onReloadRoomBtn, onRollBackBtn, onTimezonePicker, readSettingsContainer }: WiredMenuViewLayoutRoomSettingsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="room_settings_container"
            layout={{ position: 'absolute', left: 14, width: 472, top: 18, height: 220, ...layout }}
        >
            <ThemeText
                text={captionTitle ?? '${wiredmenu.settings.room_settings)'}
                name="title"
                layout={{ position: 'absolute', left: 0, width: 208, top: 0, height: 19 }}
            />
            <Border
                variant="3"
                name="room_settings_border"
                tintColor="#dadada"
                layout={{ position: 'absolute', left: 0, right: 245, top: 20, height: 111 }}
            >
                <WiredMenuViewLayoutModifySettingsContainer {...modifySettingsContainer} />
            </Border>
            <Border
                variant="3"
                name="room_settings_border"
                tintColor="#dadada"
                layout={{ position: 'absolute', left: 245, right: 0, top: 20, height: 111 }}
            >
                <WiredMenuViewLayoutReadSettingsContainer {...readSettingsContainer} />
            </Border>
            <Border
                variant="3"
                name="room_settings_border"
                tintColor="#dadada"
                layout={{ position: 'absolute', left: 0, right: 245, top: 143, height: 64 }}
            >
                <Region
                    name="timezone_container"
                    layout={{ position: 'absolute', left: 10, width: 212, top: 8, height: 50 }}
                >
                    <ThemeText
                        text={t('wiredmenu.settings.room_settings.timezone')}
                        layout={{ position: 'absolute', left: 0, width: 205, top: 0, height: 20 }}
                    />
                    <Dropmenu
                        variant="3"
                        name="timezone_picker"
                        onPointerTap={onTimezonePicker}
                        layout={{ position: 'absolute', left: 0, width: 206, top: 21, height: 25 }}
                    />
                </Region>
            </Border>
            <Border
                variant="3"
                name="room_settings_border"
                tintColor="#dadada"
                layout={{ position: 'absolute', left: 245, right: 0, top: 143, height: 64 }}
            >
                <Region
                    name="timezone_container"
                    layout={{ position: 'absolute', left: 10, width: 212, top: 8, height: 50 }}
                >
                    <ThemeText
                        text={t('wiredmenu.settings.room_settings.room_state')}
                        layout={{ position: 'absolute', left: 0, width: 205, top: 0, height: 20 }}
                    />
                    <Button
                        variant="3"
                        name="reload_room_btn"
                        onPointerTap={onReloadRoomBtn}
                        textStyle="text-style-button-shiny-regular"
                        layout={{ position: 'absolute', left: 0, width: 98, top: 21, height: 28, minWidth: 98, maxWidth: 98 }}
                    >
                        {t('wiredmenu.settings.room_state.reload')}
                    </Button>
                    <Button
                        variant="5"
                        name="roll_back_btn"
                        tintColor="#e33934"
                        onPointerTap={onRollBackBtn}
                        textStyle="text-style-button-shiny-regular"
                        layout={{ position: 'absolute', left: 109, width: 98, top: 21, height: 28, minWidth: 98, maxWidth: 98 }}
                    >
                        {t('wiredmenu.settings.room_state.roll_back')}
                    </Button>
                </Region>
            </Border>
        </Region>
    );
};
