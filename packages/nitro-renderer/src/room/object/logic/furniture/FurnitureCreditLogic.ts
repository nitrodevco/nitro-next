import type { IAssetData } from '@nitrodevco/nitro-api';
import { RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-shared';

import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureCreditLogic extends FurnitureLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [RoomObjectWidgetRequestEvent.CREDITFURNI]);
    }

    public override initialize(asset: IAssetData | undefined): void {
        super.initialize(asset);

        let creditValue = 0;

        if (asset?.logic) creditValue = parseInt(asset.logic.credits ?? '0');

        this.object.model.setValue(RoomObjectVariableEnum.FurnitureCreditValue, creditValue);
    }

    public override useObject(): void {
        this.handleRoomObjectEvent(
            new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.CREDITFURNI, this.object),
        );

        super.useObject();
    }
}
