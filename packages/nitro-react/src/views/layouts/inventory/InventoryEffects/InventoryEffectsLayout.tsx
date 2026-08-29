import { BoxLayout, Region } from '#base/theme';

import { InventoryEffectsLayoutEffectsContent, InventoryEffectsLayoutEffectsContentProps } from './InventoryEffectsLayoutEffectsContent';

/** Generated from `1439_inventory_effects_xml` (layout "inventory_effects", 468x247) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface InventoryEffectsLayoutProps {
    effectsContent?: InventoryEffectsLayoutEffectsContentProps;
    layout?: BoxLayout;
}

export const InventoryEffectsLayout = ({ effectsContent, layout }: InventoryEffectsLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 468, height: 247, ...layout }}>
            <InventoryEffectsLayoutEffectsContent {...effectsContent} />
        </Region>
    );
};
