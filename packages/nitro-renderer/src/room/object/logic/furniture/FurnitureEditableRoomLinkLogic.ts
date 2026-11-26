import { IAssetData, RoomObjectVariableEnum, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';

import { FurnitureLogic } from './FurnitureLogic';

/**
 * Port of Flash's obfuscated `§_-M16§`, the logic `RoomObjectFactory` builds for
 * `furniture_editable_room_link`.
 */
export class FurnitureEditableRoomLinkLogic extends FurnitureLogic {
    private _timers: ReturnType<typeof setInterval>[] = [];

    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [ RoomObjectWidgetRequestEvent.ROOM_LINK ]);
    }

    public override initialize(asset: IAssetData | undefined): void {
        super.initialize(asset);

        // Written whenever the logic has an `action`, with or without a link.
        if (asset?.logic?.action) this.object.model.setValue<string>(RoomObjectVariableEnum.FurnitureInternalLink, asset.logic.action.link ?? '');
    }

    public override dispose(): void {
        for (const timer of this._timers) clearInterval(timer);

        this._timers = [];

        super.dispose();
    }

    public override useObject(): void {
        this.setAutomaticStateIndex(1);

        // Flash starts a repeating `Timer(2500)` on every use and stops none of them, so an earlier
        // use's timer can end a later one's animation early.
        this._timers.push(setInterval(() => this.setAutomaticStateIndex(0), 2500));

        this.handleRoomObjectEvent(
            new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.ROOM_LINK, this.object),
        );
    }

    private setAutomaticStateIndex(state: number): void {
        if (!this.object) return;

        this.object.model.setValue<number>(RoomObjectVariableEnum.FurnitureAutomaticStateIndex, state);
    }
}
