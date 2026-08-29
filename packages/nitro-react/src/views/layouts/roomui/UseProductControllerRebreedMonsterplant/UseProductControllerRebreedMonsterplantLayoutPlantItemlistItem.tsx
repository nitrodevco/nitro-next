import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { UseProductControllerRebreedMonsterplantLayoutPlantDescriptionItem } from './UseProductControllerRebreedMonsterplantLayoutPlantDescriptionItem';
import { UseProductControllerRebreedMonsterplantLayoutPlantNameItem } from './UseProductControllerRebreedMonsterplantLayoutPlantNameItem';
import { UseProductControllerRebreedMonsterplantLayoutPlantRarityLevelItem } from './UseProductControllerRebreedMonsterplantLayoutPlantRarityLevelItem';
import { UseProductControllerRebreedMonsterplantLayoutPreviewImageRegionItem } from './UseProductControllerRebreedMonsterplantLayoutPreviewImageRegionItem';

/** Row template `plant_itemlist` of UseProductControllerRebreedMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerRebreedMonsterplantLayoutPlantItemlistItemProps {
    itemsPlantItemlist?: ReactNode;
    layout?: BoxLayout;
}

export const UseProductControllerRebreedMonsterplantLayoutPlantItemlistItem = ({ itemsPlantItemlist, layout }: UseProductControllerRebreedMonsterplantLayoutPlantItemlistItemProps) => {
    return (
        <Region
            name="plant_itemlist"
            layout={{ alignSelf: 'stretch', flexShrink: 0, minWidth: 130, maxWidth: 130, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsPlantItemlist ?? (
                <>
                    <UseProductControllerRebreedMonsterplantLayoutPlantNameItem />
                    <UseProductControllerRebreedMonsterplantLayoutPreviewImageRegionItem />
                    <UseProductControllerRebreedMonsterplantLayoutPlantRarityLevelItem />
                    <UseProductControllerRebreedMonsterplantLayoutPlantDescriptionItem />
                </>
            )}
        </Region>
    );
};
