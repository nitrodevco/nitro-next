import { BoxLayout, Region } from '#base/theme';

import { BadgeLayerLayoutContainer, BadgeLayerLayoutContainerProps } from './BadgeLayerLayoutContainer';

/** Generated from `1192_badge_layer_xml` (layout "badge_layer", 247x49) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BadgeLayerLayoutProps {
    container?: BadgeLayerLayoutContainerProps;
    layout?: BoxLayout;
}

export const BadgeLayerLayout = ({ container, layout }: BadgeLayerLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 247, height: 49, ...layout }}>
            <BadgeLayerLayoutContainer {...container} />
        </Region>
    );
};
