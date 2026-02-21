import { ContextMenuEnum } from '@nitrodevco/nitro-api';
import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-events';

import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureEffectBoxLogic extends FurnitureLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [RoomObjectWidgetRequestEvent.EFFECTBOX_OPEN_DIALOG]);
    }

    public override useObject(): void {
        this.dispatchEvent(
            new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.EFFECTBOX_OPEN_DIALOG, this.object),
        );
    }

    public override get contextMenu(): string {
        return ContextMenuEnum.EFFECT_BOX;
    }
}
