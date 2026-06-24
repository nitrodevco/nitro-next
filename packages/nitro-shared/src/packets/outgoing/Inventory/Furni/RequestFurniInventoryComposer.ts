import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RequestFurniInventoryComposerType = object;

export class RequestFurniInventoryComposer implements IOutgoingPacket<RequestFurniInventoryComposerType> {
    public constructor(private params: RequestFurniInventoryComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
