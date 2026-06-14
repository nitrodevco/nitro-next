import type { Point } from 'pixi.js';

import type { IVector3D } from '../utils';
import type { RoomGeometryScaleType } from './enum';

export interface IRoomGeometry {
    dispose(): void;
    setDisplacement(location: IVector3D, displacement: IVector3D): void;
    setDepthVector(rotation: IVector3D): void;
    adjustLocation(location: IVector3D, distance: number): void;
    getCoordinatePosition(worldPos: IVector3D): IVector3D;
    getScreenPosition(worldPos: IVector3D): IVector3D;
    getScreenPoint(location: IVector3D): Point;
    getPlanePosition(screenPoint: Point, planeOrigin: IVector3D, planeAxis1: IVector3D, planeAxis2: IVector3D): Point;
    setLocation(location: IVector3D): void;
    performZoom(): void;
    performZoomOut(): void;
    performZoomIn(): void;
    isZoomedIn(): boolean;
    increaseUpdateId(): void;
    readonly updateId: number;
    scale: RoomGeometryScaleType;
    location: IVector3D;
    direction: IVector3D;
    readonly directionAxis: IVector3D;
    xScale: number;
    yScale: number;
    zScale: number;
}
