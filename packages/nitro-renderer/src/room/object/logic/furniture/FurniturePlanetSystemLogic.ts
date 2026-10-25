import { IAssetData, IAssetLogicPlanetSystem, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { FurnitureLogic } from './FurnitureLogic';

/**
 * Port of Flash `FurniturePlanetSystemLogic`, the logic `RoomObjectFactory` builds for
 * `furniture_planet_system`.
 */
export class FurniturePlanetSystemLogic extends FurnitureLogic {
    public override initialize(asset: IAssetData | undefined): void {
        super.initialize(asset);

        if (asset?.logic?.planetSystems) this.object.model.setValue<IAssetLogicPlanetSystem[]>(
            RoomObjectVariableEnum.FurniturePlanetsystemData,
            asset.logic.planetSystems,
        );
    }
}
