import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RoomAdPurchaseInitiatedComposerType = object;

export class RoomAdPurchaseInitiatedComposer implements IOutgoingPacket<RoomAdPurchaseInitiatedComposerType> {
    public constructor(private params: RoomAdPurchaseInitiatedComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
