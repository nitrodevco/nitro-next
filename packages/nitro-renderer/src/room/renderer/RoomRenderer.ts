import type {
    IRoomObject,
    IRoomRenderer,
    IRoomRenderingCanvas,
    IRoomSpriteCanvasContainer,
} from '@nitrodevco/nitro-api';

import { RoomSpriteCanvas } from './RoomSpriteCanvas';

export class RoomRenderer implements IRoomRenderer, IRoomSpriteCanvasContainer {
    private _objects: Map<number, IRoomObject> = new Map();
    private _canvases: Map<number, IRoomRenderingCanvas> = new Map();

    private _disposed: boolean = false;
    private _roomObjectVariableAccurateZ: string = '';

    public dispose(): void {
        if (this._disposed) return;

        if (this._canvases) {
            for (const [key, canvas] of this._canvases.entries()) {
                this._canvases.delete(key);

                canvas?.dispose();
            }
        }

        if (this._objects) this._objects.clear();

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

        for (const canvas of this._canvases.values()) {
            if (!canvas) continue;

            const spriteCanvas = canvas as RoomSpriteCanvas;

            spriteCanvas.removeFromCache(instanceId.toString());
        }
    }

    public render(time: number, update: boolean = false): void {
        if (!this._canvases || !this._canvases.size) return;

        for (const canvas of this._canvases.values()) canvas?.render(time, update);
    }

    public update(time: number, update: boolean = false): void {
        if (!this._canvases || !this._canvases.size) return;

        this.render(time, update);

        for (const canvas of this._canvases.values()) canvas?.update();
    }

    public getCanvas(id: number): IRoomRenderingCanvas | undefined {
        return this._canvases.get(id);
    }

    public createCanvas(id: number, width: number, height: number, scale: number): IRoomRenderingCanvas {
        const existing = this._canvases.get(id);

        if (existing) {
            existing.initialize(width, height);

            if (existing.geometry) existing.geometry.scale = scale;

            return existing;
        }

        const canvas = this.createSpriteCanvas(id, width, height, scale);

        this._canvases.set(id, canvas);

        return canvas;
    }

    private createSpriteCanvas(id: number, width: number, height: number, scale: number): IRoomRenderingCanvas {
        return new RoomSpriteCanvas(id, this, width, height, scale);
    }

    public removeCanvas(id: number): void {
        const existing = this._canvases.get(id);

        if (!existing) return;

        this._canvases.delete(id);

        existing.dispose();
    }

    public get objects(): Map<number, IRoomObject> {
        return this._objects;
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
