import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `button_settings` of RoomToolsToolbarLayout - pass real rows through its `items…` slot. */
export interface RoomToolsToolbarLayoutButtonSettingsItemProps {
    captionTextSettings?: string;
    layout?: BoxLayout;
    onButtonSettings?: () => void;
    visibleTextSettings?: boolean;
}

export const RoomToolsToolbarLayoutButtonSettingsItem = ({ captionTextSettings, layout, onButtonSettings, visibleTextSettings }: RoomToolsToolbarLayoutButtonSettingsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="button_settings"
            tooltip={t('room.settings.button.tooltip')}
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onButtonSettings}
            cursor="pointer"
            layout={{ width: 130, height: 25, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 28, top: 0, bottom: 0 }} />
            <ThemeImage
                src={layoutImage('roomtools_gear.png')}
                layout={{ position: 'absolute', left: 3, width: 25, top: 0, height: 25 }}
            />
            {(visibleTextSettings ?? true) && (
                <ThemeText
                    text={captionTextSettings ?? t('room.settings.button.text')}
                    textOptions={{ fill: '#cccccc' }}
                    name="text_settings"
                    layout={{ position: 'absolute', left: 36, width: 90, top: 4, height: 14, maxWidth: 90 }}
                />
            )}
        </Region>
    );
};
