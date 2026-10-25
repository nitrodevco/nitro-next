import { ContextMenuEnum } from '@nitrodevco/nitro-api';

import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

/**
 * Port of Flash's obfuscated `§_-fS§`, the logic `RoomObjectFactory` builds for
 * `furniture_random_teleport`.
 */
export class FurnitureRandomTeleportLogic extends FurnitureMultiStateLogic {
    public override get contextMenu(): string {
        return ContextMenuEnum.RANDOM_TELEPORT;
    }
}
