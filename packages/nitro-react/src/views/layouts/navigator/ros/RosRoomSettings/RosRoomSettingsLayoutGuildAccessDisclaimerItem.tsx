import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `guild_access_disclaimer` of RosRoomSettingsLayout - pass real rows through its `items…` slot. */
export interface RosRoomSettingsLayoutGuildAccessDisclaimerItemProps {
    captionGuildAccessDisclaimer?: string;
    layout?: BoxLayout;
}

export const RosRoomSettingsLayoutGuildAccessDisclaimerItem = ({ captionGuildAccessDisclaimer, layout }: RosRoomSettingsLayoutGuildAccessDisclaimerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="guild_access_disclaimer"
            layout={{ width: 277, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionGuildAccessDisclaimer ?? t('navigator.roomsettings.roomaccess.guild.disclaimer')}
                textStyle="text-style-u-regular"
                textOptions={{ wordWrap: true, wordWrapWidth: 277 }}
            />
        </Region>
    );
};
