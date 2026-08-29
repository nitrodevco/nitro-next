import { BoxLayout, Region } from '#base/theme';

import { GamesMainLayoutFooterContainer, GamesMainLayoutFooterContainerProps } from './GamesMainLayoutFooterContainer';
import { GamesMainLayoutInstructionsContainer, GamesMainLayoutInstructionsContainerProps } from './GamesMainLayoutInstructionsContainer';
import { GamesMainLayoutTeaserContainer, GamesMainLayoutTeaserContainerProps } from './GamesMainLayoutTeaserContainer';

/** Named region `quick_play_container` of GamesMainLayout - configured through the parent's `quickPlayContainer` prop. */
export interface GamesMainLayoutQuickPlayContainerProps {
    footerContainer?: GamesMainLayoutFooterContainerProps;
    instructionsContainer?: GamesMainLayoutInstructionsContainerProps;
    layout?: BoxLayout;
    teaserContainer?: GamesMainLayoutTeaserContainerProps;
    visibleInstructionsContainer?: boolean;
}

export const GamesMainLayoutQuickPlayContainer = ({ footerContainer, instructionsContainer, layout, teaserContainer, visibleInstructionsContainer }: GamesMainLayoutQuickPlayContainerProps) => {
    return (
        <Region
            name="quick_play_container"
            layout={{ position: 'absolute', left: 0, right: -6, top: 0, height: 485, ...layout }}
        >
            <GamesMainLayoutTeaserContainer {...teaserContainer} />
            {(visibleInstructionsContainer ?? false) && (
                <GamesMainLayoutInstructionsContainer {...instructionsContainer} />
            )}
            <GamesMainLayoutFooterContainer {...footerContainer} />
        </Region>
    );
};
