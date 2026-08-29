import { BoxLayout, Region } from '#base/theme';

import { MemenuEffectInactiveLayoutSelectedBorder, MemenuEffectInactiveLayoutSelectedBorderProps } from './MemenuEffectInactiveLayoutSelectedBorder';

/** Generated from `971_memenu_effect_inactive_xml` (layout "memenu_effect_unselected", 154x52) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MemenuEffectInactiveLayoutProps {
    layout?: BoxLayout;
    selectedBorder?: MemenuEffectInactiveLayoutSelectedBorderProps;
}

export const MemenuEffectInactiveLayout = ({ layout, selectedBorder }: MemenuEffectInactiveLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 154, height: 52, ...layout }}>
            <MemenuEffectInactiveLayoutSelectedBorder {...selectedBorder} />
        </Region>
    );
};
