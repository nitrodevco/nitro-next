import { BoxLayout, Region } from '#base/theme';

import { LandingViewGenericReceptionLayoutContentBackground, LandingViewGenericReceptionLayoutContentBackgroundProps } from './LandingViewGenericReceptionLayoutContentBackground';

/** Generated from `8_landing_view_generic_reception_xml` (layout "landing_view", 1172x822) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LandingViewGenericReceptionLayoutProps {
    contentBackground?: LandingViewGenericReceptionLayoutContentBackgroundProps;
    layout?: BoxLayout;
}

export const LandingViewGenericReceptionLayout = ({ contentBackground, layout }: LandingViewGenericReceptionLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1172, height: 822, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <LandingViewGenericReceptionLayoutContentBackground {...contentBackground} />
            </Region>
        </Region>
    );
};
