import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { UseProductControllerFertilizeMonsterplantLayoutPlantDescriptionItem } from './UseProductControllerFertilizeMonsterplantLayoutPlantDescriptionItem';
import { UseProductControllerFertilizeMonsterplantLayoutPlantNameItem } from './UseProductControllerFertilizeMonsterplantLayoutPlantNameItem';
import { UseProductControllerFertilizeMonsterplantLayoutPlantRarityLevelItem } from './UseProductControllerFertilizeMonsterplantLayoutPlantRarityLevelItem';
import { UseProductControllerFertilizeMonsterplantLayoutPreviewImageItem } from './UseProductControllerFertilizeMonsterplantLayoutPreviewImageItem';

/** Row template `plant_itemlist` of UseProductControllerFertilizeMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerFertilizeMonsterplantLayoutPlantItemlistItemProps {
    itemsPlantItemlist?: ReactNode;
    layout?: BoxLayout;
}

export const UseProductControllerFertilizeMonsterplantLayoutPlantItemlistItem = ({ itemsPlantItemlist, layout }: UseProductControllerFertilizeMonsterplantLayoutPlantItemlistItemProps) => {
    return (
        <Region
            name="plant_itemlist"
            layout={{ alignSelf: 'stretch', flexShrink: 0, minWidth: 130, maxWidth: 130, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsPlantItemlist ?? (
                <>
                    <UseProductControllerFertilizeMonsterplantLayoutPlantNameItem />
                    <UseProductControllerFertilizeMonsterplantLayoutPreviewImageItem />
                    <UseProductControllerFertilizeMonsterplantLayoutPlantRarityLevelItem />
                    <UseProductControllerFertilizeMonsterplantLayoutPlantDescriptionItem />
                </>
            )}
        </Region>
    );
};
