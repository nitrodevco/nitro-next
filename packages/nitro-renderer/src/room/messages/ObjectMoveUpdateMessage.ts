import type { IVector3D } from '@nitrodevco/nitro-api';

import { RoomObjectUpdateMessage } from './RoomObjectUpdateMessage';

export class ObjectMoveUpdateMessage extends RoomObjectUpdateMessage {
    private _targetLocation: IVector3D | undefined;
    private _isSlide: boolean;
    private _animationTime: number;
    private _skipPositionUpdate: boolean;

    constructor(
        location: IVector3D | undefined,
        targetLocation: IVector3D | undefined,
        direction: IVector3D | undefined,
        isSlide: boolean = false,
        animationTime: number = NaN,
        skipPositionUpdate: boolean = false
    ) {
        super(location, direction);

        this._targetLocation = targetLocation;
        this._isSlide = isSlide;
        this._animationTime = animationTime;
        this._skipPositionUpdate = skipPositionUpdate;
    }

    public get targetLocation(): IVector3D | undefined {
        if (!this._targetLocation) return this.location;

        return this._targetLocation;
    }

    public get isSlide(): boolean {
        return this._isSlide;
    }

    public get animationTime(): number {
        return this._animationTime;
    }

    public get skipPositionUpdate(): boolean {
        return this._skipPositionUpdate;
    }
}
