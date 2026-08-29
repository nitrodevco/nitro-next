import { BoxLayout, Region } from '#base/theme';

import { LandingViewFurnimaticLayoutContentBackground, LandingViewFurnimaticLayoutContentBackgroundProps } from './LandingViewFurnimaticLayoutContentBackground';

/** Generated from `95_landing_view_furnimatic_xml` (layout "landing_view_furnimatic", 1182x822) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LandingViewFurnimaticLayoutProps {
    contentBackground?: LandingViewFurnimaticLayoutContentBackgroundProps;
    layout?: BoxLayout;
}

export const LandingViewFurnimaticLayout = ({ contentBackground, layout }: LandingViewFurnimaticLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1182, height: 822, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <LandingViewFurnimaticLayoutContentBackground {...contentBackground} />
            </Region>
        </Region>
    );
};
