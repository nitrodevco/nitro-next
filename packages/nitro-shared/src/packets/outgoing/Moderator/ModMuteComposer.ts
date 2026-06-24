import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ModMuteComposerType = object;

export class ModMuteComposer implements IOutgoingPacket<ModMuteComposerType> {
    public constructor(private params: ModMuteComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
