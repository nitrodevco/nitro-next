import { BoxLayout, Region } from '#base/theme';

import { SpectatorModeLayoutSpectatorModeContainer, SpectatorModeLayoutSpectatorModeContainerProps } from './SpectatorModeLayoutSpectatorModeContainer';

/** Generated from `867_spectator_mode_xml` (layout "spectator_mode", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SpectatorModeLayoutProps {
    layout?: BoxLayout;
    spectatorModeContainer?: SpectatorModeLayoutSpectatorModeContainerProps;
}

export const SpectatorModeLayout = ({ layout, spectatorModeContainer }: SpectatorModeLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <SpectatorModeLayoutSpectatorModeContainer {...spectatorModeContainer} />
        </Region>
    );
};
