import { BoxLayout, Region } from '#base/theme';

import { LandingViewDefaultDynamicLayoutLayoutContentBackground, LandingViewDefaultDynamicLayoutLayoutContentBackgroundProps } from './LandingViewDefaultDynamicLayoutLayoutContentBackground';

/** Generated from `99_landing_view_default_dynamic_layout_xml` (layout "landing_view_default_dynamic_layout", 1172x822) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LandingViewDefaultDynamicLayoutLayoutProps {
    contentBackground?: LandingViewDefaultDynamicLayoutLayoutContentBackgroundProps;
    layout?: BoxLayout;
}

export const LandingViewDefaultDynamicLayoutLayout = ({ contentBackground, layout }: LandingViewDefaultDynamicLayoutLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1172, height: 822, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 1172, top: 0, height: 822 }}
            >
                <LandingViewDefaultDynamicLayoutLayoutContentBackground {...contentBackground} />
            </Region>
        </Region>
    );
};
