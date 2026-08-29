import { BoxLayout, Region } from '#base/theme';
import { NewPetsWidget2, NewPetsWidget2Props } from '#base/views/layouts/catalog/widgets/NewPetsWidget2';
import { PetsWidget2, PetsWidget2Props } from '#base/views/layouts/catalog/widgets/PetsWidget2';

/** Named region `ctlg_pets` of LayoutPets_1592Layout - configured through the parent's `ctlgPets` prop. */
export interface LayoutPets_1592LayoutCtlgPetsProps {
    layout?: BoxLayout;
    newPetsWidget?: NewPetsWidget2Props;
    petsWidget?: PetsWidget2Props;
}

export const LayoutPets_1592LayoutCtlgPets = ({ layout, newPetsWidget, petsWidget }: LayoutPets_1592LayoutCtlgPetsProps) => {
    return (
        <Region
            name="ctlg_pets"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <PetsWidget2
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
