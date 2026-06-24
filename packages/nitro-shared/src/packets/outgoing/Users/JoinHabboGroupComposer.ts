import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type JoinHabboGroupComposerType = object;

export class JoinHabboGroupComposer implements IOutgoingPacket<JoinHabboGroupComposerType> {
    public constructor(private params: JoinHabboGroupComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
