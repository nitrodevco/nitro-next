import { FriendFurniEngravingWidgetType } from '@nitrodevco/nitro-api';

import { FurnitureFriendFurniLogic } from './FurnitureFriendFurniLogic';

/**
 * Flash `§_-4y§` (`RoomObjectLogicEnum.FURNITURE_WILD_WEST_WANTED_ENGRAVING`,
 * `furniture_wildwest_wanted`): the wild west wanted poster, a friend furni like the love lock
 * whose locked engraving opens `WildWestEngravingView` - `engravingDialogType` 3.
 */
export class FurnitureWildWestWantedLogic extends FurnitureFriendFurniLogic {
    public override get engravingDialogType(): number {
        return FriendFurniEngravingWidgetType.WILD_WEST_WANTED;
    }
}
