import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetBotInventoryComposerType = object;

export class GetBotInventoryComposer implements IOutgoingPacket<GetBotInventoryComposerType> {
    public constructor(private params: GetBotInventoryComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
