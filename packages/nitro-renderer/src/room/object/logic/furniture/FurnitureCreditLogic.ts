import { IAssetData, RoomObjectVariableEnum, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';

import { FurnitureLogic } from './FurnitureLogic';

/**
 * Port of Flash `FurnitureCreditLogic`, the logic `RoomObjectFactory` builds for
 * `furniture_credit`.
 */
export class FurnitureCreditLogic extends FurnitureLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [ RoomObjectWidgetRequestEvent.CREDITFURNI ]);
    }

    public override initialize(asset: IAssetData | undefined): void {
        super.initialize(asset);

        const credits = asset?.logic?.credits;

        // Only an asset that carries `credits` gives the furni a value.
        if (credits === undefined || credits === null) return;

        this.object.model.setValue(RoomObjectVariableEnum.FurnitureCreditValue, Number(credits));
    }

    public override useObject(): void {
        this.handleRoomObjectEvent(
            new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.CREDITFURNI, this.object),
        );

        super.useObject();
    }
}
