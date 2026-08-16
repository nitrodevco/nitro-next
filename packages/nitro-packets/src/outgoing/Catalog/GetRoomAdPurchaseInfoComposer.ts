import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetRoomAdPurchaseInfoComposerType = object;

export class GetRoomAdPurchaseInfoComposer implements IOutgoingPacket<GetRoomAdPurchaseInfoComposerType> {
    public constructor(private params: GetRoomAdPurchaseInfoComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
