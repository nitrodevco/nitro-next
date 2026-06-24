import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetHabboGroupBadgesComposerType = object;

export class GetHabboGroupBadgesComposer implements IOutgoingPacket<GetHabboGroupBadgesComposerType> {
    public constructor(private params: GetHabboGroupBadgesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
