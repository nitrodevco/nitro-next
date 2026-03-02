import type { IRoomObject } from '../object';

export interface IRoomSpriteCanvasContainer {
    getRoomObject(instanceId: number): IRoomObject | undefined;
    readonly objects: Map<number, IRoomObject>;
    roomObjectVariableAccurateZ: string;
}
