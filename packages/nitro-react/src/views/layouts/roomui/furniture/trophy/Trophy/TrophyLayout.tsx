import { BoxLayout, Region } from '#base/theme';

import { TrophyLayoutTrophyContainer, TrophyLayoutTrophyContainerProps } from './TrophyLayoutTrophyContainer';

/** Generated from `999_trophy_xml` (layout "trophy_general", 340x173) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TrophyLayoutProps {
    layout?: BoxLayout;
    trophyContainer?: TrophyLayoutTrophyContainerProps;
}

export const TrophyLayout = ({ layout, trophyContainer }: TrophyLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 340, height: 173, ...layout }}>
            <TrophyLayoutTrophyContainer {...trophyContainer} />
        </Region>
    );
};
