import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `guild_access_disclaimer` of RoomSettingsLayout - pass real rows through its `items…` slot. */
export interface RoomSettingsLayoutGuildAccessDisclaimerItemProps {
    captionGuildAccessDisclaimer?: string;
    layout?: BoxLayout;
}

export const RoomSettingsLayoutGuildAccessDisclaimerItem = ({ captionGuildAccessDisclaimer, layout }: RoomSettingsLayoutGuildAccessDisclaimerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="guild_access_disclaimer"
            layout={{ width: 305, height: 33, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionGuildAccessDisclaimer ?? t('navigator.roomsettings.roomaccess.guild.disclaimer')}
                textStyle="text-style-u-regular"
                textOptions={{ wordWrap: true, wordWrapWidth: 305 }}
            />
        </Region>
    );
};
