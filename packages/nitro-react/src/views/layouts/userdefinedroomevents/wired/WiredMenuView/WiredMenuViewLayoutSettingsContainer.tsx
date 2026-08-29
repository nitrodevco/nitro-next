import { BoxLayout, Region } from '#base/theme';

import { WiredMenuViewLayoutPreferencesContainer, WiredMenuViewLayoutPreferencesContainerProps } from './WiredMenuViewLayoutPreferencesContainer';
import { WiredMenuViewLayoutRoomSettingsContainer, WiredMenuViewLayoutRoomSettingsContainerProps } from './WiredMenuViewLayoutRoomSettingsContainer';

/** Named region `settings_container` of WiredMenuViewLayout - configured through the parent's `settingsContainer` prop. */
export interface WiredMenuViewLayoutSettingsContainerProps {
    layout?: BoxLayout;
    preferencesContainer?: WiredMenuViewLayoutPreferencesContainerProps;
    roomSettingsContainer?: WiredMenuViewLayoutRoomSettingsContainerProps;
    visibleSettingsContainer?: boolean;
}

export const WiredMenuViewLayoutSettingsContainer = ({ layout, preferencesContainer, roomSettingsContainer, visibleSettingsContainer }: WiredMenuViewLayoutSettingsContainerProps) => {
    return (
        (visibleSettingsContainer ?? false) && (
            <Region
                name="settings_container"
                layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 382, ...layout }}
            >
                <WiredMenuViewLayoutRoomSettingsContainer {...roomSettingsContainer} />
                <WiredMenuViewLayoutPreferencesContainer {...preferencesContainer} />
            </Region>
        )
    );
};
