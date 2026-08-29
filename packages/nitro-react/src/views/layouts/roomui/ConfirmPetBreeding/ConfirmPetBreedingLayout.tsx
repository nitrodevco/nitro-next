import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region } from '#base/theme';

import { ConfirmPetBreedingLayoutCancelButtonItem } from './ConfirmPetBreedingLayoutCancelButtonItem';
import { ConfirmPetBreedingLayoutElementList, ConfirmPetBreedingLayoutElementListProps } from './ConfirmPetBreedingLayoutElementList';
import { ConfirmPetBreedingLayoutSaveButtonItem } from './ConfirmPetBreedingLayoutSaveButtonItem';

/** Generated from `1017_confirm_pet_breeding_xml` (layout "confirm_pet_breeding", 320x623) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ConfirmPetBreedingLayoutProps {
    elementList?: ConfirmPetBreedingLayoutElementListProps;
    itemsButtonList?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const ConfirmPetBreedingLayout = ({ elementList, itemsButtonList, layout, onClose }: ConfirmPetBreedingLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            caption={t('breedpets.confirmation.widget.title')}
            onClose={onClose}
            layout={{ width: 320, height: 623, ...layout }}
        >
            <ConfirmPetBreedingLayoutElementList {...elementList} />
            <Region
                name="button_list"
                layout={{ position: 'absolute', left: 10, top: 524, minWidth: 295, maxWidth: 295, flexDirection: 'column', gap: 3 }}
            >
                {itemsButtonList ?? (
                    <>
                        <ConfirmPetBreedingLayoutSaveButtonItem />
                        <ConfirmPetBreedingLayoutCancelButtonItem />
                    </>
                )}
            </Region>
        </Frame>
    );
};
