import { BoxLayout, Region } from '#base/theme';
import { NewPetsWidget, NewPetsWidgetProps } from '#base/views/layouts/catalog/widgets/NewPetsWidget';
import { PetsWidget, PetsWidgetProps } from '#base/views/layouts/catalog/widgets/PetsWidget';

/** Named region `ctlg_pets` of LayoutPets_1592Layout - configured through the parent's `ctlgPets` prop. */
export interface LayoutPets_1592LayoutCtlgPetsProps {
    layout?: BoxLayout;
    newPetsWidget?: NewPetsWidgetProps;
    petsWidget?: PetsWidgetProps;
}

export const LayoutPets_1592LayoutCtlgPets = ({ layout, newPetsWidget, petsWidget }: LayoutPets_1592LayoutCtlgPetsProps) => {
    return (
        <Region
            name="ctlg_pets"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <PetsWidget
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                {...petsWidget}
            />
            <NewPetsWidget
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                {...newPetsWidget}
            />
        </Region>
    );
};
