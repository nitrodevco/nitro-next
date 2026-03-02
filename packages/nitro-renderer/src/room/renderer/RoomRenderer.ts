import type {
    IRoomObject,
    IRoomRenderer,
    IRoomRenderingCanvas,
    IRoomSpriteCanvasContainer,
} from '@nitrodevco/nitro-api';

import { RoomSpriteCanvas } from './RoomSpriteCanvas';

export class RoomRenderer implements IRoomRenderer, IRoomSpriteCanvasContainer {
    private _objects: Map<number, IRoomObject> = new Map();
    private _canvas: IRoomRenderingCanvas | undefined = undefined;
    private _disposed: boolean = false;
    private _roomObjectVariableAccurateZ: string = '';

    public dispose(): void {
        if (this._disposed) return;

        this._canvas?.dispose();
        this._objects?.clear();

        this._disposed = true;
    }

    public reset(): void {
        this._objects.clear();
    }

    public getInstanceId(object: IRoomObject): number {
        return object?.instanceId ?? -1;
    }

    public getRoomObject(instanceId: number): IRoomObject | undefined {
        return this._objects.get(instanceId);
    }

    public addObject(object: IRoomObject): void {
        if (!object) return;

        this._objects.set(this.getInstanceId(object), object);
    }

    public removeObject(object: IRoomObject): void {
        const instanceId = this.getInstanceId(object);

        this._objects.delete(instanceId);

        this._canvas?.removeFromCache(instanceId.toString());
    }

    public update(time: number, update: boolean = false): void {
        this._canvas?.render(time, update);
        this._canvas?.update();
    }

    public createCanvas(width: number, height: number, scale: number): IRoomRenderingCanvas {
        if (this._canvas) {
            this._canvas.initialize(width, height);

            if (this._canvas.geometry) this._canvas.geometry.scale = scale;
        } else {
            this._canvas = new RoomSpriteCanvas(1, this, width, height, scale);
        }

        return this._canvas;
    }

    public removeCanvas(): void {
        this._canvas?.dispose();
    }

    public get objects(): Map<number, IRoomObject> {
        return this._objects;
    }

    public get canvas(): IRoomRenderingCanvas | undefined {
        return this._canvas;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get roomObjectVariableAccurateZ(): string {
        return this._roomObjectVariableAccurateZ;
    }

    public set roomObjectVariableAccurateZ(z: string) {
        this._roomObjectVariableAccurateZ = z;
    }
}
