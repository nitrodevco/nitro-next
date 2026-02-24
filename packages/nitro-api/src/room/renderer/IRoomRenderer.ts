import type { IRoomObject } from '../object';
import type { IRoomRenderingCanvas } from './IRoomRenderingCanvas';

export interface IRoomRenderer {
    getCanvas(id: number): IRoomRenderingCanvas | undefined;
    createCanvas(id: number, width: number, height: number, scale: number): IRoomRenderingCanvas;
    addObject(object: IRoomObject): void;
    removeObject(object: IRoomObject): void;
    dispose(): void;
    reset(): void;
    update(time: number, update?: boolean): void;
    roomObjectVariableAccurateZ: string;
}
