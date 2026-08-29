import { BoxLayout, Region } from '#base/theme';

import { LayoutPets_1697LayoutCtlgPets, LayoutPets_1697LayoutCtlgPetsProps } from './LayoutPets_1697LayoutCtlgPets';

/** Generated from `1697_layout_pets_xml` (layout "ctlg_pets", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutPets_1697LayoutProps {
    ctlgPets?: LayoutPets_1697LayoutCtlgPetsProps;
    layout?: BoxLayout;
}

export const LayoutPets_1697Layout = ({ ctlgPets, layout }: LayoutPets_1697LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutPets_1697LayoutCtlgPets {...ctlgPets} />
        </Region>
    );
};
