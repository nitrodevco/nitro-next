import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { UseProductControllerReviveMonsterplantLayoutPlantDescriptionItem } from './UseProductControllerReviveMonsterplantLayoutPlantDescriptionItem';
import { UseProductControllerReviveMonsterplantLayoutPlantNameItem } from './UseProductControllerReviveMonsterplantLayoutPlantNameItem';
import { UseProductControllerReviveMonsterplantLayoutPlantRarityLevelItem } from './UseProductControllerReviveMonsterplantLayoutPlantRarityLevelItem';
import { UseProductControllerReviveMonsterplantLayoutPreviewImageRegionItem } from './UseProductControllerReviveMonsterplantLayoutPreviewImageRegionItem';

/** Row template `plant_itemlist` of UseProductControllerReviveMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerReviveMonsterplantLayoutPlantItemlistItemProps {
    itemsPlantItemlist?: ReactNode;
    layout?: BoxLayout;
}

export const UseProductControllerReviveMonsterplantLayoutPlantItemlistItem = ({ itemsPlantItemlist, layout }: UseProductControllerReviveMonsterplantLayoutPlantItemlistItemProps) => {
    return (
        <Region
            name="plant_itemlist"
            layout={{ alignSelf: 'stretch', flexShrink: 0, minWidth: 130, maxWidth: 130, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsPlantItemlist ?? (
                <>
                    <UseProductControllerReviveMonsterplantLayoutPlantNameItem />
                    <UseProductControllerReviveMonsterplantLayoutPreviewImageRegionItem />
                    <UseProductControllerReviveMonsterplantLayoutPlantRarityLevelItem />
                    <UseProductControllerReviveMonsterplantLayoutPlantDescriptionItem />
                </>
            )}
        </Region>
    );
};
