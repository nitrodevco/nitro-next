import { IAssetData, RoomObjectVariableEnum, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';

import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

/**
 * Port of Flash's obfuscated `§_-D1V§`, the logic `RoomObjectFactory` builds for
 * `furniture_custom_stack_height`.
 */
export class FurnitureCustomStackHeightLogic extends FurnitureMultiStateLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [ RoomObjectWidgetRequestEvent.STACK_HEIGHT ]);
    }

    public override initialize(asset: IAssetData | undefined): void {
        super.initialize(asset);

        this.object.model.setValue(RoomObjectVariableEnum.FurnitureAlwaysStackable, 1);
    }

    public override useObject(): void {
        this.handleRoomObjectEvent(
            new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.STACK_HEIGHT, this.object),
        );

        super.useObject();
    }
}
