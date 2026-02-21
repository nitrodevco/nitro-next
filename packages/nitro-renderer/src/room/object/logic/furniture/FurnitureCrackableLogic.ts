import type { IRoomObjectUpdateMessage } from '@nitrodevco/nitro-api';
import { RoomWidgetEnumItemExtradataParameter } from '@nitrodevco/nitro-api';

import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureCrackableLogic extends FurnitureLogic {
    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        super.processUpdateMessage(message);

        if (this.isRealRoomObject())
            this.object.model.setValue(
                RoomWidgetEnumItemExtradataParameter.INFOSTAND_EXTRA_PARAM,
                RoomWidgetEnumItemExtradataParameter.CRACKABLE_FURNI,
            );
    }
}
