import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `rarityCategory2.container` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutRarityCategory2ContainerItemProps {
    itemsBreeds2?: ReactNode;
    layout?: BoxLayout;
    visibleBreeds2?: boolean;
}

export const ConfirmPetBreedingLayoutRarityCategory2ContainerItem = ({ itemsBreeds2, layout, visibleBreeds2 }: ConfirmPetBreedingLayoutRarityCategory2ContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rarityCategory2.container"
            layout={{ width: 280, height: 25, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 109, top: 5, height: 15, minWidth: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('breedpets.confirmation.widget.raritycategory.2')}
                    textStyle="text-style-il-heading-3"
                />
            </Region>
            {(visibleBreeds2 ?? true) && (
                <Region
                    name="breeds2"
                    layout={{ position: 'absolute', left: 90, width: 200, top: 0, height: 25, flexDirection: 'row', gap: 2 }}
                >
                    {itemsBreeds2}
                </Region>
            )}
        </Region>
    );
};
