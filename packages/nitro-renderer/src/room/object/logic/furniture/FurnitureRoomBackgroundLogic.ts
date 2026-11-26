import { IRoomObjectModel } from '@nitrodevco/nitro-api';

import { FurnitureRoomBrandingLogic } from './FurnitureRoomBrandingLogic';

/**
 * Port of Flash `FurnitureRoomBackgroundLogic`, the logic `RoomObjectFactory` builds for
 * `furniture_bg`.
 */
export class FurnitureRoomBackgroundLogic extends FurnitureRoomBrandingLogic {
    protected override getAdClickUrl(_model: IRoomObjectModel): string | undefined {
        return undefined;
    }
}
