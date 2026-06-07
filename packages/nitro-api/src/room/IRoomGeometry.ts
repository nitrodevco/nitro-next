import type { Point } from 'pixi.js';

import type { IVector3D } from '../utils';
import type { RoomGeometryScaleType } from './enum';

export interface IRoomGeometry {
    dispose(): void;
    setDisplacement(_arg_1: IVector3D, _arg_2: IVector3D): void;
    setDepthVector(k: IVector3D): void;
    adjustLocation(_arg_1: IVector3D, _arg_2: number): void;
    getCoordinatePosition(_arg_1: IVector3D): IVector3D;
    getScreenPosition(_arg_1: IVector3D): IVector3D;
    getScreenPoint(_arg_1: IVector3D): Point;
    getPlanePosition(_arg_1: Point, _arg_2: IVector3D, _arg_3: IVector3D, _arg_4: IVector3D): Point;
    setLocation(location: IVector3D): void;
    performZoom(): void;
    performZoomOut(): void;
    performZoomIn(): void;
    isZoomedIn(): boolean;
    readonly updateId: number;
    scale: RoomGeometryScaleType;
    location: IVector3D;
    direction: IVector3D;
    readonly directionAxis: IVector3D;
    x_scale: number;
    y_scale: number;
    z_scale: number;
}
