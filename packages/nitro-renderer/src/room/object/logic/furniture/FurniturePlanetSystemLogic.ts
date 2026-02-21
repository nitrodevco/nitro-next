import { type IAssetData, type IAssetLogicPlanetSystem, RoomObjectVariable } from '@nitrodevco/nitro-api';

import { FurnitureLogic } from './FurnitureLogic';

export class FurniturePlanetSystemLogic extends FurnitureLogic {
    public override initialize(asset: IAssetData): void {
        super.initialize(asset);

        if (asset.logic && asset.logic.planetSystems)
            this.object.model.setValue<IAssetLogicPlanetSystem[]>(
                RoomObjectVariable.FURNITURE_PLANETSYSTEM_DATA,
                asset.logic.planetSystems,
            );
    }
}
