import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetActivatedBadgesComposerType = object;

export class SetActivatedBadgesComposer implements IOutgoingPacket<SetActivatedBadgesComposerType> {
    public constructor(private params: SetActivatedBadgesComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
