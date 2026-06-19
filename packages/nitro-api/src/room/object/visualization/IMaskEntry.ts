import type { PointData, Texture } from "pixi.js";

export interface IMaskEntry {
    texture: Texture;
    position?: PointData;
    size?: { width: number, height: number };
    scale?: PointData;
    rotation?: number;
}