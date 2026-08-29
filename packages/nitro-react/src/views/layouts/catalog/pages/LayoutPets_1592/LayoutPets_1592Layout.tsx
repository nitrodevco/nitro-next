import { BoxLayout, Region } from '#base/theme';

import { LayoutPets_1592LayoutCtlgPets, LayoutPets_1592LayoutCtlgPetsProps } from './LayoutPets_1592LayoutCtlgPets';

/** Generated from `1592_layout_pets_xml` (layout "ctlg_pets", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutPets_1592LayoutProps {
    ctlgPets?: LayoutPets_1592LayoutCtlgPetsProps;
    layout?: BoxLayout;
}

export const LayoutPets_1592Layout = ({ ctlgPets, layout }: LayoutPets_1592LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutPets_1592LayoutCtlgPets {...ctlgPets} />
        </Region>
    );
};
