import { BoxLayout, Region } from '#base/theme';
import { NewPetsWidget2, NewPetsWidget2Props } from '#base/views/layouts/catalog/widgets/NewPetsWidget2';
import { PetsWidget, PetsWidgetProps } from '#base/views/layouts/catalog/widgets/PetsWidget';

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

/** Named region `ctlg_pets` of LayoutPets_1592Layout - configured through the parent's `ctlgPets` prop. */
export interface LayoutPets_1592LayoutCtlgPetsProps {
    layout?: BoxLayout;
    newPetsWidget?: NewPetsWidget2Props;
    petsWidget?: PetsWidgetProps;
}

export const LayoutPets_1592LayoutCtlgPets = ({ layout, newPetsWidget, petsWidget }: LayoutPets_1592LayoutCtlgPetsProps) => {
    return (
        <Region
            name="ctlg_pets"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <PetsWidget
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
                {...petsWidget}
            />
            <NewPetsWidget2
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
                {...newPetsWidget}
            />
        </Region>
    );
};
