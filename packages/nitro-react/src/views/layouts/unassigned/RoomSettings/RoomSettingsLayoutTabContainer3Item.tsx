import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

import { RoomSettingsLayoutNormalRightsContainer, RoomSettingsLayoutNormalRightsContainerProps } from './RoomSettingsLayoutNormalRightsContainer';

/** Row template `tab_container_3` of RoomSettingsLayout - pass real rows through its `items…` slot. */
export interface RoomSettingsLayoutTabContainer3ItemProps {
    layout?: BoxLayout;
    normalRightsContainer?: RoomSettingsLayoutNormalRightsContainerProps;
    visibleGuildRightsContainer?: boolean;
    visibleNormalRightsContainer?: boolean;
}

export const RoomSettingsLayoutTabContainer3Item = ({ layout, normalRightsContainer, visibleGuildRightsContainer, visibleNormalRightsContainer }: RoomSettingsLayoutTabContainer3ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="tab_container_3"
            layout={{ width: 324, height: 367, flexShrink: 0, ...layout }}
        >
            {(visibleGuildRightsContainer ?? false) && (
                <Region
                    name="guild_rights_container"
                    layout={{ position: 'absolute', left: 6, right: -62, top: 0, height: 367 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, width: 215, top: 3, height: 38, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('navigator.flatctrls.guild.caption')}
                            textStyle="text-style-u-headline-small"
                            textOptions={{ wordWrap: true, wordWrapWidth: 215 }}
                        />
                    </Region>
                    <Region layout={{ position: 'absolute', left: 0, width: 309, top: 42, height: 240, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('navigator.flatctrls.guild.info')}
                            textStyle="text-style-u-regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 309 }}
                        />
                    </Region>
                </Region>
            )}
            {(visibleNormalRightsContainer ?? true) && (
                <RoomSettingsLayoutNormalRightsContainer {...normalRightsContainer} />
            )}
        </Region>
    );
};
