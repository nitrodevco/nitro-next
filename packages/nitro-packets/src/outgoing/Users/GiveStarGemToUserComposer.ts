import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GiveStarGemToUserComposerType = object;

export class GiveStarGemToUserComposer implements IOutgoingPacket<GiveStarGemToUserComposerType> {
    public constructor(private params: GiveStarGemToUserComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
