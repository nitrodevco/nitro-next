import { BoxLayout, Region } from '#base/theme';

import { LandingViewJetsetLayoutContentBackground, LandingViewJetsetLayoutContentBackgroundProps } from './LandingViewJetsetLayoutContentBackground';

/** Generated from `15_landing_view_jetset_xml` (layout "landing_view_jetset", 1172x822) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LandingViewJetsetLayoutProps {
    contentBackground?: LandingViewJetsetLayoutContentBackgroundProps;
    layout?: BoxLayout;
}

export const LandingViewJetsetLayout = ({ contentBackground, layout }: LandingViewJetsetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1172, height: 822, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <LandingViewJetsetLayoutContentBackground {...contentBackground} />
            </Region>
        </Region>
    );
};
