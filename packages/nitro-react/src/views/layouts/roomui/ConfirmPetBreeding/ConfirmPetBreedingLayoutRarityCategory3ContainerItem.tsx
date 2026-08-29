import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `rarityCategory3.container` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutRarityCategory3ContainerItemProps {
    itemsBreeds3?: ReactNode;
    layout?: BoxLayout;
    visibleBreeds3?: boolean;
}

export const ConfirmPetBreedingLayoutRarityCategory3ContainerItem = ({ itemsBreeds3, layout, visibleBreeds3 }: ConfirmPetBreedingLayoutRarityCategory3ContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rarityCategory3.container"
            layout={{ width: 280, height: 25, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 143, top: 5, height: 15, minWidth: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('breedpets.confirmation.widget.raritycategory.3')}
                    textStyle="text-style-il-heading-3"
                />
            </Region>
            {(visibleBreeds3 ?? true) && (
                <Region
                    name="breeds3"
                    layout={{ position: 'absolute', left: 90, width: 200, top: 0, height: 25, flexDirection: 'row', gap: 2 }}
                >
                    {itemsBreeds3}
                </Region>
            )}
        </Region>
    );
};
