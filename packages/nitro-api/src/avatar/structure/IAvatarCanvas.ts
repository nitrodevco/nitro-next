import { PointData } from "pixi.js";

export interface IAvatarCanvas {
    readonly width: number;
    readonly height: number;
    readonly offset: PointData;
    readonly id: string;
    readonly regPoint: PointData;
}