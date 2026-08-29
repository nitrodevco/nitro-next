import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `rarityCategory4.container` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutRarityCategory4ContainerItemProps {
    itemsBreeds4?: ReactNode;
    layout?: BoxLayout;
    visibleBreeds4?: boolean;
}

export const ConfirmPetBreedingLayoutRarityCategory4ContainerItem = ({ itemsBreeds4, layout, visibleBreeds4 }: ConfirmPetBreedingLayoutRarityCategory4ContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rarityCategory4.container"
            layout={{ width: 280, height: 25, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 129, top: 5, height: 15, minWidth: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('breedpets.confirmation.widget.raritycategory.4')}
                    textStyle="text-style-il-heading-3"
                />
            </Region>
            {(visibleBreeds4 ?? true) && (
                <Region
                    name="breeds4"
                    layout={{ position: 'absolute', left: 90, width: 200, top: 0, height: 20, flexDirection: 'row', gap: 2 }}
                >
                    {itemsBreeds4}
                </Region>
            )}
        </Region>
    );
};
