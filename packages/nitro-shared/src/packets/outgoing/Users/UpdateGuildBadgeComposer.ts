import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UpdateGuildBadgeComposerType = object;

export class UpdateGuildBadgeComposer implements IOutgoingPacket<UpdateGuildBadgeComposerType> {
    public constructor(private params: UpdateGuildBadgeComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
