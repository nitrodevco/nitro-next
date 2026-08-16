import { RoomObjectEvent } from './RoomObjectEvent';

export class RoomObjectDataRequestEvent extends RoomObjectEvent {
    public static RODRE_CURRENT_USER_ID: string = 'RODRE_CURRENT_USER_ID' as const;
    public static RODRE_URL_PREFIX: string = 'RODRE_URL_PREFIX' as const;
}
