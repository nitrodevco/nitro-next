import { type IAssetData, RoomObjectVariable } from '@nitrodevco/nitro-api';
import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-events';

import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureExternalImageLogic extends FurnitureMultiStateLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [RoomObjectWidgetRequestEvent.EXTERNAL_IMAGE]);
    }

    public override initialize(asset: IAssetData): void {
        super.initialize(asset);

        let maskType = '';

        if (asset.logic && asset.logic.maskType && asset.logic.maskType !== '' && asset.logic.maskType.length > 0)
            maskType = asset.logic.maskType;

        this.object.model.setValue(RoomObjectVariable.FURNITURE_USES_PLANE_MASK, 0);
        this.object.model.setValue(RoomObjectVariable.FURNITURE_PLANE_MASK_TYPE, maskType);
    }

    public override useObject(): void {
        this.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.EXTERNAL_IMAGE, this.object));

        super.useObject();
    }
}
