import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ModeratorActionComposerType = object;

export class ModeratorActionComposer implements IOutgoingPacket<ModeratorActionComposerType> {
    public constructor(private params: ModeratorActionComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
