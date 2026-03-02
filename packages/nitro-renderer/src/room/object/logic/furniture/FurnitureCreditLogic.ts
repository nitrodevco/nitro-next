import type { IAssetData } from '@nitrodevco/nitro-api';
import { RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-shared';

import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureCreditLogic extends FurnitureLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [RoomObjectWidgetRequestEvent.CREDITFURNI]);
    }

    public override initialize(asset: IAssetData): void {
        super.initialize(asset);

        let creditValue = 0;

        if (asset.logic && asset.logic.credits && asset.logic.credits !== '' && asset.logic.credits.length > 0)
            creditValue = parseInt(asset.logic.credits);

        this.object.model.setValue(RoomObjectVariableEnum.FurnitureCreditValue, creditValue);
    }

    public override useObject(): void {
        this.handleRoomObjectEvent(
            new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.CREDITFURNI, this.object),
        );

        super.useObject();
    }
}
