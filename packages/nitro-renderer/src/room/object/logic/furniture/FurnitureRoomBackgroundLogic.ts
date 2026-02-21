import type { IRoomObjectModel } from '@nitrodevco/nitro-api';

import { FurnitureRoomBrandingLogic } from './FurnitureRoomBrandingLogic';

export class FurnitureRoomBackgroundLogic extends FurnitureRoomBrandingLogic {
    protected override getAdClickUrl(model: IRoomObjectModel): string {
        return '';
    }
}
