import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `guild_access_disclaimer` of RosRoomSettingsLayout - pass real rows through its `items…` slot. */
export interface RosRoomSettingsLayoutGuildAccessDisclaimerItemProps {
    captionGuildAccessDisclaimer?: string;
    layout?: BoxLayout;
}

export const RosRoomSettingsLayoutGuildAccessDisclaimerItem = ({ captionGuildAccessDisclaimer, layout }: RosRoomSettingsLayoutGuildAccessDisclaimerItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionGuildAccessDisclaimer ?? t('navigator.roomsettings.roomaccess.guild.disclaimer')}
            textStyle="text-style-u-regular"
            textOptions={{ wordWrap: true, wordWrapWidth: 277 }}
            name="guild_access_disclaimer"
            verticalAlign="top"
            layout={{ width: 277, height: 30, flexShrink: 0, ...layout }}
        />
    );
};
