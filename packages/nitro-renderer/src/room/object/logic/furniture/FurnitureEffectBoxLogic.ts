import { ContextMenuEnum, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';

import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

/**
 * Port of Flash's obfuscated `§_-I2Q§`, the logic `RoomObjectFactory` builds for
 * `furniture_effectbox`.
 */
export class FurnitureEffectBoxLogic extends FurnitureMultiStateLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [ RoomObjectWidgetRequestEvent.EFFECTBOX_OPEN_DIALOG ]);
    }

    public override useObject(): void {
        this.handleRoomObjectEvent(
            new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.EFFECTBOX_OPEN_DIALOG, this.object),
        );
    }

    public override get contextMenu(): string {
        return ContextMenuEnum.EFFECT_BOX;
    }
}
