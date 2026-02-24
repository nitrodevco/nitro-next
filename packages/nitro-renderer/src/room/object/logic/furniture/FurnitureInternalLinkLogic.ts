import type { IAssetData, IRoomGeometry, IRoomSpriteMouseEvent } from '@nitrodevco/nitro-api';
import { MouseEventType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-shared';

import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureInternalLinkLogic extends FurnitureLogic {
    private _showStateOnceRendered: boolean = false;
    private _updateCount: number = 0;

    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [RoomObjectWidgetRequestEvent.INERNAL_LINK]);
    }

    public override initialize(asset: IAssetData): void {
        super.initialize(asset);

        if (asset.logic && asset.logic.action) {
            this.object.model.setValue<string>(
                RoomObjectVariableEnum.FurnitureInternalLink,
                asset.logic.action.link ?? '',
            );

            if (asset.logic.action.startState === 1) this._showStateOnceRendered = true;
        }
    }

    public override update(time: number): void {
        super.update(time);

        if (!this._showStateOnceRendered) return;

        this._updateCount++;

        if (this._showStateOnceRendered && this._updateCount === 20) {
            this.setAutomaticStateIndex(1);

            this._showStateOnceRendered = false;
        }
    }

    public override mouseEvent(event: IRoomSpriteMouseEvent, geometry: IRoomGeometry): void {
        if (!event || !geometry) return;

        if (event.type === MouseEventType.DOUBLE_CLICK && this._showStateOnceRendered) {
            this.setAutomaticStateIndex(0);
        }

        super.mouseEvent(event, geometry);
    }

    public override useObject(): void {
        this.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.INERNAL_LINK, this.object));
    }

    private setAutomaticStateIndex(state: number): void {
        this.object.model.setValue<number>(RoomObjectVariableEnum.FurnitureAutomaticStateIndex, state);
    }
}
