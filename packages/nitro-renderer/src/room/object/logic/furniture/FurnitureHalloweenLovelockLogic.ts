import { FriendFurniEngravingWidgetType } from '@nitrodevco/nitro-api';

import { FurnitureFriendFurniLogic } from './FurnitureFriendFurniLogic';

/**
 * Port of Flash's obfuscated `§_-XI§`, the logic `RoomObjectFactory` builds for
 * `furniture_hween_lovelock`.
 */
export class FurnitureHalloweenLovelockLogic extends FurnitureFriendFurniLogic {
    public override get engravingDialogType(): number {
        return FriendFurniEngravingWidgetType.HABBOWEEN;
    }
}
