import { type IVector3D, Vector3d } from '@nitrodevco/nitro-api';

import { RoomPlaneMaskData } from './RoomPlaneMaskData';

export class RoomPlaneData {
    public static PLANE_UNDEFINED: number = 0;
    public static PLANE_FLOOR: number = 1;
    public static PLANE_WALL: number = 2;
    public static PLANE_LANDSCAPE: number = 3;
    public static PLANE_BILLBOARD: number = 4;

    private _type: number = 0;
    private _loc: Vector3d = new Vector3d();
    private _leftSide: Vector3d = new Vector3d();
    private _rightSide: Vector3d = new Vector3d();
    private _normal: Vector3d = new Vector3d();
    private _normalDirection: Vector3d = new Vector3d();
    private _secondaryNormals: Vector3d[] = [];
    private _masks: RoomPlaneMaskData[] = [];

    constructor(type: number, loc: IVector3D, leftSideLoc: IVector3D, rightSideLoc: IVector3D, _arg_5: IVector3D[]) {
        this._type = type;
        this._loc.assign(loc);
        this._leftSide.assign(leftSideLoc);
        this._rightSide.assign(rightSideLoc);

        if (leftSideLoc && rightSideLoc) {
            this._normal = Vector3d.crossProduct(leftSideLoc, rightSideLoc);
            let normalX = 0;
            let normalY = 0;

            if (this.normal.x > 0 || this.normal.y > 0) {
                let x = this.normal.x;
                let y = this.normal.y;

                normalX = 360 + (Math.atan2(y, x) / Math.PI) * 180;

                if (normalX >= 360) normalX = normalX - 360;

                x = Math.sqrt(this.normal.x * this.normal.x + this.normal.y * this.normal.y);
                y = this.normal.z;

                normalY = 360 + (Math.atan2(y, x) / Math.PI) * 180;

                if (normalY >= 360) normalY = normalY - 360;
            } else if (this.normal.z < 0) {
                normalY = 90;
            } else {
                normalY = 270;
            }

            this._normalDirection = new Vector3d(normalX, normalY, 0);
        }

        if (!(_arg_5 == null) && _arg_5.length > 0) {
            let i = 0;

            while (i < _arg_5.length) {
                const _local_12 = _arg_5[i];

                if (_local_12 && _local_12.length > 0) {
                    const normal = new Vector3d();

                    normal.assign(_local_12);
                    normal.multiply(1 / normal.length);

                    this._secondaryNormals.push(normal);
                }

                i++;
            }
        }
    }

    public get type(): number {
        return this._type;
    }

    public get loc(): IVector3D {
        return this._loc;
    }

    public get leftSide(): IVector3D {
        return this._leftSide;
    }

    public get rightSide(): IVector3D {
        return this._rightSide;
    }

    public get normal(): IVector3D {
        return this._normal;
    }

    public get normalDirection(): IVector3D {
        return this._normalDirection;
    }

    public get secondaryNormalCount(): number {
        return this._secondaryNormals.length;
    }

    public get maskCount(): number {
        return this._masks.length;
    }

    public getSecondaryNormal(index: number): IVector3D {
        const loc = new Vector3d();

        if (index >= 0 && index < this.secondaryNormalCount) loc.assign(this._secondaryNormals[index]);

        return loc;
    }

    public addMask(leftSideLoc: number, rightSideLoc: number, leftSideLength: number, rightSideLength: number): void {
        this._masks.push(new RoomPlaneMaskData(leftSideLoc, rightSideLoc, leftSideLength, rightSideLength));
    }

    private getMask(k: number) {
        if (k < 0 || k >= this.maskCount) return undefined;

        return this._masks[k];
    }

    public getMaskLeftSideLoc(k: number) {
        return this.getMask(k)?.leftSideLoc ?? -1;
    }

    public getMaskRightSideLoc(k: number) {
        return this.getMask(k)?.rightSideLoc ?? -1;
    }

    public getMaskLeftSideLength(k: number): number {
        return this.getMask(k)?.leftSideLength ?? -1;
    }

    public getMaskRightSideLength(k: number): number {
        return this.getMask(k)?.rightSideLength ?? -1;
    }
}
