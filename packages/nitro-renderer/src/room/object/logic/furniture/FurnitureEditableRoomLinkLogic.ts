import { type IAssetData, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-shared';

import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureEditableRoomLinkLogic extends FurnitureLogic {
    private _timer: any;

    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [RoomObjectWidgetRequestEvent.ROOM_LINK]);
    }

    public override initialize(asset: IAssetData): void {
        super.initialize(asset);

        if (
            asset.logic &&
            asset.logic.action &&
            asset.logic.action.link &&
            asset.logic.action.link !== '' &&
            asset.logic.action.link.length > 0
        )
            this.object.model.setValue<string>(RoomObjectVariableEnum.FurnitureInternalLink, asset.logic.action.link);
    }

    public override dispose(): void {
        if (this._timer) {
            clearTimeout(this._timer);

            this._timer = null;
        }

        super.dispose();
    }

    public override useObject(): void {
        this.setAutomaticStateIndex(1);

        if (this._timer) {
            clearTimeout(this._timer);

            this._timer = null;
        }

        this._timer = setTimeout(() => {
            this.setAutomaticStateIndex(0);

            this._timer = null;
        }, 2500);

        this.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.ROOM_LINK, this.object));
    }

    private setAutomaticStateIndex(state: number): void {
        this.object.model.setValue<number>(RoomObjectVariableEnum.FurnitureAutomaticStateIndex, state);
    }
}
