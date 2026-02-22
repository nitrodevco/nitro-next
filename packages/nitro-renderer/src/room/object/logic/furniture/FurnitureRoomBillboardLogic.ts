import type { IRoomObjectModel } from '@nitrodevco/nitro-api';
import { RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { RoomObjectRoomAdEvent } from '@nitrodevco/nitro-events';

import { FurnitureRoomBrandingLogic } from './FurnitureRoomBrandingLogic';

export class FurnitureRoomBillboardLogic extends FurnitureRoomBrandingLogic {
    constructor() {
        super();

        this._hasClickUrl = true;
    }

    protected override getAdClickUrl(model: IRoomObjectModel): string {
        return model.getValue<string>(RoomObjectVariableEnum.FurnitureBrandingUrl);
    }

    protected override handleAdClick(objectId: number, objectType: string, clickUrl: string): void {
        if (clickUrl.indexOf('http') === 0) {
            // HabboWebTools.openWebPage(clickUrl);

            return;
        }

        this.dispatchEvent(
            new RoomObjectRoomAdEvent(RoomObjectRoomAdEvent.ROOM_AD_FURNI_CLICK, this.object, '', clickUrl),
        );
    }
}
