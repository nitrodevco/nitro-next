import type { RoomMapData } from '../object';
import { RoomObjectUpdateMessage } from './RoomObjectUpdateMessage';

export class ObjectRoomMapUpdateMessage extends RoomObjectUpdateMessage {
    public static UPDATE_MAP: string = 'RORMUM_UPDATE_MAP' as const;

    private _type: string;
    private _mapData: RoomMapData;

    constructor(mapData: RoomMapData) {
        super(undefined, undefined);

        this._type = ObjectRoomMapUpdateMessage.UPDATE_MAP;
        this._mapData = mapData;
    }

    public get type(): string {
        return this._type;
    }

    public get mapData(): RoomMapData {
        return this._mapData;
    }
}
