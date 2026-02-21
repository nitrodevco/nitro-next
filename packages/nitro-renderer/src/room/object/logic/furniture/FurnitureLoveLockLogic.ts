import { FriendFurniEngravingWidgetType } from '@nitrodevco/nitro-api';

import { FurnitureFriendFurniLogic } from './FurnitureFriendFurniLogic';

export class FurnitureLoveLockLogic extends FurnitureFriendFurniLogic {
    public override get engravingDialogType(): number {
        return FriendFurniEngravingWidgetType.LOVE_LOCK;
    }
}
