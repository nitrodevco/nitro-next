import { ContextMenuEnum, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';

import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

/**
 * Port of Flash's obfuscated `§_-Gu§`, the logic `RoomObjectFactory` builds for
 * `furniture_monsterplant_seed`.
 */
export class FurnitureMonsterplantSeedLogic extends FurnitureMultiStateLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [
            RoomObjectWidgetRequestEvent.MONSTERPLANT_SEED_PLANT_CONFIRMATION_DIALOG,
        ]);
    }

    public override useObject(): void {
        this.handleRoomObjectEvent(
            new RoomObjectWidgetRequestEvent(
                RoomObjectWidgetRequestEvent.MONSTERPLANT_SEED_PLANT_CONFIRMATION_DIALOG,
                this.object,
            ),
        );
    }

    public override get contextMenu(): string {
        return ContextMenuEnum.MONSTERPLANT_SEED;
    }
}
