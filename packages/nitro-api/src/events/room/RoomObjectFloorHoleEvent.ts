import type { IRoomObject } from '@nitrodevco/nitro-api';

import { RoomObjectEvent } from './RoomObjectEvent';

export class RoomObjectFloorHoleEvent extends RoomObjectEvent {
    public static ADD_HOLE: string = 'ROFHO_ADD_HOLE' as const;
    public static REMOVE_HOLE: string = 'ROFHO_REMOVE_HOLE' as const;

    constructor(type: string, object: IRoomObject) {
        super(type, object);
    }
}
