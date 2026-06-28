import type { IVector3D } from '@nitrodevco/nitro-api';

import { ObjectMoveUpdateMessage } from './ObjectMoveUpdateMessage';

export class ObjectAvatarUpdateMessage extends ObjectMoveUpdateMessage {
    private _headDirection: number;
    private _canStandUp: boolean;
    private _baseY: number;

    constructor(
        location: IVector3D | undefined,
        targetLocation: IVector3D | undefined,
        direction: IVector3D | undefined,
        headDirection: number,
        canStandUp: boolean,
        baseY: number,
        isSlide: boolean = false,
        animationTime: number = NaN,
        skipPositionUpdate: boolean = false
    ) {
        super(location, targetLocation, direction, isSlide, animationTime, skipPositionUpdate);

        this._headDirection = headDirection;
        this._canStandUp = canStandUp;
        this._baseY = baseY;
    }

    public get headDirection(): number {
        return this._headDirection;
    }

    public get canStandUp(): boolean {
        return this._canStandUp;
    }

    public get baseY(): number {
        return this._baseY;
    }
}
