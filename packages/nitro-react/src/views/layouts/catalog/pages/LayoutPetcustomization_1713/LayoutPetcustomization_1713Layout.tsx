import { BoxLayout, Region } from '#base/theme';

import { LayoutPetcustomization_1713LayoutCtlgPetcustomization, LayoutPetcustomization_1713LayoutCtlgPetcustomizationProps } from './LayoutPetcustomization_1713LayoutCtlgPetcustomization';

/** Generated from `1713_layout_petcustomization_xml` (layout "ctlg_petcustomization", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutPetcustomization_1713LayoutProps {
    ctlgPetcustomization?: LayoutPetcustomization_1713LayoutCtlgPetcustomizationProps;
    layout?: BoxLayout;
}

export const LayoutPetcustomization_1713Layout = ({ ctlgPetcustomization, layout }: LayoutPetcustomization_1713LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutPetcustomization_1713LayoutCtlgPetcustomization {...ctlgPetcustomization} />
        </Region>
    );
};
