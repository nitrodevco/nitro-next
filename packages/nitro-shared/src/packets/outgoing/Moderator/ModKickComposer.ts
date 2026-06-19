import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ModKickComposerType = object;

export class ModKickComposer implements IOutgoingPacket<ModKickComposerType> {
    public constructor(private params: ModKickComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
