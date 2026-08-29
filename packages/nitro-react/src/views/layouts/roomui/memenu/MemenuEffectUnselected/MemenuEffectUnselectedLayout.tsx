import { BoxLayout, Region } from '#base/theme';

import { MemenuEffectUnselectedLayoutSelectedBorder, MemenuEffectUnselectedLayoutSelectedBorderProps } from './MemenuEffectUnselectedLayoutSelectedBorder';

/** Generated from `828_memenu_effect_unselected_xml` (layout "memenu_effect_unselected", 154x52) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MemenuEffectUnselectedLayoutProps {
    layout?: BoxLayout;
    selectedBorder?: MemenuEffectUnselectedLayoutSelectedBorderProps;
}

export const MemenuEffectUnselectedLayout = ({ layout, selectedBorder }: MemenuEffectUnselectedLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 154, height: 52, ...layout }}>
            <MemenuEffectUnselectedLayoutSelectedBorder {...selectedBorder} />
        </Region>
    );
};
