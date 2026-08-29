import { BoxLayout, Region } from '#base/theme';

import { LayoutPetcustomization_1656LayoutCtlgPetcustomization, LayoutPetcustomization_1656LayoutCtlgPetcustomizationProps } from './LayoutPetcustomization_1656LayoutCtlgPetcustomization';

/** Generated from `1656_layout_petcustomization_xml` (layout "ctlg_petcustomization", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutPetcustomization_1656LayoutProps {
    ctlgPetcustomization?: LayoutPetcustomization_1656LayoutCtlgPetcustomizationProps;
    layout?: BoxLayout;
}

export const LayoutPetcustomization_1656Layout = ({ ctlgPetcustomization, layout }: LayoutPetcustomization_1656LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutPetcustomization_1656LayoutCtlgPetcustomization {...ctlgPetcustomization} />
        </Region>
    );
};
