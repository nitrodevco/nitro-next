import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetHabboGroupDetailsComposerType = object;

export class GetHabboGroupDetailsComposer implements IOutgoingPacket<GetHabboGroupDetailsComposerType> {
    public constructor(private params: GetHabboGroupDetailsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
