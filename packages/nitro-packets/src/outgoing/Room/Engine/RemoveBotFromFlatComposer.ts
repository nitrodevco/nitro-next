import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RemoveBotFromFlatComposerType = object;

export class RemoveBotFromFlatComposer implements IOutgoingPacket<RemoveBotFromFlatComposerType> {
    public constructor(private params: RemoveBotFromFlatComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
