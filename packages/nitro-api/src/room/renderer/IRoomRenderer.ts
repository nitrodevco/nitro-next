import type { IRoomObject } from '../object';
import type { IRoomRenderingCanvas } from './IRoomRenderingCanvas';

export interface IRoomRenderer {
    dispose(): void;
    reset(): void;
    addObject(object: IRoomObject): void;
    removeObject(object: IRoomObject): void;
    update(time: number, update?: boolean): void;
    createCanvas(width: number, height: number, scale: number): IRoomRenderingCanvas;
    readonly canvas: IRoomRenderingCanvas | undefined;
    readonly disposed: boolean;
    roomObjectVariableAccurateZ: string;
}
