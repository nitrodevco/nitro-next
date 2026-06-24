import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type OpenMysteryTrophyComposerType = object;

export class OpenMysteryTrophyComposer implements IOutgoingPacket<OpenMysteryTrophyComposerType> {
    public constructor(private params: OpenMysteryTrophyComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
