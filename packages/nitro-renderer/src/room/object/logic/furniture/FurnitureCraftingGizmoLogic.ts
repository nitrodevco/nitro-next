import { RoomWidgetEnum } from '@nitrodevco/nitro-api';

import { FurnitureLogic } from './FurnitureLogic';

/**
 * Port of Flash's obfuscated `§_-c7§`, the logic `RoomObjectFactory` builds for
 * `furniture_crafting_gizmo`.
 */
export class FurnitureCraftingGizmoLogic extends FurnitureLogic {
    public override get widget(): string {
        return RoomWidgetEnum.CRAFTING;
    }
}
