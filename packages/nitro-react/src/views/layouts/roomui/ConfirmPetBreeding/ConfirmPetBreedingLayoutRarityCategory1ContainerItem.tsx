import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `rarityCategory1.container` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutRarityCategory1ContainerItemProps {
    itemsBreeds1?: ReactNode;
    layout?: BoxLayout;
    visibleBreeds1?: boolean;
}

export const ConfirmPetBreedingLayoutRarityCategory1ContainerItem = ({ itemsBreeds1, layout, visibleBreeds1 }: ConfirmPetBreedingLayoutRarityCategory1ContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rarityCategory1.container"
            layout={{ alignSelf: 'stretch', height: 25, flexShrink: 0, ...layout }}
        >
            <ThemeText
                text={t('breedpets.confirmation.widget.raritycategory.1')}
                textStyle="text-style-il-heading-3"
                layout={{ position: 'absolute', left: 0, width: 104, top: 5, bottom: 5, minWidth: 100 }}
            />
            {(visibleBreeds1 ?? true) && (
                <Region
                    name="breeds1"
                    layout={{ position: 'absolute', right: -10, width: 200, top: 0, bottom: 0, flexDirection: 'row', gap: 2 }}
                >
                    {itemsBreeds1}
                </Region>
            )}
        </Region>
    );
};
