import { IRoomObjectController, IRoomObjectUpdateMessage, IVector3D, RoomObjectMoveEvent, RoomObjectVariableEnum, Vector3d } from '@nitrodevco/nitro-api';

import { GetTickerTime } from '#renderer/utils';

import { ObjectMoveUpdateMessage } from '../../messages';
import { RoomObjectLogicBase } from './RoomObjectLogicBase';

export class MovingObjectLogic extends RoomObjectLogicBase {
    public static DEFAULT_UPDATE_INTERVAL: number = 500;
    private static TEMP_VECTOR: Vector3d = new Vector3d();

    private _liftAmount: number = 0;
    private _location: Vector3d = new Vector3d();
    private _locationDelta: Vector3d = new Vector3d();
    private _lastUpdateTime: number = 0;
    private _changeTime: number = 0;
    private _updateInterval: number = MovingObjectLogic.DEFAULT_UPDATE_INTERVAL;
    private _overshootTime: number = 0;
    private _curveStrength: number = 0;

    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [
            RoomObjectMoveEvent.SLIDE_ANIMATION,
        ]);
    }

    public override dispose(): void {
        this._liftAmount = 0;

        super.dispose();
    }

    public override update(time: number): void {
        super.update(time);

        const locationOffset = this.getLocationOffset();

        if (locationOffset) {
            if (this._liftAmount !== locationOffset.z) {
                this._liftAmount = locationOffset.z;

                this.object.model.setValue(RoomObjectVariableEnum.FurnitureLiftAmount, this._liftAmount);
            }
        } else if (this._liftAmount !== 0) {
            this._liftAmount = 0;

            this.object.model.setValue(RoomObjectVariableEnum.FurnitureLiftAmount, this._liftAmount);
        }

        if (this._locationDelta.length > 0 || locationOffset) {
            const vector = MovingObjectLogic.TEMP_VECTOR;

            let difference = this.time - this._changeTime;

            if (difference === this._updateInterval >> 1) difference++;

            if (difference > this._updateInterval) difference = this._updateInterval;

            if (this._locationDelta.length > 0) {
                vector.assign(this._locationDelta);
                vector.multiply(difference / this._updateInterval);
                vector.add(this._location);
            } else {
                vector.assign(this._location);
            }

            if (locationOffset) vector.add(locationOffset);

            if (!isNaN(this._curveStrength) && this._curveStrength !== 0) {
                vector.z += this.calculateCurveOffset(difference, this._updateInterval);
            }

            this.object.setLocation(vector);

            if (difference === this._updateInterval) {
                this._locationDelta.x = 0;
                this._locationDelta.y = 0;
                this._locationDelta.z = 0;
            }

            this.eventHandler.eventDispatcher.dispatchEvent(new RoomObjectMoveEvent(RoomObjectMoveEvent.SLIDE_ANIMATION, this.object));
        }

        this._lastUpdateTime = this.time;
    }

    public override processUpdateMessage(message: IRoomObjectUpdateMessage): void {
        if (!message) return;

        super.processUpdateMessage(message);

        if (message instanceof ObjectMoveUpdateMessage) {
            if (message.skipPositionUpdate) return;

            if (message.location) {
                this._location.assign(message.location);

                this._locationDelta.x = 0;
                this._locationDelta.y = 0;
                this._locationDelta.z = 0;

                if (message.targetLocation) {
                    this._updateInterval = Math.max(1, isNaN(message.animationTime) ? MovingObjectLogic.DEFAULT_UPDATE_INTERVAL : message.animationTime);

                    const overshootTime = message.overshootAnimationTime;
                    const curveStrength = this.getCurveStrength(message);

                    if (!isNaN(overshootTime) && overshootTime === 0) this._overshootTime = NaN;
                    else this._overshootTime = overshootTime;

                    if (!isNaN(curveStrength) && curveStrength === 0) this._curveStrength = NaN;
                    else this._curveStrength = curveStrength;

                    this._changeTime = this._lastUpdateTime > 0 ? this._lastUpdateTime : GetTickerTime();
                    this._locationDelta.assign(message.targetLocation);
                    this._locationDelta.subtract(this._location);

                    this.fixDeltaAndIntervalForOvershooting();
                }
            }

            return;
        }
    }

    public override setObject(object: IRoomObjectController): void {
        super.setObject(object);

        if (object) this._location.assign(object.getLocation());
    }

    protected getLocationOffset(): IVector3D | undefined {
        return undefined;
    }

    protected get lastUpdateTime(): number {
        return this._lastUpdateTime;
    }

    protected set updateInterval(interval: number) {
        if (interval <= 0) interval = 1;

        this._updateInterval = interval;
    }

    protected getCurveStrength(message: ObjectMoveUpdateMessage): number {
        return message.curveStrength;
    }

    protected setMoveUpdateInterval(animationTime: number, overshootTime: number = 0, curveStrength: number = 0): void {
        if (animationTime <= 0) animationTime = 1;

        this._updateInterval = animationTime;

        if (!isNaN(overshootTime) && overshootTime === 0) this._overshootTime = NaN;
        else this._overshootTime = overshootTime;

        if (!isNaN(curveStrength) && curveStrength === 0) this._curveStrength = NaN;
        else this._curveStrength = curveStrength;
    }

    protected fixDeltaAndIntervalForOvershooting(): void {
        if (!isNaN(this._overshootTime) && this._overshootTime !== 0 && this._updateInterval !== 0) {
            const prevZ = this._location.z;

            this._location.multiply((this._updateInterval + this._overshootTime) / this._updateInterval);
            this._location.z = prevZ;

            this._updateInterval += this._overshootTime;
        }
    }

    protected calculateCurveOffset(diff: number, time: number): number {
        if (isNaN(this._curveStrength) || this._curveStrength == 0) return 0;

        return 4 * (this._curveStrength / 100 * (this._location.length / 4) / (time * time)) * diff * (time - diff);
    }
}
