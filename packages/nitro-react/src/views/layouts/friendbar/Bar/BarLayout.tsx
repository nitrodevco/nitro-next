import { BoxLayout, Region } from '#base/theme';

import { BarLayoutBorder, BarLayoutBorderProps } from './BarLayoutBorder';

/** Generated from `28_bar_xml` (layout "bar", 420x48) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BarLayoutProps {
    border?: BarLayoutBorderProps;
    layout?: BoxLayout;
}

export const BarLayout = ({ border, layout }: BarLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 420, height: 48, ...layout }}>
            <BarLayoutBorder {...border} />
        </Region>
    );
};
