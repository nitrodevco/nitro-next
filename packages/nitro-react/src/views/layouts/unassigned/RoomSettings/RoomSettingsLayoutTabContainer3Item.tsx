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
                    layout={{ position: 'absolute', left: 6, right: -62, top: 0, bottom: 0 }}
                >
                    <ThemeText
                        text={t('navigator.flatctrls.guild.caption')}
                        textStyle="text-style-u-headline-small"
                        textOptions={{ wordWrap: true, wordWrapWidth: 215 }}
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 0, width: 215, top: 3, height: 38 }}
                    />
                    <ThemeText
                        text={t('navigator.flatctrls.guild.info')}
                        textStyle="text-style-u-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 309 }}
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 0, width: 309, top: 42, height: 240 }}
                    />
                </Region>
            )}
            {(visibleNormalRightsContainer ?? true) && (
                <RoomSettingsLayoutNormalRightsContainer {...normalRightsContainer} />
            )}
        </Region>
    );
};
