import { type IAssetData, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-shared';

import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureExternalImageLogic extends FurnitureMultiStateLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [RoomObjectWidgetRequestEvent.EXTERNAL_IMAGE]);
    }

    public override initialize(asset: IAssetData | undefined): void {
        super.initialize(asset);

        let maskType = '';

        if (asset?.logic?.maskType) maskType = asset.logic.maskType ?? '';

        this.object.model.setValue(RoomObjectVariableEnum.FurnitureUsesPlaneMask, false);
        this.object.model.setValue(RoomObjectVariableEnum.FurniturePlaneMaskType, maskType);
    }

    public override useObject(): void {
        this.handleRoomObjectEvent(
            new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.EXTERNAL_IMAGE, this.object),
        );

        super.useObject();
    }
}
