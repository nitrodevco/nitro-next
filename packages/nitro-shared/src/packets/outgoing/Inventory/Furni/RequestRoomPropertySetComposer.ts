import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RequestRoomPropertySetComposerType = object;

export class RequestRoomPropertySetComposer implements IOutgoingPacket<RequestRoomPropertySetComposerType> {
    public constructor(private params: RequestRoomPropertySetComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
