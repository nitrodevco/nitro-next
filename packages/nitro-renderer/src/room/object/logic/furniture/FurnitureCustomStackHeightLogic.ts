import type { IAssetData } from '@nitrodevco/nitro-api';
import { RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-events';

import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureCustomStackHeightLogic extends FurnitureMultiStateLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [RoomObjectWidgetRequestEvent.STACK_HEIGHT]);
    }

    public override initialize(asset: IAssetData): void {
        super.initialize(asset);

        this.object.model.setValue(RoomObjectVariableEnum.FurnitureAlwaysStackable, 1);
    }

    public override useObject(): void {
        this.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.STACK_HEIGHT, this.object));

        super.useObject();
    }
}
