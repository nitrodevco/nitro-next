import { BoxLayout, Region } from '#base/theme';

import { RosRoomSettingsLayoutNormalRightsContainer, RosRoomSettingsLayoutNormalRightsContainerProps } from './RosRoomSettingsLayoutNormalRightsContainer';

/** Named region `tab_container_3` of RosRoomSettingsLayout - configured through the parent's `tabContainer3` prop. */
export interface RosRoomSettingsLayoutTabContainer3Props {
    layout?: BoxLayout;
    normalRightsContainer?: RosRoomSettingsLayoutNormalRightsContainerProps;
    visibleGuildRightsContainer?: boolean;
    visibleTabContainer3?: boolean;
}

export const RosRoomSettingsLayoutTabContainer3 = ({ layout, normalRightsContainer, visibleGuildRightsContainer, visibleTabContainer3 }: RosRoomSettingsLayoutTabContainer3Props) => {
    return (
        (visibleTabContainer3 ?? false) && (
            <Region
                name="tab_container_3"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 367, ...layout }}
            >
                {(visibleGuildRightsContainer ?? false) && (
                    <Region
                        name="guild_rights_container"
                        layout={{ position: 'absolute', left: 6, right: 6, top: 0, bottom: 0 }}
                    >
                        {/* `text` is hidden and has no name to show it by */}
                        {/* `text` is hidden and has no name to show it by */}
                    </Region>
                )}
                <RosRoomSettingsLayoutNormalRightsContainer {...normalRightsContainer} />
            </Region>
        )
    );
};
