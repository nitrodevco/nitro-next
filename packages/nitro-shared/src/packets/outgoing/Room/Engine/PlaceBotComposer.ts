import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PlaceBotComposerType = object;

export class PlaceBotComposer implements IOutgoingPacket<PlaceBotComposerType> {
    public constructor(private params: PlaceBotComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
