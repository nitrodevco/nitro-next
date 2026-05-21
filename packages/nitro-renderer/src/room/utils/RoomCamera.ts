import type { IRoomCamera, IVector3D } from '@nitrodevco/nitro-api';
import { Vector3d } from '@nitrodevco/nitro-api';

export class RoomCamera implements IRoomCamera {
    private static MOVE_SPEED_DENOMINATOR: number = 12;

    private _targetId: number = -1;
    private _targetCategory: number = -2;
    private _targetLoc: IVector3D = new Vector3d();
    private _moveDistance: number = 0;
    private _previousMoveSpeed: number = 0;
    private _maintainPreviousMoveSpeed: boolean = false;
    private _currentLoc: IVector3D | undefined = undefined;
    private _targetObjectLoc: IVector3D = new Vector3d();
    private _limitedLocX: boolean = false;
    private _limitedLocY: boolean = false;
    private _centeredLocX: boolean = false;
    private _centeredLocY: boolean = false;
    private _screenWd: number = 0;
    private _screenHt: number = 0;
    private _scale: number = 0;
    private _roomWd: number = 0;
    private _roomHt: number = 0;
    private _geometryUpdateId: number = -1;
    private _scaleChanged: boolean = false;
    private _isMoving: boolean = false;

    public get currentLoc(): IVector3D | undefined {
        return this._currentLoc;
    }

    public get targetId(): number {
        return this._targetId;
    }

    public set targetId(k: number) {
        this._targetId = k;
    }

    public get targetCategory(): number {
        return this._targetCategory;
    }

    public set targetCategory(k: number) {
        this._targetCategory = k;
    }

    public get targetObjectLoc(): IVector3D {
        return this._targetObjectLoc;
    }

    public set targetObjectLoc(k: IVector3D) {
        this._targetObjectLoc.assign(k);
    }

    public get limitedLocationX(): boolean {
        return this._limitedLocX;
    }

    public set limitedLocationX(k: boolean) {
        this._limitedLocX = k;
    }

    public get limitedLocationY(): boolean {
        return this._limitedLocY;
    }

    public set limitedLocationY(k: boolean) {
        this._limitedLocY = k;
    }

    public get centeredLocX(): boolean {
        return this._centeredLocX;
    }

    public set centeredLocX(k: boolean) {
        this._centeredLocX = k;
    }

    public get centeredLocY(): boolean {
        return this._centeredLocY;
    }

    public set centeredLocY(k: boolean) {
        this._centeredLocY = k;
    }

    public get screenWd(): number {
        return this._screenWd;
    }

    public set screenWd(k: number) {
        this._screenWd = k;
    }

    public get screenHt(): number {
        return this._screenHt;
    }

    public set screenHt(k: number) {
        this._screenHt = k;
    }

    public get scale(): number {
        return this._scale;
    }

    public set scale(k: number) {
        if (this._scale !== k) {
            this._scale = k;
            this._scaleChanged = true;
        }
    }

    public get roomWd(): number {
        return this._roomWd;
    }

    public set roomWd(k: number) {
        this._roomWd = k;
    }

    public get roomHt(): number {
        return this._roomHt;
    }

    public set roomHt(k: number) {
        this._roomHt = k;
    }

    public get geometryUpdateId(): number {
        return this._geometryUpdateId;
    }

    public set geometryUpdateId(k: number) {
        this._geometryUpdateId = k;
    }

    public get isMoving(): boolean {
        return this._isMoving;
    }

    public setTarget(k: IVector3D): void {
        this._targetLoc.assign(k);
        const diff = Vector3d.dif(this._targetLoc, this._currentLoc ?? new Vector3d());
        this._moveDistance = diff.length;
        this._maintainPreviousMoveSpeed = true;
        this._isMoving = true;
    }

    public initializeLocation(k: IVector3D): void {
        if (this._currentLoc) return;

        this._currentLoc = new Vector3d();

        this._currentLoc.assign(k);
    }

    public resetLocation(k: IVector3D): void {
        if (!this._currentLoc) this._currentLoc = new Vector3d();

        this._currentLoc.assign(k);
    }

    public update(k: number, threshold: number): void {
        if (!this._isMoving) return;

        if (this._scaleChanged) {
            this._scaleChanged = false;
            this._currentLoc = this._targetLoc;
            this._targetLoc = new Vector3d();
            this._isMoving = false;
            return;
        }

        if (!this._currentLoc) return;

        const diff = Vector3d.dif(this._targetLoc, this._currentLoc);

        if (diff.length > this._moveDistance) this._moveDistance = diff.length;

        if (diff.length <= threshold) {
            this._currentLoc = this._targetLoc;
            this._targetLoc = new Vector3d();
            this._previousMoveSpeed = 0;
            this._isMoving = false;
        } else {
            const sinFactor = Math.sin((Math.PI * diff.length) / this._moveDistance);
            const minSpeed = threshold * 0.5;
            const maxSpeed = this._moveDistance / RoomCamera.MOVE_SPEED_DENOMINATOR;
            let speed = minSpeed + (maxSpeed - minSpeed) * sinFactor;

            if (this._maintainPreviousMoveSpeed) {
                if (speed < this._previousMoveSpeed) {
                    speed = Math.min(this._previousMoveSpeed, diff.length);
                } else {
                    this._maintainPreviousMoveSpeed = false;
                }
            }

            this._previousMoveSpeed = speed;
            diff.divide(diff.length);
            diff.multiply(speed);
            this._currentLoc = Vector3d.sum(this._currentLoc, diff);
        }
    }

    public reset(): void {
        this._geometryUpdateId = -1;
    }

    public activateFollowing(_k: number): void {}
}
