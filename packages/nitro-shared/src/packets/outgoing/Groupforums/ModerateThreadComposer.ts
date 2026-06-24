import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ModerateThreadComposerType = object;

export class ModerateThreadComposer implements IOutgoingPacket<ModerateThreadComposerType> {
    public constructor(private params: ModerateThreadComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
