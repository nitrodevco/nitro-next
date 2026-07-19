import { type IAssetData, IRoomGeometry, IRoomSpriteMouseEvent, MouseEventType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-shared';

import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureEditableInternalLinkLogic extends FurnitureLogic {
    private _showStateOnceRendered: boolean = false;
    private _updateCount: number = 0;

    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [RoomObjectWidgetRequestEvent.INERNAL_LINK]);
    }

    public override initialize(asset: IAssetData | undefined): void {
        super.initialize(asset);

        if (asset?.logic?.action && asset.logic.action.startState === 1) this._showStateOnceRendered = true;
    }

    public override update(time: number): void {
        super.update(time);

        if (!this._showStateOnceRendered) return;

        this._updateCount++;

        if (this._showStateOnceRendered && this._updateCount > 20) {
            this.setAutomaticStateIndex(1);

            this._showStateOnceRendered = false;
        }
    }

    public override mouseEvent(event: IRoomSpriteMouseEvent, geometry: IRoomGeometry | undefined): void {
        if (!event || !geometry) return;

        if (event.type === MouseEventType.DOUBLE_CLICK) {
            this.setAutomaticStateIndex(0);
        }

        super.mouseEvent(event, geometry);
    }

    public override useObject(): void {
        this.handleRoomObjectEvent(
            new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.INERNAL_LINK, this.object),
        );
    }

    private setAutomaticStateIndex(state: number): void {
        if (!this.object) return;

        if (this.object.model) {
            this.object.model.setValue<number>(RoomObjectVariableEnum.FurnitureAutomaticStateIndex, state);
        }
    }
}
