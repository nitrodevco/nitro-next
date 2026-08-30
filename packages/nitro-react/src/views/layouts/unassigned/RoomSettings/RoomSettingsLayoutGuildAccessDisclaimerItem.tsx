import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `guild_access_disclaimer` of RoomSettingsLayout - pass real rows through its `items…` slot. */
export interface RoomSettingsLayoutGuildAccessDisclaimerItemProps {
    captionGuildAccessDisclaimer?: string;
    layout?: BoxLayout;
}

export const RoomSettingsLayoutGuildAccessDisclaimerItem = ({ captionGuildAccessDisclaimer, layout }: RoomSettingsLayoutGuildAccessDisclaimerItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionGuildAccessDisclaimer ?? t('navigator.roomsettings.roomaccess.guild.disclaimer')}
            textStyle="text-style-u-regular"
            textOptions={{ wordWrap: true, wordWrapWidth: 305 }}
            name="guild_access_disclaimer"
            verticalAlign="top"
            layout={{ width: 305, height: 33, flexShrink: 0, ...layout }}
        />
    );
};
