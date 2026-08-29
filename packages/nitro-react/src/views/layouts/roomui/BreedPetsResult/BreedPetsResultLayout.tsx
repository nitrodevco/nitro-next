import { useTranslation } from '#base/context';
import { BoxLayout, Frame } from '#base/theme';

import { BreedPetsResultLayoutElementList, BreedPetsResultLayoutElementListProps } from './BreedPetsResultLayoutElementList';

/** Generated from `918_breed_pets_result_xml` (layout "breed_pets_result", 275x300) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BreedPetsResultLayoutProps {
    elementList?: BreedPetsResultLayoutElementListProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const BreedPetsResultLayout = ({ elementList, layout, onClose }: BreedPetsResultLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('breedpetsresult.widget.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 275, height: 300, minWidth: 275, minHeight: 300, ...layout }}
        >
            <BreedPetsResultLayoutElementList {...elementList} />
        </Frame>
    );
};
