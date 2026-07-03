import type { Matrix4x4 } from './Matrix4x4';
import { Vector3D } from './Vector3D';

export class Node3D {
    private _location: Vector3D;
    private _transformedLocation: Vector3D;
    private _needsTransformation: boolean;

    constructor(x: number, y: number, z: number) {
        this._location = new Vector3D(x, y, z);
        this._transformedLocation = new Vector3D();
        this._needsTransformation = false;

        if (x !== 0 || y !== 0 || z !== 0) this._needsTransformation = true;
    }

    public get location(): Vector3D {
        return this._location;
    }

    public get transformedLocation(): Vector3D {
        return this._transformedLocation;
    }

    public applyTransform(matrix: Matrix4x4): void {
        if (this._needsTransformation) this._transformedLocation = matrix.vectorMultiplication(this._location);
    }
}
