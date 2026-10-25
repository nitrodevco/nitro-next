import { IRoomGeometry, IRoomSpriteMouseEvent, MouseEventType, RoomObjectFurnitureActionEvent } from '@nitrodevco/nitro-api';

import { FurnitureLogic } from './FurnitureLogic';

/**
 * Flash `FurnitureNftRewardBoxLogic`: an NFT loot box. Double-clicking one that is still closed
 * (state 0) asks the client to open it - `ROFCAE_NFT_REWARD_BOX`, which
 * `RoomObjectEventHandler.useObject` answers with a confirmation and `RedeemNftLootBoxMessageComposer`.
 * Once opened it is an ordinary furni, and a double click does nothing at all.
 */
export class FurnitureNftRewardBoxLogic extends FurnitureLogic {
    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [ RoomObjectFurnitureActionEvent.NFT_REWARD_BOX ]);
    }

    public override mouseEvent(event: IRoomSpriteMouseEvent, geometry: IRoomGeometry | undefined): void {
        if (!event || !geometry || !this.object) return;

        if (event.type !== MouseEventType.DOUBLE_CLICK) {
            super.mouseEvent(event, geometry);

            return;
        }

        if (!this.hasBeenOpened) this.useObject();
    }

    public override useObject(): void {
        if (!this.object) return;

        this.handleRoomObjectEvent(new RoomObjectFurnitureActionEvent(RoomObjectFurnitureActionEvent.NFT_REWARD_BOX, this.object));
    }

    private get hasBeenOpened(): boolean {
        return this.object.getState(0) !== 0;
    }
}
