import { IAssetData, RoomObjectVariableEnum, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';

import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureExternalImageLogic extends FurnitureMultiStateLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [ RoomObjectWidgetRequestEvent.EXTERNAL_IMAGE ]);
    }

    public override initialize(asset: IAssetData | undefined): void {
        super.initialize(asset);

        // `FurnitureExternalImageLogic.initialize`: both variables are only set when the logic carries a `mask` type.
        const maskType = asset?.logic?.maskType;

        if (maskType === undefined) return;

        this.object.model.setValue(RoomObjectVariableEnum.FurnitureUsesPlaneMask, true);
        this.object.model.setValue(RoomObjectVariableEnum.FurniturePlaneMaskType, maskType);
    }

    public override useObject(): void {
        this.handleRoomObjectEvent(
            new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.EXTERNAL_IMAGE, this.object),
        );

        super.useObject();
    }
}
