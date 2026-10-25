import { RoomEngineEvent } from './RoomEngineEvent';

/**
 * A furni's label or region changed in the engine - `RoomEngineFurnitureLabelEvent`
 * (WIN63-202610121624); the label widget reads the furni's label again.
 */
export class RoomEngineFurnitureLabelEvent extends RoomEngineEvent {
    public static UPDATED: string = 'REFLE_FURNITURE_LABEL_UPDATED' as const;

    constructor(type: string, roomId: number, public readonly furnitureId: number) {
        super(type, roomId);
    }
}
