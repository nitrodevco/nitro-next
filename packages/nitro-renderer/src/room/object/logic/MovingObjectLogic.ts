import { IRoomObjectController, IRoomObjectModel, IRoomObjectUpdateMessage, IVariableFxStatusModelEntry, IVector3D, RoomObjectMoveEvent, RoomObjectVariableEnum, Vector3d } from '@nitrodevco/nitro-api';

import { GetTickerTime } from '#renderer/utils';

import { ObjectMoveUpdateMessage, RoomObjectVariableFxStatusRemoveMessage, RoomObjectVariableFxStatusUpdateMessage } from '../../messages';
import { VariableFxStatusModelData, VariableFxStatusModelEntry } from '../variablefx/VariableFxStatusModelData';
import { RoomObjectLogicBase } from './RoomObjectLogicBase';
import { VariableFxLogicConfig } from './variablefx/VariableFxLogicConfig';
import { VariableFxLogicConfigManager } from './variablefx/VariableFxLogicConfigManager';
import { VariableFxLogicStatus } from './variablefx/VariableFxLogicStatus';

/** Which kind of value change opens a `showMode` 1 config's visibility window (matched against `showTriggerMask`). */
const VARIABLE_FX_CHANGE_UP = 2;
const VARIABLE_FX_CHANGE_DOWN = 4;
const VARIABLE_FX_CHANGE_SAME = 8;

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

    private _variableFxLogicManager: VariableFxLogicConfigManager | undefined = undefined;
    private _variableFxStatuses: Map<number, Map<string, VariableFxLogicStatus>> | undefined = undefined;
    private _variableFxStatusUpdateId: number = 0;
    private _variableFxPublicationId: number = 0;
    private _variableFxManagerUpdateId: number = -1;
    private _variableFxNextExpiry: number = 0;
    private _variableFxDirty: boolean = false;
    private _variableFxHovered: boolean = false;
    private _variableFxPublished: VariableFxStatusModelData | undefined = undefined;

    public override getEventTypes(): string[] {
        return this.mergeTypes(super.getEventTypes(), [
            RoomObjectMoveEvent.SLIDE_ANIMATION,
        ]);
    }

    public override dispose(): void {
        this.clearPublishedVariableFxStatusData();

        if (this._variableFxPublished) {
            this._variableFxPublished.dispose();
            this._variableFxPublished = undefined;
        }

        this.clearVariableFxStatuses();

        this._variableFxStatuses = undefined;
        this._variableFxLogicManager = undefined;
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

        this.updateVariableFxPublication(time, this.object?.model);

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

        if (this.processVariableFxStatusMessage(message)) return;

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

    /** The room's Variable FX config table for this object's kind (users or furniture); set by the room on creation. */
    public get variableFxLogicManager(): VariableFxLogicConfigManager | undefined {
        return this._variableFxLogicManager;
    }

    public set variableFxLogicManager(manager: VariableFxLogicConfigManager | undefined) {
        this._variableFxLogicManager = manager;
    }

    /** Handles the Variable FX status messages; returns true when `message` was one of them. */
    protected processVariableFxStatusMessage(message: IRoomObjectUpdateMessage): boolean {
        if (message instanceof RoomObjectVariableFxStatusUpdateMessage) {
            const time = GetTickerTime();

            this.upsertVariableFxStatus(new VariableFxLogicStatus(message.configId, message.variableId, message.value, message.overrideMinValue, message.overrideMaxValue, message.extra, message.initialize, time), time);
            this.updateVariableFxPublication(time, this.object?.model);

            return true;
        }

        if (message instanceof RoomObjectVariableFxStatusRemoveMessage) {
            this.removeVariableFxStatus(message.configId, message.variableId);
            this.updateVariableFxPublication(GetTickerTime(), this.object?.model);

            return true;
        }

        return false;
    }

    /** Hover shows every status of a config with `showOnMouseHover`, regardless of its visibility window. */
    protected setVariableFxHolderHovered(hovered: boolean): void {
        if (this._variableFxHovered === hovered) return;

        this._variableFxHovered = hovered;
        this._variableFxDirty = true;
    }

    private upsertVariableFxStatus(status: VariableFxLogicStatus, time: number): void {
        if (!this._variableFxStatuses) this._variableFxStatuses = new Map();

        let statuses = this._variableFxStatuses.get(status.configId);
        let changeMask = 1;

        if (!statuses) {
            statuses = new Map();

            this._variableFxStatuses.set(status.configId, statuses);
        }

        const existing = statuses.get(status.variableId);

        if (existing) {
            changeMask = this.getVariableFxChangeMask(existing.value, status.value);
            status.createdAt = existing.createdAt;
            status.visibleUntil = existing.visibleUntil;

            existing.dispose();
        }

        statuses.set(status.variableId, status);

        status.updatedAt = time;
        status.updateId = ++this._variableFxStatusUpdateId;

        if (!status.isInitialize) this.updateVariableFxVisibilityWindow(status, changeMask, time);

        this._variableFxDirty = true;
    }

    private removeVariableFxStatus(configId: number, variableId: string): void {
        const statuses = this._variableFxStatuses?.get(configId);

        if (!statuses) return;

        const existing = statuses.get(variableId);

        if (existing) {
            statuses.delete(variableId);
            existing.dispose();

            this._variableFxDirty = true;
        }

        if (statuses.size === 0) this._variableFxStatuses?.delete(configId);
    }

    private clearVariableFxStatuses(): void {
        if (!this._variableFxStatuses) return;

        for (const statuses of this._variableFxStatuses.values()) {
            for (const status of statuses.values()) status.dispose();

            statuses.clear();
        }

        this._variableFxStatuses.clear();
        this._variableFxDirty = true;
    }

    private getVariableFxChangeMask(previousValue: number, nextValue: number): number {
        if (nextValue > previousValue) return VARIABLE_FX_CHANGE_UP;
        if (nextValue < previousValue) return VARIABLE_FX_CHANGE_DOWN;

        return VARIABLE_FX_CHANGE_SAME;
    }

    private updateVariableFxVisibilityWindow(status: VariableFxLogicStatus, changeMask: number, time: number): void {
        const config = this.getVariableFxConfig(status.configId);

        if (!config || config.showMode !== 1) return;

        if ((config.showTriggerMask & changeMask) !== 0) status.visibleUntil = time + config.showDuration;
    }

    private updateVariableFxPublication(time: number, model: IRoomObjectModel | undefined): void {
        if (!model) return;

        if ((!this._variableFxStatuses || this._variableFxStatuses.size === 0) && !this._variableFxPublished) {
            this._variableFxDirty = false;
            this._variableFxNextExpiry = 0;

            return;
        }

        const managerUpdateId = this._variableFxLogicManager?.updateId ?? -1;

        if (this._variableFxManagerUpdateId !== managerUpdateId) {
            this._variableFxManagerUpdateId = managerUpdateId;
            this._variableFxDirty = true;
        }

        if (!this._variableFxDirty && (this._variableFxNextExpiry <= 0 || time < this._variableFxNextExpiry)) return;

        this.publishVariableFxStatuses(time, model);
    }

    private publishVariableFxStatuses(time: number, model: IRoomObjectModel): void {
        const statusesByConfig = new Map<number, Map<string, IVariableFxStatusModelEntry>>();

        let nextExpiry = 0;

        if (this._variableFxStatuses) {
            for (const [ configId, statuses ] of this._variableFxStatuses) {
                const config = this.getVariableFxConfig(configId);

                if (!config) continue;

                for (const [ variableId, status ] of statuses) {
                    const visible = this.isVariableFxStatusVisible(status, config, time);

                    let entries = statusesByConfig.get(configId);

                    if (!entries) {
                        entries = new Map();

                        statusesByConfig.set(configId, entries);
                    }

                    entries.set(variableId, new VariableFxStatusModelEntry(status.configId, status.variableId, status.createdAt, status.updateId, status.value, status.overrideMinValue, status.overrideMaxValue, new Map(status.extra), status.isInitialize || !visible, !visible));

                    if (visible && config.showMode === 1 && (!this._variableFxHovered || !config.showOnMouseHover) && status.visibleUntil > time && (nextExpiry <= 0 || status.visibleUntil < nextExpiry)) {
                        nextExpiry = status.visibleUntil;
                    }
                }
            }
        }

        const data = statusesByConfig.size > 0 ? new VariableFxStatusModelData(++this._variableFxPublicationId, statusesByConfig) : undefined;

        if (!this._variableFxPublished && !data) {
            this._variableFxDirty = false;
            this._variableFxNextExpiry = nextExpiry;

            return;
        }

        const previous = this._variableFxPublished;

        this._variableFxPublished = data;

        model.setValue(RoomObjectVariableEnum.VariableFxStatuses, data);

        if (previous) previous.dispose();

        this._variableFxDirty = false;
        this._variableFxNextExpiry = nextExpiry;
    }

    private isVariableFxStatusVisible(status: VariableFxLogicStatus, config: VariableFxLogicConfig, time: number): boolean {
        if (config.showMode === 0) return true;
        if (config.showOnMouseHover && this._variableFxHovered) return true;

        return config.showMode === 1 && status.visibleUntil > time;
    }

    private getVariableFxConfig(configId: number): VariableFxLogicConfig | undefined {
        return this._variableFxLogicManager?.getConfig(configId);
    }

    private clearPublishedVariableFxStatusData(): void {
        if (this.object?.model && this._variableFxPublished) this.object.model.setValue(RoomObjectVariableEnum.VariableFxStatuses, undefined);
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
