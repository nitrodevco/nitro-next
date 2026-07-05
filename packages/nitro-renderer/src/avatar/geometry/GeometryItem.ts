import type { AvatarFigurePartType, IAssetAvatarBodyPartItem } from '@nitrodevco/nitro-api';

import { Node3D } from './Node3D';
import { Vector3D } from './Vector3D';

export class GeometryItem extends Node3D {
    private _id: AvatarFigurePartType;
    private _radius: number;
    private _normal: Vector3D;
    private _isDoubleSided: boolean;
    private _isDynamic: boolean;

    constructor(item: IAssetAvatarBodyPartItem, dynamic: boolean = false) {
        super(item.x ?? 0, item.y ?? 0, item.z ?? 0);

        this._id = item.id;
        this._radius = item.radius ?? 0;
        this._normal = new Vector3D(item.nx ?? 0, item.ny ?? 0, item.nz ?? 0);
        this._isDoubleSided = item.double ?? false;
        this._isDynamic = dynamic;
    }

    public getDistance(loc: Vector3D): number {
        const x = Math.abs(((loc.z - this.transformedLocation.z) - this._radius));
        const y = Math.abs(((loc.z - this.transformedLocation.z) + this._radius));

        return Math.min(x, y);
    }

    public get id(): AvatarFigurePartType {
        return this._id;
    }

    public get normal(): Vector3D {
        return this._normal;
    }

    public get isDoubleSided(): boolean {
        return this._isDoubleSided;
    }

    public get isDynamic(): boolean {
        return this._isDynamic;
    }

    public override toString(): string {
        return `${this._id}: ${this.location.toString()} - ${this.transformedLocation.toString()}`;
    }
}
