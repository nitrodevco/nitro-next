import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetBonusRareInfoComposerType = object;

export class GetBonusRareInfoComposer implements IOutgoingPacket<GetBonusRareInfoComposerType> {
    public constructor(private params: GetBonusRareInfoComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
