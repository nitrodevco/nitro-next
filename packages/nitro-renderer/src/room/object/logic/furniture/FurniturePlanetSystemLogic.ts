import { type IAssetData, type IAssetLogicPlanetSystem, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { FurnitureLogic } from './FurnitureLogic';

export class FurniturePlanetSystemLogic extends FurnitureLogic {
    public override initialize(asset: IAssetData): void {
        super.initialize(asset);

        if (asset.logic && asset.logic.planetSystems)
            this.object.model.setValue<IAssetLogicPlanetSystem[]>(
                RoomObjectVariableEnum.FurniturePlanetsystemData,
                asset.logic.planetSystems,
            );
    }
}
