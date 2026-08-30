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
            layout={{ alignSelf: 'stretch', height: 25, flexShrink: 0, ...layout }}
        >
            <ThemeText
                text={t('breedpets.confirmation.widget.raritycategory.4')}
                textStyle="text-style-il-heading-3"
                layout={{ position: 'absolute', left: 0, width: 129, top: 5, bottom: 5, minWidth: 100 }}
            />
            {(visibleBreeds4 ?? true) && (
                <Region
                    name="breeds4"
                    layout={{ position: 'absolute', right: -10, width: 200, top: 0, bottom: 5, flexDirection: 'row', gap: 2 }}
                >
                    {itemsBreeds4}
                </Region>
            )}
        </Region>
    );
};
