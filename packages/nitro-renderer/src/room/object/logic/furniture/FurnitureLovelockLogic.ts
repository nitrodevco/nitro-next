import { FriendFurniEngravingWidgetType } from '@nitrodevco/nitro-api';

import { FurnitureFriendFurniLogic } from './FurnitureFriendFurniLogic';

/**
 * Port of Flash's obfuscated `§_-yp§`, the logic `RoomObjectFactory` builds for
 * `furniture_lovelock`.
 */
export class FurnitureLovelockLogic extends FurnitureFriendFurniLogic {
    public override get engravingDialogType(): number {
        return FriendFurniEngravingWidgetType.LOVE_LOCK;
    }
}
