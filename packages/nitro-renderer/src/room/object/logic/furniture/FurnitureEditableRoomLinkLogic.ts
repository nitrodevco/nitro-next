import { type IAssetData, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-shared';

import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureEditableRoomLinkLogic extends FurnitureLogic {
    private _timer: ReturnType<typeof setTimeout> | undefined = undefined;

    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [RoomObjectWidgetRequestEvent.ROOM_LINK]);
    }

    public override initialize(asset: IAssetData | undefined): void {
        super.initialize(asset);

        if (asset?.logic?.action?.link) this.object.model.setValue<string>(RoomObjectVariableEnum.FurnitureInternalLink, asset.logic.action.link ?? '');
    }

    public override dispose(): void {
        if (this._timer) {
            clearTimeout(this._timer);

            this._timer = undefined;
        }

        super.dispose();
    }

    public override useObject(): void {
        this.setAutomaticStateIndex(1);

        if (this._timer) {
            clearTimeout(this._timer);

            this._timer = undefined;
        }

        this._timer = setTimeout(() => {
            this.setAutomaticStateIndex(0);

            this._timer = undefined;
        }, 2500);

        this.handleRoomObjectEvent(
            new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.ROOM_LINK, this.object),
        );
    }

    private setAutomaticStateIndex(state: number): void {
        this.object.model.setValue<number>(RoomObjectVariableEnum.FurnitureAutomaticStateIndex, state);
    }
}
