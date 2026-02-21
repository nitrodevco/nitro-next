import type { IRoomObjectUpdateMessage, IVector3D } from '@nitrodevco/nitro-api';
import { RoomObjectVariable, Vector3d } from '@nitrodevco/nitro-api';
import { RoomObjectFloorHoleEvent } from '@nitrodevco/nitro-events';

import { ObjectDataUpdateMessage } from '../../../messages';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureFloorHoleLogic extends FurnitureMultiStateLogic {
    private static STATE_HOLE: number = 0;

    private _currentState: number = -1;
    private _currentLocation: IVector3D = new Vector3d();

    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [
            RoomObjectFloorHoleEvent.ADD_HOLE,
            RoomObjectFloorHoleEvent.REMOVE_HOLE,
        ]);
    }

    public override dispose(): void {
        if (this._currentState === FurnitureFloorHoleLogic.STATE_HOLE)
            this.dispatchEvent(new RoomObjectFloorHoleEvent(RoomObjectFloorHoleEvent.REMOVE_HOLE, this.object));

        super.dispose();
    }

    public override update(time: number): void {
        super.update(time);

        this.handleAutomaticStateUpdate();
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        super.processUpdateMessage(message);

        if (message instanceof ObjectDataUpdateMessage) {
            this.handleStateUpdate(this.object.getState(0));
        }

        const location = this.object.getLocation();

        if (location.x !== this._currentLocation.x || location.y !== this._currentLocation.y) {
            if (this._currentState === FurnitureFloorHoleLogic.STATE_HOLE)
                this.dispatchEvent(new RoomObjectFloorHoleEvent(RoomObjectFloorHoleEvent.ADD_HOLE, this.object));
        }

        this._currentLocation.assign(location);
    }

    private handleStateUpdate(state: number): void {
        if (state === this._currentState) return;

        if (state === FurnitureFloorHoleLogic.STATE_HOLE) {
            this.dispatchEvent(new RoomObjectFloorHoleEvent(RoomObjectFloorHoleEvent.ADD_HOLE, this.object));
        } else if (this._currentState === FurnitureFloorHoleLogic.STATE_HOLE) {
            this.dispatchEvent(new RoomObjectFloorHoleEvent(RoomObjectFloorHoleEvent.REMOVE_HOLE, this.object));
        }

        this._currentState = state;
    }

    private handleAutomaticStateUpdate(): void {
        const stateIndex = this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_AUTOMATIC_STATE_INDEX);

        if (!isNaN(stateIndex)) this.handleStateUpdate(stateIndex % 2);
    }
}
