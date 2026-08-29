import { useTranslation } from '#base/context';
import { BoxLayout, Frame } from '#base/theme';

import { BreedPetsConfirmationLayoutElementList, BreedPetsConfirmationLayoutElementListProps } from './BreedPetsConfirmationLayoutElementList';

/** Generated from `1067_breed_pets_confirmation_xml` (layout "breed_pets_confirmation", 274x387) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BreedPetsConfirmationLayoutProps {
    elementList?: BreedPetsConfirmationLayoutElementListProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const BreedPetsConfirmationLayout = ({ elementList, layout, onClose }: BreedPetsConfirmationLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('breedpets.widget.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 274, height: 387, ...layout }}
        >
            <BreedPetsConfirmationLayoutElementList {...elementList} />
        </Frame>
    );
};
