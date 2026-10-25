import { IRoomObjectModel, RoomObjectRoomAdEvent, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { FurnitureRoomBrandingLogic } from './FurnitureRoomBrandingLogic';

/**
 * Flash `FurnitureRoomBillboardLogic`: a branding furni whose click goes somewhere - the
 * `clickUrl` of its map data (`furniture_branding_url`) rather than the room ad url.
 */
export class FurnitureRoomBillboardLogic extends FurnitureRoomBrandingLogic {
    constructor() {
        super();

        this._hasClickUrl = true;
    }

    protected override getAdClickUrl(model: IRoomObjectModel): string {
        return model.getValue<string>(RoomObjectVariableEnum.FurnitureBrandingUrl);
    }

    protected override handleAdClick(objectId: number, objectType: string, clickUrl: string): void {
        // Flash opens a web address itself (`HabboWebTools.openWebPage`, into the `habboMain`
        // window) and hands anything else to `RoomObjectEventHandler` as an in-client link.
        if (clickUrl.indexOf('http') === 0) {
            window.open(clickUrl, 'habboMain');

            return;
        }

        this.handleRoomObjectEvent(
            new RoomObjectRoomAdEvent(RoomObjectRoomAdEvent.ROOM_AD_FURNI_CLICK, this.object, '', clickUrl),
        );
    }
}
