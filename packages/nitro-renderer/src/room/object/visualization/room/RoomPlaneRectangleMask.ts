export class RoomPlaneRectangleMask {
    private _leftSideLoc: number;
    private _rightSideLoc: number;
    private _leftSideLength: number;
    private _rightSideLength: number;

    constructor(leftLoc: number, rightLoc: number, leftLength: number, rightLength: number) {
        this._leftSideLoc = leftLoc;
        this._rightSideLoc = rightLoc;
        this._leftSideLength = leftLength;
        this._rightSideLength = rightLength;
    }

    public get leftSideLoc(): number {
        return this._leftSideLoc;
    }

    public get rightSideLoc(): number {
        return this._rightSideLoc;
    }

    public get leftSideLength(): number {
        return this._leftSideLength;
    }

    public get rightSideLength(): number {
        return this._rightSideLength;
    }
}
