import { BoxLayout, Region } from '#base/theme';

import { MemenuEffectSelectedLayoutSelectedBorder, MemenuEffectSelectedLayoutSelectedBorderProps } from './MemenuEffectSelectedLayoutSelectedBorder';

/** Generated from `916_memenu_effect_selected_xml` (layout "memenu_effect_selected", 154x52) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MemenuEffectSelectedLayoutProps {
    layout?: BoxLayout;
    selectedBorder?: MemenuEffectSelectedLayoutSelectedBorderProps;
}

export const MemenuEffectSelectedLayout = ({ layout, selectedBorder }: MemenuEffectSelectedLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 154, height: 52, ...layout }}>
            <MemenuEffectSelectedLayoutSelectedBorder {...selectedBorder} />
        </Region>
    );
};
