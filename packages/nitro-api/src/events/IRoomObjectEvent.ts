import type { IRoomObject } from "../room";
import type { INitroEvent } from "./INitroEvent";

export interface IRoomObjectEvent extends INitroEvent {
    readonly object: IRoomObject;
    readonly objectId: number;
    readonly objectType: string;
}