import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ModerateMessageComposerType = object;

export class ModerateMessageComposer implements IOutgoingPacket<ModerateMessageComposerType> {
    public constructor(private params: ModerateMessageComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
