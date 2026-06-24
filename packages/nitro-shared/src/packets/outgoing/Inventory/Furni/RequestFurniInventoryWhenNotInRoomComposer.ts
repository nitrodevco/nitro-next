import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RequestFurniInventoryWhenNotInRoomComposerType = object;

export class RequestFurniInventoryWhenNotInRoomComposer implements IOutgoingPacket<RequestFurniInventoryWhenNotInRoomComposerType> {
    public constructor(private params: RequestFurniInventoryWhenNotInRoomComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
