import { type IRoomGeometry, type IVector3D, RoomGeometryScaleType, Vector3d } from '@nitrodevco/nitro-api';
import { Point } from 'pixi.js';

export class RoomGeometry implements IRoomGeometry {
    private _updateId: number = 0;
    private _x: IVector3D = new Vector3d();
    private _y: IVector3D = new Vector3d();
    private _z: IVector3D = new Vector3d();
    private _directionAxis: IVector3D = new Vector3d();
    private _location: IVector3D = new Vector3d();
    private _direction: IVector3D = new Vector3d();
    private _depth: IVector3D = new Vector3d();
    private _scale: number = 1;
    private _xScale: number = 1;
    private _yScale: number = 1;
    private _zScale: number = 1;
    private _xScaleInternal: number = 1;
    private _yScaleInternal: number = 1;
    private _zScaleInternal: number = Math.sqrt(1 / 2) / Math.sqrt(3 / 4);
    private _loc: IVector3D;
    private _dir: IVector3D;
    private _clipNear: number = -500;
    private _clipFar: number = 500;
    private _displacements: Map<string, IVector3D> = new Map();

    constructor(scale: RoomGeometryScaleType, direction: IVector3D, location: IVector3D, depth: IVector3D | undefined = undefined) {
        this.scale = scale;

        this.location.assign(location);

        this.setLocation(new Vector3d(location.x, location.y, location.z));
        this.direction = new Vector3d(direction.x, direction.y, direction.z);

        this.setDepthVector(depth ?? direction);
    }

    public static getIntersectionVector(
        rayOrigin: IVector3D,
        rayDirection: IVector3D,
        planePoint: IVector3D,
        planeNormal: IVector3D,
    ): IVector3D {
        return Vector3d.sum(
            rayOrigin,
            Vector3d.product(
                rayDirection,
                -Vector3d.dotProduct(planeNormal, Vector3d.dif(rayOrigin, planePoint)) / Vector3d.dotProduct(rayDirection, planeNormal),
            ),
        );
    }

    public dispose(): void { }

    public setDisplacement(location: IVector3D, displacement: IVector3D): void {
        if (!location || !displacement) return;

        const key = Math.trunc(Math.round(location.x)) + '_' + Math.trunc(Math.round(location.y)) + '_' + Math.trunc(Math.round(location.z));

        this._displacements.delete(key);

        this._displacements.set(key, Vector3d.from(displacement));
        this._updateId++;
    }

    public setDepthVector(rotation: IVector3D): void {
        const upAxis = new Vector3d(0, 1, 0);
        const zAxis = new Vector3d(0, 0, 1);
        const xAxis = new Vector3d(1, 0, 0);

        const rotXRad = (rotation.x / 180) * Math.PI;
        const rotYRad = (rotation.y / 180) * Math.PI;
        const rotZRad = (rotation.z / 180) * Math.PI;

        const cosX = Math.cos(rotXRad);
        const sinX = Math.sin(rotXRad);

        const rotatedYAfterX = Vector3d.sum(
            Vector3d.product(upAxis, cosX),
            Vector3d.product(xAxis, -sinX),
        );
        const rotatedZAfterX = new Vector3d(zAxis.x, zAxis.y, zAxis.z);
        const rotatedXAfterX = Vector3d.sum(
            Vector3d.product(upAxis, sinX),
            Vector3d.product(xAxis, cosX),
        );

        const cosY: number = Math.cos(rotYRad);
        const sinY: number = Math.sin(rotYRad);

        const rotatedXAfterY = new Vector3d(rotatedYAfterX.x, rotatedYAfterX.y, rotatedYAfterX.z);
        const rotatedYAfterY = Vector3d.sum(
            Vector3d.product(rotatedZAfterX, cosY),
            Vector3d.product(rotatedXAfterX, sinY),
        );
        const rotatedZAfterY = Vector3d.sum(
            Vector3d.product(rotatedZAfterX, -sinY),
            Vector3d.product(rotatedXAfterX, cosY),
        );

        if (rotZRad !== 0) {
            const cosZ = Math.cos(rotZRad);
            const sinZ = Math.sin(rotZRad);

            const _finalX = Vector3d.sum(Vector3d.product(rotatedXAfterY, cosZ), Vector3d.product(rotatedYAfterY, sinZ));
            const _finalY = Vector3d.sum(Vector3d.product(rotatedXAfterY, -sinZ), Vector3d.product(rotatedYAfterY, cosZ));
            const finalZ = new Vector3d(rotatedZAfterY.x, rotatedZAfterY.y, rotatedZAfterY.z);

            this._depth.assign(finalZ);
        } else {
            this._depth.assign(rotatedZAfterY);
        }

        this._updateId++;
    }

    public adjustLocation(location: IVector3D, distance: number): void {
        if (!location || !this._z) return;

        const zOffset = Vector3d.product(this._z, -distance);
        const adjustedLocation = new Vector3d(location.x + zOffset.x, location.y + zOffset.y, location.z + zOffset.z);

        this.setLocation(adjustedLocation);
    }

    public getCoordinatePosition(worldPos: IVector3D): IVector3D {
        let x = -1;
        let y = -1;
        let z = -1;

        if (worldPos) {
            x = Vector3d.scalarProjection(worldPos, this._x);
            y = Vector3d.scalarProjection(worldPos, this._y);
            z = Vector3d.scalarProjection(worldPos, this._z);
        }

        return new Vector3d(x, y, z);
    }

    public getScreenPosition(worldPos: IVector3D): IVector3D {
        if (!worldPos) worldPos = new Vector3d();

        let relativePos: IVector3D = Vector3d.dif(worldPos, this._loc);

        relativePos.x = relativePos.x * this._xScale;
        relativePos.y = relativePos.y * this._yScale;
        relativePos.z = relativePos.z * this._zScale;

        let depthDist: number = Vector3d.scalarProjection(relativePos, this._depth);

        if (depthDist < this._clipNear || depthDist > this._clipFar) return new Vector3d();

        let screenX: number = Vector3d.scalarProjection(relativePos, this._x);
        let screenY: number = -Vector3d.scalarProjection(relativePos, this._y);

        screenX = screenX * this._scale;
        screenY = screenY * this._scale;

        const displacement = this.getDisplacenent(worldPos);

        if (displacement) {
            relativePos = Vector3d.dif(worldPos, this._loc);
            relativePos.add(displacement);
            relativePos.x = relativePos.x * this._xScale;
            relativePos.y = relativePos.y * this._yScale;
            relativePos.z = relativePos.z * this._zScale;
            depthDist = Vector3d.scalarProjection(relativePos, this._depth);
        }

        relativePos.x = screenX;
        relativePos.y = screenY;
        relativePos.z = depthDist;

        return relativePos;
    }

    public getScreenPoint(location: IVector3D): Point {
        const pos = this.getScreenPosition(location);

        return new Point(pos.x, pos.y);
    }

    public getPlanePosition(screenPoint: Point, planeOrigin: IVector3D, planeAxis1: IVector3D, planeAxis2: IVector3D): Point {
        const screenX = screenPoint.x / this._scale;
        const screenY = -screenPoint.y / this._scale;

        const xComponent = Vector3d.product(this._x, screenX);
        xComponent.add(Vector3d.product(this._y, screenY));

        const cameraPos = new Vector3d(
            this._loc.x * this._xScale,
            this._loc.y * this._yScale,
            this._loc.z * this._zScale,
        );
        cameraPos.add(xComponent);

        const rayDirection = this._z;

        const planeOriginScaled = new Vector3d(
            planeOrigin.x * this._xScale,
            planeOrigin.y * this._yScale,
            planeOrigin.z * this._zScale,
        );
        const planeAxis1Scaled = new Vector3d(
            planeAxis1.x * this._xScale,
            planeAxis1.y * this._yScale,
            planeAxis1.z * this._zScale,
        );
        const planeAxis2Scaled = new Vector3d(
            planeAxis2.x * this._xScale,
            planeAxis2.y * this._yScale,
            planeAxis2.z * this._zScale,
        );

        const planeNormal = Vector3d.crossProduct(planeAxis1Scaled, planeAxis2Scaled);
        const intersectionPoint = Vector3d.from(RoomGeometry.getIntersectionVector(cameraPos, rayDirection, planeOriginScaled, planeNormal));

        intersectionPoint.subtract(planeOriginScaled);

        const axis1Distance = (Vector3d.scalarProjection(intersectionPoint, planeAxis1) / planeAxis1Scaled.length) * planeAxis1.length;
        const axis2Distance = (Vector3d.scalarProjection(intersectionPoint, planeAxis2) / planeAxis2Scaled.length) * planeAxis2.length;

        return new Point(axis1Distance, axis2Distance);
    }

    public setLocation(location: IVector3D): void {
        if (!location) return;

        if (!this._loc) this._loc = new Vector3d();

        const prevX: number = this._loc.x;
        const prevY: number = this._loc.y;
        const prevZ: number = this._loc.z;

        this._loc.assign(location);

        this._loc.x = this._loc.x / this._xScale;
        this._loc.y = this._loc.y / this._yScale;
        this._loc.z = this._loc.z / this._zScale;

        if ((this._loc.x !== prevX) || (this._loc.y !== prevY) || (this._loc.z !== prevZ)) this._updateId++;
    }

    public performZoom(): void {
        if (this.isZoomedIn()) {
            this.scale = RoomGeometryScaleType.ZoomedOut;
        } else {
            this.scale = RoomGeometryScaleType.ZoomedIn;
        }
    }

    public performZoomOut(): void {
        this.scale = RoomGeometryScaleType.ZoomedOut;
    }

    public performZoomIn(): void {
        this.scale = RoomGeometryScaleType.ZoomedIn;
    }

    public isZoomedIn(): boolean {
        return this.scale == RoomGeometryScaleType.ZoomedIn;
    }

    public increaseUpdateId(): void {
        this._updateId++;
    }

    public get updateId(): number {
        return this._updateId;
    }

    public get scale(): RoomGeometryScaleType {
        return this._scale / Math.sqrt(0.5);
    }

    public set scale(scale: RoomGeometryScaleType) {
        if (scale <= RoomGeometryScaleType.Icon) scale = RoomGeometryScaleType.Icon;

        scale = scale * Math.sqrt(0.5);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
        if (scale !== this._scale) {
            this._scale = scale;
            this._updateId++;
        }
    }

    public get location(): IVector3D {
        this._location.assign(this._loc);
        this._location.x = this._location.x * this._xScale;
        this._location.y = this._location.y * this._yScale;
        this._location.z = this._location.z * this._zScale;
        return this._location;
    }

    public set location(location: IVector3D) {
        if (!location) return;

        if (!this._loc) this._loc = new Vector3d();

        const prevX: number = this._loc.x;
        const prevY: number = this._loc.y;
        const prevZ: number = this._loc.z;

        this._loc.assign(location);

        this._loc.x = this._loc.x / this._xScale;
        this._loc.y = this._loc.y / this._yScale;
        this._loc.z = this._loc.z / this._zScale;

        if (this._loc.x !== prevX || this._loc.y !== prevY || this._loc.z !== prevZ) this._updateId++;
    }

    public get direction(): IVector3D {
        return this._direction;
    }

    public set direction(direction: IVector3D) {
        if (!direction) return;

        if (!this._dir) this._dir = new Vector3d();

        const prevX: number = this._dir.x;
        const prevY: number = this._dir.y;
        const prevZ: number = this._dir.z;

        this._dir.assign(direction);
        this._direction.assign(direction);

        if (this._dir.x !== prevX || this._dir.y !== prevY || this._dir.z !== prevZ) this._updateId++;

        const upAxis = new Vector3d(0, 1, 0);
        const zAxis = new Vector3d(0, 0, 1);
        const xAxis = new Vector3d(1, 0, 0);

        const rotXRad = (direction.x / 180) * Math.PI;
        const rotYRad = (direction.y / 180) * Math.PI;
        const rotZRad = (direction.z / 180) * Math.PI;

        const cosX = Math.cos(rotXRad);
        const sinX = Math.sin(rotXRad);

        const rotatedYAfterX = Vector3d.sum(
            Vector3d.product(upAxis, cosX),
            Vector3d.product(xAxis, -sinX),
        );
        const rotatedZAfterX = new Vector3d(zAxis.x, zAxis.y, zAxis.z);
        const rotatedXAfterX = Vector3d.sum(
            Vector3d.product(upAxis, sinX),
            Vector3d.product(xAxis, cosX),
        );

        const cosY = Math.cos(rotYRad);
        const sinY = Math.sin(rotYRad);

        const rotatedXAfterY = new Vector3d(rotatedYAfterX.x, rotatedYAfterX.y, rotatedYAfterX.z);
        const rotatedYAfterY = Vector3d.sum(
            Vector3d.product(rotatedZAfterX, cosY),
            Vector3d.product(rotatedXAfterX, sinY),
        );
        const rotatedZAfterY = Vector3d.sum(
            Vector3d.product(rotatedZAfterX, -sinY),
            Vector3d.product(rotatedXAfterX, cosY),
        );

        if (rotZRad !== 0) {
            const cosZ = Math.cos(rotZRad);
            const sinZ = Math.sin(rotZRad);

            const finalX = Vector3d.sum(
                Vector3d.product(rotatedXAfterY, cosZ),
                Vector3d.product(rotatedYAfterY, sinZ),
            );
            const finalY = Vector3d.sum(
                Vector3d.product(rotatedXAfterY, -sinZ),
                Vector3d.product(rotatedYAfterY, cosZ),
            );
            const finalZ = new Vector3d(rotatedZAfterY.x, rotatedZAfterY.y, rotatedZAfterY.z);

            this._x.assign(finalX);
            this._y.assign(finalY);
            this._z.assign(finalZ);
            this._directionAxis.assign(this._z);
        } else {
            this._x.assign(rotatedXAfterY);
            this._y.assign(rotatedYAfterY);
            this._z.assign(rotatedZAfterY);
            this._directionAxis.assign(this._z);
        }
    }

    public get directionAxis(): IVector3D {
        return this._directionAxis;
    }

    public get xScale(): number {
        return this._xScale;
    }

    public set xScale(value: number) {
        if (this._xScale != value * this._xScaleInternal) {
            this._xScale = value * this._xScaleInternal;
            this._updateId++;
        }
    }

    public get yScale(): number {
        return this._yScale;
    }

    public set yScale(value: number) {
        if (this._yScale != value * this._yScaleInternal) {
            this._yScale = value * this._yScaleInternal;
            this._updateId++;
        }
    }

    public get zScale(): number {
        return this._zScale;
    }

    public set zScale(value: number) {
        if (this._zScale != value * this._zScaleInternal) {
            this._zScale = value * this._zScaleInternal;
            this._updateId++;
        }
    }

    private getDisplacenent(k: IVector3D): IVector3D | undefined {
        return this._displacements.get(
            Math.trunc(Math.round(k.x)) + '_' + Math.trunc(Math.round(k.y)) + '_' + Math.trunc(Math.round(k.z)),
        );
    }
}
