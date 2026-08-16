import { RoomObjectEvent } from './RoomObjectEvent';

export class RoomObjectMoveEvent extends RoomObjectEvent {
    public static SLIDE_ANIMATION: string = 'ROME_SLIDE_ANIMATION' as const;
    public static POSITION_CHANGED: string = 'ROME_POSITION_CHANGED' as const;
    public static OBJECT_REMOVED: string = 'ROME_OBJECT_REMOVED' as const;
}
