import { RoomWidgetEnum } from '@nitrodevco/nitro-api';

import { FurnitureLogic } from './FurnitureLogic';

/**
 * Flash `§_-H29§` (`furniture_vimeo`): a video screen whose use opens the `RWE_VIMEO` widget
 * (`VimeoDisplayWidget`) through `FurnitureLogic.useObject`'s `OPEN_WIDGET`. The video it plays
 * is the `videoId` of its map stuff data.
 */
export class FurnitureVimeoLogic extends FurnitureLogic {
    public override get widget(): string {
        return RoomWidgetEnum.VIMEO;
    }
}
